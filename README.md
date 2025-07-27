# React TypeScript Portfolio with Advanced Flask Backend

A comprehensive portfolio website built with React, TypeScript, and Bootstrap, featuring interactive project modals with live demos and a powerful Flask backend with multiple APIs.

## 🚀 Features

- **React + TypeScript**: Modern frontend with type safety
- **Bootstrap + React Bootstrap**: Beautiful UI components
- **Interactive Project Modals**: Live demos for each project
- **Flask Backend**: Comprehensive RESTful API with multiple services
- **Hot Module Replacement**: Instant development updates
- **Responsive Design**: Works on all devices
- **Multiple APIs**: SMS, Email, AWS, Computer Vision, and more

## 📦 Installation

### Prerequisites
- Node.js (v18+)
- Python 3.8+
- npm or yarn

### Frontend Setup
```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

### Backend Setup
```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install Flask flask-cors twilio google flask-socketio apscheduler boto3 opencv-python numpy Pillow pywhatkit pyautogui python-dotenv botocore

# Start Flask server
python app.py
```

## 🎯 Usage

1. **Frontend**: Visit `http://localhost:5173`
2. **Backend API**: Available at `http://localhost:5000`
3. **Project Demos**: Click "Live Demo" on any project card to see interactive demos

## 📁 Project Structure

```
project1/
├── src/
│   ├── components/
│   │   ├── ProjectModal.tsx    # Interactive project modals with live demos
│   │   ├── Projects.tsx        # Project showcase with 12+ projects
│   │   └── ...                 # Other components
│   ├── App.tsx                 # Main application
│   └── main.tsx               # Entry point
├── app.py                     # Comprehensive Flask backend
├── requirements.txt           # Python dependencies
└── package.json              # Node.js dependencies
```

## 🔧 Available Project Demos

### 🚀 Featured Projects
- **AWS DevOps Blue Green Deployment**: CI/CD pipeline management
- **Twilio Communication Suite**: SMS and voice call functionality
- **AWS EC2 Instance Manager**: Cloud infrastructure management with hand gesture recognition
- **Computer Vision Image Processor**: Face detection, cropping, and image filtering

### 📱 Communication & Automation
- **Email Automation System**: Automated email sending with scheduling
- **WhatsApp Automation Tool**: Automated messaging system
- **Google Search Integration**: Web search capabilities with result processing

### ☁️ Cloud & AWS Services
- **AWS S3 Bucket Manager**: Cloud storage management
- **AI Image Recognition System**: Machine learning image analysis using AWS Rekognition

### 🎨 Image & Media Processing
- **IP Camera Surveillance**: Real-time camera monitoring and photo capture
- **Custom Image Generator**: Dynamic image creation with custom shapes
- **Instagram Auto Poster**: Social media automation (placeholder)

## 🛠️ Backend APIs

### Communication APIs
- `POST /handle_sms` - Send SMS messages with Twilio
- `POST /send_email` - Send emails with SMTP
- `POST /call` - Make voice calls with Twilio

### AWS Services
- `POST /ec2` - Create EC2 instances
- `POST /create_s3_bucket` - Create S3 buckets
- `POST /analyze-image` - Image recognition with AWS Rekognition

### Computer Vision
- `POST /facecrop` - Face detection and cropping
- `POST /uploadfilter` - Apply color filters to images
- `POST /CustomImg` - Generate custom images

### Search & Monitoring
- `POST /google_search` - Google search integration
- `POST /capture_photo` - IP camera photo capture
- `GET /video_feed/<ip>` - Live video streaming

## 🚀 Quick Start

Use the provided script to start both servers:

```bash
chmod +x start-servers.sh
./start-servers.sh
```

Or start manually:

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
source venv/bin/activate
python app.py
```

## 🔑 Environment Variables

Create a `.env` file for sensitive data:

```env
# Twilio Configuration
AC458b12ab68e4d4c4f81d19103a65da77=your_account_sid
7f8dfdb2f46bf8deec8498a1cc03e82e=your_auth_token
+17722667906=your_twilio_number

# AWS Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key

# Email Configuration
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

## 🛠️ Technologies Used

### Frontend
- React 18
- TypeScript
- Vite
- Bootstrap 5
- React Bootstrap
- Framer Motion
- Tailwind CSS

### Backend
- Flask
- Flask-CORS
- Twilio (SMS/Voice)
- AWS Boto3 (EC2, S3, Rekognition)
- OpenCV (Computer Vision)
- Python 3

## 📝 License

MIT License - feel free to use this project for your own portfolio!

## 🎉 Success!

✅ **Both servers are running successfully!**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- All project demos are functional
- 12+ interactive project cards with live demos 