from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, send_from_directory, Response
from twilio.rest import Client
from googlesearch import search
from flask_socketio import SocketIO, emit
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
import time
import base64
import smtplib
from flask import send_file
import boto3
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import threading
from flask_cors import CORS
import cv2
import numpy as np
from io import BytesIO
from PIL import Image
import io
import os
# import pywhatkit
# import pyautogui
from werkzeug.utils import secure_filename
from uuid import uuid4 as uuid
from dotenv import load_dotenv
import urllib.parse
from botocore.exceptions import NoCredentialsError, ClientError

load_dotenv()
app = Flask(__name__)
CORS(app)

# Twilio Configuration
account_sid = os.getenv('your_account_sid')
auth_token = os.getenv('your_auth_token')
twilio_number = os.getenv('your_twilio_number')
app.secret_key = 'your_secret_key'

client = Client(account_sid, auth_token)

# Initialize Background Scheduler
scheduler = BackgroundScheduler()
scheduler.start()

# AWS Configuration
AWS_ACCESS_KEY_ID = 'your_aws_access_key_id'
AWS_SECRET_ACCESS_KEY = 'your_aws_secret_access_key'
REGION_NAME = 'your_region'
IMAGE_ID = 'your_image_id'
INSTANCE_TYPE = 'your_instance_type'

# Initialize EC2 resource
ec2 = boto3.resource(
    service_name="ec2",
    region_name=REGION_NAME,
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY
)

# Hand detection state
is_detecting = False

# Upload folders
UPLOAD_FOLDER = 'uploads'
FILTERED_FOLDER = 'filtered'
OUTPUT_FOLDER = 'static'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(FILTERED_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['OUTPUT_FOLDER'] = OUTPUT_FOLDER

# Face detection classifier
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Rekognition client
rekognition_client = boto3.client(
    'rekognition',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=REGION_NAME
)

@app.route('/')
def index():
    return jsonify({"message": "Flask API is running!"})

@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    project = data.get('project')
    print(f"Received: {name}, {email}, Project: {project}")
    return jsonify({"message": f"Thanks {name}, your interest in {project} is noted!"})

# Call functionality
@app.route('/call', methods=['POST'])
def call():
    number = request.form['number']
    from_number = request.form['from_number']
    delay_minutes = request.form.get('delay_minutes', type=int)

    if delay_minutes and delay_minutes > 0:
        delay_time = datetime.now() + timedelta(minutes=delay_minutes)
        scheduler.add_job(make_call, 'date', run_date=delay_time, args=[number, from_number])
        return jsonify(status='success', message=f"Call scheduled successfully in {delay_minutes} minutes!")
    else:
        try:
            call = client.calls.create(
                to=number,
                from_=from_number,
                url='http://demo.twilio.com/docs/voice.xml'
            )
            return jsonify(status='success', message="Call Success!", call_sid=call.sid)
        except Exception as e:
            return jsonify(status='danger', message=str(e))

def make_call(number, from_number):
    try:
        call = client.calls.create(
            to=number,
            from_=from_number,
            url='http://demo.twilio.com/docs/voice.xml'
        )
        print(f"Call made successfully, SID: {call.sid}")
    except Exception as e:
        print(f"Error making the call: {str(e)}")

# SMS functionality
def send_sms(number, message):
    try:
        sent_message = client.messages.create(
            body=message,
            from_=twilio_number,
            to=number
        )
        return {'status': 'success', 'sid': sent_message.sid}
    except Exception as e:
        return {'status': 'error', 'message': str(e)}

@app.route('/handle_sms', methods=['POST'])
def handle_sms():
    data = request.json
    number = data.get('number')
    message = data.get('message')
    delay_minutes = int(data.get('delay_minutes', 0))

    if not number:
        return jsonify({'status': 'error', 'message': 'Phone number is required.'})
    if not message:
        return jsonify({'status': 'error', 'message': 'Message is required.'})

    if delay_minutes > 0:
        delay_time = datetime.now() + timedelta(minutes=delay_minutes)
        scheduler.add_job(send_sms, 'date', run_date=delay_time, args=[number, message])
        return jsonify({'status': 'success', 'message': f'SMS scheduled successfully in {delay_minutes} minutes!'})
    else:
        result = send_sms(number, message)
        return jsonify(result)

# Google Search
@app.route('/google_search', methods=['POST'])
def google_search_route():
    data = request.get_json()
    query = data.get('query')
    
    if not query:
        return jsonify({'results': []}), 400
    
    try:
        # Use search function without num_results parameter
        search_results = list(search(query, tld="com", num=5, stop=5, pause=2))
        results = search_results[:5]  # Limit to 5 results
    except Exception as e:
        print(f"Error during Google search: {e}")
        results = []
    
    return jsonify({'results': results})

@app.route('/search/google', methods=['POST'])
def search_google():
    query = request.form.get('query')
    query = urllib.parse.quote(query)
    return redirect(f'https://www.google.com/search?q={query}')

@app.route('/search/bing', methods=['POST'])
def search_bing():
    query = request.form.get('query')
    query = urllib.parse.quote(query)
    return redirect(f'https://www.bing.com/search?q={query}')

# IP Camera
def capture_frame(ip):
    cap_ip = cv2.VideoCapture(f"http://{ip}/video")
    success, frame = cap_ip.read()
    cap_ip.release()
    if success:
        filename = f"{uuid.uuid4()}.jpg"
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        cv2.imwrite(filepath, frame)
        return filename
    return None

def generate_frames(ip_or_url, is_full_url=False):
    if is_full_url:
        cap_ip = cv2.VideoCapture(ip_or_url)
    else:
        cap_ip = cv2.VideoCapture(f"http://{ip_or_url}/video")
    while True:
        success, frame = cap_ip.read()
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/capture_photo', methods=['POST'])
def capture_photo():
    data = request.get_json()
    stream_url = data.get('ip')
    if stream_url:
        cap = cv2.VideoCapture(stream_url)
        success, frame = cap.read()
        cap.release()
        if success:
            filename = f"{uuid.uuid4()}.jpg"
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            cv2.imwrite(filepath, frame)
            return jsonify(message=f"Photo captured and saved as {filename}")
        else:
            return jsonify(message="Failed to capture photo"), 500
    return jsonify(message="Stream URL not provided"), 400

@app.route('/video_feed')
def video_feed():
    stream_url = request.args.get('url')
    if stream_url:
        return Response(generate_frames(stream_url, is_full_url=True),
                        mimetype='multipart/x-mixed-replace; boundary=frame')
    ip = request.args.get('ip')
    if ip:
        return Response(generate_frames(ip),
                        mimetype='multipart/x-mixed-replace; boundary=frame')
    return "No stream URL or IP provided", 400

@app.route('/image/<filename>')
def get_image(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

# Email functionality
def send_email_task(smtp_user, smtp_password, from_email, to_email, subject, body):
    try:
        message = MIMEMultipart()
        message['From'] = from_email
        message['To'] = to_email
        message['Subject'] = subject
        message.attach(MIMEText(body, 'plain', 'utf-8'))

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.sendmail(from_email, to_email, message.as_string())
        server.quit()
        return {'status': 'success', 'message': 'Email sent successfully!'}
    except Exception as e:
        return {'status': 'error', 'message': str(e)}

@app.route('/send_email', methods=['POST'])
def send_email():
    data = request.json
    smtp_user = os.getenv('your_smtp_user')
    smtp_password = os.getenv('your_smtp_password')
    from_email = smtp_user
    to_email = data.get('to_email')
    subject = data.get('subject')
    body = data.get('body')

    response = send_email_task(smtp_user, smtp_password, from_email, to_email, subject, body)
    return jsonify(response)

@app.route('/send_delayed_email', methods=['POST'])
def send_delayed_email():
    data = request.json
    smtp_user = os.getenv('your_smtp_user')
    smtp_password = os.getenv('your_smtp_password')
    from_email = smtp_user
    to_email = data.get('to_email')
    subject = data.get('subject')
    body = data.get('body')
    delay_seconds = int(data.get('delay_seconds', 0))

    if delay_seconds > 0:
        def delayed_send():
            time.sleep(delay_seconds)
            send_email_task(smtp_user, smtp_password, from_email, to_email, subject, body)
        thread = threading.Thread(target=delayed_send)
        thread.start()
        return jsonify({'status': 'success', 'message': f'Email scheduled successfully in {delay_seconds} seconds!'})
    else:
        response = send_email_task(smtp_user, smtp_password, from_email, to_email, subject, body)
        return jsonify(response)

# EC2 functionality
@app.route("/ec2", methods=["GET", "POST"])
def create_ec2():
    if request.method == "POST":
        aws_access_key_id = request.form["aws_access_key_id"]
        aws_secret_access_key = request.form["aws_secret_access_key"]
        region = request.form["region"]
        instance_type = request.form["instance_type"]
        image_id = request.form["image_id"]
        max_count = int(request.form["max_count"])
        min_count = int(request.form["min_count"])

        ec2_instance = boto3.resource(
            service_name="ec2",
            region_name=region,
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key
        )

        ec2_instance.create_instances(
            InstanceType=instance_type,
            ImageId=image_id,
            MaxCount=max_count,
            MinCount=min_count
        )

        return "EC2 Instance(s) Created"

    return jsonify({"message": "EC2 endpoint"})

@app.route("/get_options", methods=["GET"])
def get_options():
    regions = ["us-east-1","us-east-2", "us-west-1", "us-west-2", "ap-south-1","eu-west-1","eu-west-2","eu-west-3", "ap-northeast-1","ap-northeast-2","ap-northeast-3","ap-southeast-1","ap-southeast-2","ca-central-1","eu-central-1","sa-east-1"]
    instance_types = ["t2.micro", "t2.small", "t2.medium", "t3.micro", "t3.small"]

    return jsonify({
        "regions": regions,
        "instance_types": instance_types
    })

@app.route("/get_amis", methods=["GET"])
def get_amis():
    region = request.args.get("region")
    amis = {
        "us-east-1": [
            {"id": "ami-0ba9883b710b05ac6", "name": "amazon"},
            {"id": "ami-0cdb66d9dacb7e395", "name": "macos"},
            {"id": "ami-04a81a99f5ec58529", "name": "ubuntu"},
            {"id": "ami-07d9456e59793a7d5", "name": "windows"},
            {"id": "ami-0583d8c7a9c35822c", "name": "Redhat"},
            {"id": "ami-0b247d4d0226ca7cd", "name": "Suse"},
            {"id": "ami-00402f0bdf4996822", "name": "Debian"},
        ],
        "ap-south-1": [
            {"id": "ami-025fe52e1f2dc5044", "name": "amazon"},
            {"id": "ami-03e6eb5b158a325d9", "name": "macos"},
            {"id": "ami-0ad21ae1d0696ad58", "name": "ubuntu"},
            {"id": "ami-049f0f6f51145ff40", "name": "windows"},
            {"id": "ami-022ce6f32988af5fa", "name": "Redhat"},
            {"id": "ami-0f9f6e1570315ccba", "name": "Suse"},
            {"id": "ami-061e327e2d858410e", "name": "Debian"},
        ]
    }
    return jsonify(amis.get(region, []))

# Hand detection for EC2 (simplified version)
def create_ec2_instances(count):
    if count <= 0:
        print("Invalid number of instances. Must be greater than 0.")
        return

    instances = ec2.create_instances(
        InstanceType=INSTANCE_TYPE,
        ImageId=IMAGE_ID,
        MinCount=count,
        MaxCount=count
    )
    instance_ids = [instance.id for instance in instances]
    print(f"Created {count} EC2 instance(s): {instance_ids}")

@app.route('/start_detection_finger', methods=['POST'])
def start_detection():
    global is_detecting
    if not is_detecting:
        # Simplified hand detection - just create 1 instance
        create_ec2_instances(1)
        return jsonify({"message": "EC2 instance created successfully."})
    else:
        return jsonify({"message": "Detection already in progress."})

# Instagram functionality (placeholder)
@app.route('/insta', methods=['POST'])
def insta():
    return jsonify({'message': 'Instagram functionality requires instagrapi package'})

# Face crop functionality
@app.route('/facecrop', methods=['POST'])
def upload():
    file = request.files['file']
    if file:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)
        # Convert to PNG if not already a supported OpenCV format
        ext = os.path.splitext(file_path)[1].lower()
        if ext not in ['.jpg', '.jpeg', '.png']:
            img = Image.open(file_path)
            png_path = file_path + '.png'
            img.save(png_path, 'PNG')
            file_path = png_path
        output_images, message = process_image(file_path)
        if not output_images:
            return jsonify({'error': message}), 200
        return jsonify({'output_images': output_images, 'message': message}), 200
    return 'No file uploaded', 400

def process_image(image_path):
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    output_images = []
    if len(faces) > 0:
        for i, (x, y, w, h) in enumerate(faces):
            cropped_face = image[y:y+h, x:x+w]
            # Save with unique name for each face
            base = os.path.splitext(os.path.basename(image_path))[0]
            output_image_path = os.path.join(app.config['OUTPUT_FOLDER'], f"{base}_face_{i+1}.png")
            cv2.imwrite(output_image_path, cropped_face)
            output_images.append(os.path.basename(output_image_path))
        return output_images, f"{len(faces)} face(s) detected and cropped."
    else:
        return [], "No face detected in the image."

@app.route('/download/<filename>')
def download(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Image filter functionality
def apply_color_filter(image_path, filter_color, output_path):
    image = cv2.imread(image_path)
    if image is None:
        # Try converting to PNG using Pillow
        try:
            img = Image.open(image_path)
            png_path = image_path + '.png'
            img.save(png_path, 'PNG')
            image = cv2.imread(png_path)
        except Exception as e:
            print(f"Error: Could not load image even after conversion. {e}")
            return
    filtered_image = image.copy()
    if filter_color.lower() == 'red':
        filtered_image[:, :, 0] = 0
        filtered_image[:, :, 1] = 0
    elif filter_color.lower() == 'green':
        filtered_image[:, :, 0] = 0
        filtered_image[:, :, 2] = 0
    elif filter_color.lower() == 'blue':
        filtered_image[:, :, 1] = 0
        filtered_image[:, :, 2] = 0
    else:
        print("Invalid color filter.")
        return
    cv2.imwrite(output_path, filtered_image)

@app.route('/uploadfilter', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return "No file part", 400
    file = request.files['file']
    filter_color = request.form.get('filter_color')
    if file.filename == '':
        return "No selected file", 400
    if file:
        filename = file.filename
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        # Convert to PNG if not already a supported OpenCV format
        ext = os.path.splitext(file_path)[1].lower()
        if ext not in ['.jpg', '.jpeg', '.png']:
            img = Image.open(file_path)
            png_path = file_path + '.png'
            img.save(png_path, 'PNG')
            file_path = png_path
        output_path = os.path.join(FILTERED_FOLDER, os.path.basename(file_path))
        apply_color_filter(file_path, filter_color, output_path)
        return send_from_directory(FILTERED_FOLDER, os.path.basename(file_path))

@app.route('/filterImg', methods=['POST'])
def capture_image():
    filter_color = request.form.get('filter_color')

    cap = cv2.VideoCapture(0)
    ret, frame = cap.read()
    cap.release()

    if not ret:
        return "Error capturing image", 500

    filename = 'captured_image.jpg'
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    cv2.imwrite(file_path, frame)
    output_path = os.path.join(FILTERED_FOLDER, filename)
    apply_color_filter(file_path, filter_color, output_path)
    return send_from_directory(FILTERED_FOLDER, filename)

# Accessory functionality
def add_accessory(frame, accessory_path, face_rect, scale=1, position_offset=(0, 0)):
    accessory = cv2.imread(accessory_path, cv2.IMREAD_UNCHANGED)
    if accessory is None:
        print("Error: Could not load accessory.")
        return frame

    accessory_width = int(face_rect[2] * scale)
    accessory_height = int(accessory_width * accessory.shape[0] / accessory.shape[1])
    accessory_resized = cv2.resize(accessory, (accessory_width, accessory_height), interpolation=cv2.INTER_LINEAR)

    if accessory_resized.shape[2] == 4:
        alpha_channel = accessory_resized[:, :, 3] / 255.0
        accessory_resized = accessory_resized[:, :, :3]
    else:
        alpha_channel = np.ones(accessory_resized.shape[:2])

    x, y, w, h = face_rect
    y = y - accessory_height // 2 + position_offset[1]
    x = x + w // 2 - accessory_width // 2 + position_offset[0]

    if y < 0 or x < 0 or y + accessory_height > frame.shape[0] or x + accessory_width > frame.shape[1]:
        print("Error: Accessory position out of bounds.")
        return frame

    for c in range(3):
        frame[y:y+accessory_height, x:x+accessory_width, c] = (1 - alpha_channel) * frame[y:y+accessory_height, x:x+accessory_width, c] + alpha_channel * accessory_resized[:, :, c]

    return frame

@app.route('/add_accessory', methods=['POST'])
def add_accessory_route():
    data = request.json
    image_data = data['image'].split(',')[1]
    accessory = data['accessory']

    image = np.frombuffer(base64.b64decode(image_data), dtype=np.uint8)
    frame = cv2.imdecode(image, cv2.IMREAD_COLOR)

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)

    for face_rect in faces:
        if accessory == 'hat':
            hat_path = 'old-fedora-hat-removebg-preview.png'
            frame = add_accessory(frame, hat_path, face_rect, scale=1, position_offset=(0, -face_rect[3] // 4))
        elif accessory == 'sunglasses':
            sunglasses_path = 'sunglasses.jpg'
            frame = add_accessory(frame, sunglasses_path, face_rect, scale=1, position_offset=(0, face_rect[3] // 5))

    _, buffer = cv2.imencode('.jpg', frame)
    frame_encoded = base64.b64encode(buffer).decode('utf-8')

    return jsonify({'image': frame_encoded})

# WhatsApp functionality (placeholder)
@app.route('/send', methods=['POST'])
def send():
    number = request.form['number']
    message = request.form['message']
    
    # Placeholder for WhatsApp functionality
    return jsonify({'message': f'WhatsApp message would be sent to {number}: {message}'})

# Custom image functionality
@app.route('/CustomImg', methods=['GET', 'POST'])
def image():
    if request.method == 'POST':
        try:
            width = int(request.form['width'])
            height = int(request.form['height'])
            shape = request.form['shape'].strip().lower()
            start_x = int(request.form['start_x'])
            start_y = int(request.form['start_y'])
            end_x = int(request.form['end_x'])
            end_y = int(request.form['end_y'])
            color_b = int(request.form['color_b'])
            color_g = int(request.form['color_g'])
            color_r = int(request.form['color_r'])

            image = np.zeros((height, width, 3), dtype=np.uint8)
            color = (color_b, color_g, color_r)

            if shape == 'rectangle':
                cv2.rectangle(image, (start_x, start_y), (end_x, end_y), color, -1)
            elif shape == 'line':
                thickness = int(request.form.get('thickness', 1))
                cv2.line(image, (start_x, start_y), (end_x, end_y), color, thickness)
            elif shape == 'circle':
                radius = int(request.form.get('radius', 0))
                cv2.circle(image, (start_x, start_y), radius, color, -1)
            else:
                return jsonify({"error": "Shape not recognized. Please enter 'rectangle', 'line', or 'circle'."})

            # Save image to file
            filename = f"custom_image_{uuid().hex[:8]}.png"
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            cv2.imwrite(filepath, image)
            
            # Convert to base64 for preview
            _, img_encoded = cv2.imencode('.png', image)
            img_base64 = base64.b64encode(img_encoded.tobytes()).decode('utf-8')
            
            return jsonify({
                "success": True,
                "message": "Custom image generated successfully",
                "filename": filename,
                "preview": f"data:image/png;base64,{img_base64}",
                "download_url": f"/download/{filename}"
            })
        except ValueError as e:
            return jsonify({"error": "Invalid input. Please ensure all fields are filled correctly."})
    return jsonify({"message": "Custom image endpoint"})

# S3 Bucket functionality
@app.route('/create_s3_bucket', methods=['POST'])
def create_s3_bucket():
    aws_access_key_id = request.form['aws_access_key_id']
    aws_secret_access_key = request.form['aws_secret_access_key']
    bucket_name = request.form['bucket_name']
    region = request.form['region']

    try:
        s3_client = boto3.client(
            's3',
            region_name=region,
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key
        )

        if region == 'us-east-1':
            s3_client.create_bucket(Bucket=bucket_name)
        else:
            location = {'LocationConstraint': region}
            s3_client.create_bucket(Bucket=bucket_name, CreateBucketConfiguration=location)

        return jsonify({'status': 'success', 'message': f"Bucket '{bucket_name}' created successfully in region '{region}'!"})
    except NoCredentialsError:
        return jsonify({'status': 'error', 'message': "Credentials not available. Please configure your AWS credentials."})
    except ClientError as e:
        return jsonify({'status': 'error', 'message': f"Error: {e.response['Error']['Message']}"})
    except Exception as e:
        return jsonify({'status': 'error', 'message': f"Unexpected error: {str(e)}"})

# Image Recognition functionality
@app.route('/analyze-image', methods=['POST'])
def analyze_image():
    if 'imageFile' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    
    file = request.files['imageFile']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400

    try:
        image_bytes = file.read()
        response = rekognition_client.detect_labels(
            Image={'Bytes': image_bytes},
            MaxLabels=10,
            MinConfidence=75
        )
        
        labels = response['Labels']
        labels_str = ', '.join([label['Name'] for label in labels])
        
        return jsonify({'message': labels_str})
    
    except NoCredentialsError:
        return jsonify({'message': 'Credentials are not available.'}), 400
    except ClientError as e:
        return jsonify({'message': e.response['Error']['Message']}), 400
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@app.route('/bluegreen_deploy', methods=['POST'])
def bluegreen_deploy():
    data = request.get_json()
    app_name = data.get('appName')
    environment = data.get('environment')
    version = data.get('version')
    print(f"Blue/Green Deploy: {app_name}, {environment}, {version}")
    return jsonify(message=f"Deployment triggered for {app_name} ({environment}) version {version}!")

@app.route('/jenkins_pipeline', methods=['POST'])
def jenkins_pipeline():
    data = request.get_json()
    repo_url = data.get('repoUrl')
    branch = data.get('branch')
    print(f"Jenkins Pipeline: {repo_url}, branch {branch}")
    return jsonify(message=f"Pipeline triggered for {repo_url} on branch {branch}!")

@app.route('/food_waste_report', methods=['POST'])
def food_waste_report():
    data = request.get_json()
    location = data.get('location')
    amount = data.get('amount')
    description = data.get('description')
    print(f"Food Waste Report: {location}, {amount}kg, {description}")
    return jsonify(message=f"Food waste report submitted for {location} ({amount}kg). Thank you!")

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    subject = data.get('subject')
    message = data.get('message')

    # Compose email
    msg = MIMEMultipart()
    msg['From'] = 'your_smtp_user'
    msg['To'] = 'your_smtp_user'
    msg['Subject'] = f"Portfolio Contact: {subject}"
    body = f"Name: {name}\nEmail: {email}\nSubject: {subject}\n\nMessage:\n{message}"
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login('your_smtp_user', 'your_smtp_password')
        server.sendmail('your_smtp_user', 'your_smtp_user', msg.as_string())
        server.quit()
        return jsonify({'status': 'success', 'message': 'Message sent successfully!'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True) 