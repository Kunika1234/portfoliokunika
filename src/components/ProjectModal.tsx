import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button, Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { API_ENDPOINTS } from '../config/api';

interface ProjectModalProps {
  show: boolean;
  onHide: () => void;
  projectTitle: string;
  showLiveDemo?: boolean;
  liveUrl?: string;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ show, onHide, projectTitle, showLiveDemo, liveUrl }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    appName: '',
    environment: '',
    version: '',
    repoUrl: '',
    branch: '',
    location: '',
    amount: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  // Demo-specific states
  const [smsData, setSmsData] = useState({ number: '', message: '', delay_minutes: 0 });
  const [emailData, setEmailData] = useState({ to_email: '', subject: '', body: '', delay_seconds: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [ipCamera, setIpCamera] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [filterColor, setFilterColor] = useState('red');
  const [customImageData, setCustomImageData] = useState({
    width: 400, height: 300, shape: 'rectangle',
    start_x: 50, start_y: 50, end_x: 350, end_y: 250,
    color_r: 255, color_g: 0, color_b: 0, radius: 50, thickness: 2
  });
  const [generatedImage, setGeneratedImage] = useState<{preview: string, download_url: string} | null>(null);
  const [awsData, setAwsData] = useState({
    aws_access_key_id: '', aws_secret_access_key: '', region: 'us-east-1',
    instance_type: 't2.micro', image_id: '', max_count: 1, min_count: 1,
    bucket_name: ''
  });

  // Add state for output images
  const [croppedFaceUrls, setCroppedFaceUrls] = useState<string[]>([]);
  const [filteredImageUrl, setFilteredImageUrl] = useState<string | null>(null);
  const [faceCropError, setFaceCropError] = useState<string | null>(null);

  // Add state for Instagram Auto Poster form
  const [instaUsername, setInstaUsername] = useState('');
  const [instaPassword, setInstaPassword] = useState('');
  const [instaDescription, setInstaDescription] = useState('');
  const [instaSong, setInstaSong] = useState('');
  const [instaImage, setInstaImage] = useState<File | null>(null);

  // Add state for WhatsApp Automation Tool form
  const [waNumber, setWaNumber] = useState('');
  const [waMessage, setWaMessage] = useState('');
  const [waSchedule, setWaSchedule] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.SUBMIT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, project: projectTitle }),
      });
      const result = await response.json();
      setMessage(result.message);
      setMessageType('success');
    } catch (error) {
      setMessage('Error submitting form');
      setMessageType('error');
    }
    setLoading(false);
  };

  // SMS Demo
  const handleSmsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.HANDLE_SMS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(smsData),
      });
      const result = await response.json();
      setMessage(result.message);
      setMessageType(result.status === 'success' ? 'success' : 'error');
    } catch (error) {
      setMessage('Error sending SMS');
      setMessageType('error');
    }
    setLoading(false);
  };

  // Email Demo
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.SEND_EMAIL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData),
      });
      const result = await response.json();
      setMessage(result.message);
      setMessageType(result.status === 'success' ? 'success' : 'error');
    } catch (error) {
      setMessage('Error sending email');
      setMessageType('error');
    }
    setLoading(false);
  };

  // Google Search Demo
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.GOOGLE_SEARCH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });
      const result = await response.json();
      setSearchResults(result.results);
      setMessage('Search completed successfully');
      setMessageType('success');
    } catch (error) {
      setMessage('Error performing search');
      setMessageType('error');
    }
    setLoading(false);
  };

  // IP Camera Demo
  const handleCapturePhoto = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.CAPTURE_PHOTO, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip: ipCamera }),
      });
      const result = await response.json();
      setMessage(result.message);
      setMessageType('success');
    } catch (error) {
      setMessage('Error capturing photo');
      setMessageType('error');
    }
    setLoading(false);
  };

  // Face Crop Demo
  const handleFaceCrop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      setMessage('Please select an image file');
      setMessageType('error');
      return;
    }
    setLoading(true);
    setFaceCropError(null);
    setCroppedFaceUrls([]);
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      const response = await fetch(API_ENDPOINTS.FACE_CROP, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.error) {
        setFaceCropError(result.error);
        setMessageType('error');
      } else if (result.output_images && result.output_images.length > 0) {
        setCroppedFaceUrls(result.output_images.map(img => API_ENDPOINTS.IMAGE(img)));
        setMessage(result.message);
        setMessageType('success');
      }
    } catch (error) {
      setMessage('Error processing image');
      setMessageType('error');
    }
    setLoading(false);
  };

  // Image Filter Demo
  const handleImageFilter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      setMessage('Please select an image file');
      setMessageType('error');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('filter_color', filterColor);
      const response = await fetch(API_ENDPOINTS.UPLOAD_FILTER, {
        method: 'POST',
        body: formData,
      });
      // The response is an image, so get the blob and create a URL
      const blob = await response.blob();
      setFilteredImageUrl(URL.createObjectURL(blob));
      setMessage('Image filtered successfully');
      setMessageType('success');
    } catch (error) {
      setMessage('Error filtering image');
      setMessageType('error');
    }
    setLoading(false);
  };

  // Custom Image Demo
  const handleCustomImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(customImageData).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
      const response = await fetch(API_ENDPOINTS.CUSTOM_IMG, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setMessage(result.message);
        setMessageType('success');
        setGeneratedImage({
          preview: result.preview,
          download_url: `${API_ENDPOINTS.SOCKET}${result.download_url}`
        });
      } else {
        setMessage(result.error || 'Error generating custom image');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error generating custom image');
      setMessageType('error');
    }
    setLoading(false);
  };

  // AWS EC2 Demo
  const handleEC2Create = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(awsData).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
      const response = await fetch(API_ENDPOINTS.EC2, {
        method: 'POST',
        body: formData,
      });
      setMessage('EC2 instance created successfully');
      setMessageType('success');
    } catch (error) {
      setMessage('Error creating EC2 instance');
      setMessageType('error');
    }
    setLoading(false);
  };

  // S3 Bucket Demo
  const handleS3Create = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('aws_access_key_id', awsData.aws_access_key_id);
      formData.append('aws_secret_access_key', awsData.aws_secret_access_key);
      formData.append('bucket_name', awsData.bucket_name);
      formData.append('region', awsData.region);
      const response = await fetch(API_ENDPOINTS.CREATE_S3_BUCKET, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      setMessage(result.message);
      setMessageType(result.status === 'success' ? 'success' : 'error');
    } catch (error) {
      setMessage('Error creating S3 bucket');
      setMessageType('error');
    }
    setLoading(false);
  };

  // Image Recognition Demo
  const handleImageRecognition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      setMessage('Please select an image file');
      setMessageType('error');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('imageFile', imageFile);
      const response = await fetch(API_ENDPOINTS.ANALYZE_IMAGE, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      setMessage(`Detected objects: ${result.message}`);
      setMessageType('success');
    } catch (error) {
      setMessage('Error analyzing image');
      setMessageType('error');
    }
    setLoading(false);
  };

  // Hand Detection Demo
  const handleHandDetection = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.START_DETECTION_FINGER, {
        method: 'POST',
      });
      const result = await response.json();
      setMessage(result.message);
      setMessageType('success');
    } catch (error) {
      setMessage('Error starting hand detection');
      setMessageType('error');
    }
    setLoading(false);
  };

  const handleWhatsAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.SEND_WHATSAPP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: waNumber, message: waMessage, schedule: waSchedule }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        if (result.url) {
          // Show success message with clickable WhatsApp Web URL
          setMessage(`${result.message} Click here to open WhatsApp Web: ${result.url}`);
          // Open WhatsApp Web in new tab
          window.open(result.url, '_blank');
        } else {
          setMessage(result.message);
        }
      } else {
        setMessage(result.message);
      }
      setMessageType(result.status === 'success' ? 'success' : 'error');
    } catch (error) {
      setMessage('Error sending WhatsApp message');
      setMessageType('error');
    }
    setLoading(false);
  };

  const renderDemoContent = () => {
    // Always match projectTitle to a specific form/demo if possible
    switch (projectTitle) {
      case 'IP Camera Surveillance':
        return (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>IP Camera Stream URL</Form.Label>
              <Form.Control
                type="text"
                value={ipCamera}
                onChange={(e) => setIpCamera(e.target.value)}
                placeholder="http://192.168.1.100:8080/video"
              />
            </Form.Group>
            <Button variant="primary" onClick={handleCapturePhoto} disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Capture Photo'}
            </Button>
            {ipCamera && (
              <div className="mt-3">
                <h6>Live Feed:</h6>
                <img src={API_ENDPOINTS.VIDEO_FEED(ipCamera)} alt="Camera Feed" style={{maxWidth: '100%'}} />
              </div>
            )}
          </Form>
        );
      case 'Twilio Communication Suite':
        return (
          <Form onSubmit={handleSmsSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={smsData.number}
                onChange={(e) => setSmsData({...smsData, number: e.target.value})}
                placeholder="+1234567890"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={smsData.message}
                onChange={(e) => setSmsData({...smsData, message: e.target.value})}
                placeholder="Enter your message"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Delay (minutes)</Form.Label>
              <Form.Control
                type="number"
                value={smsData.delay_minutes}
                onChange={(e) => setSmsData({...smsData, delay_minutes: parseInt(e.target.value)})}
                min="0"
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Send SMS'}
            </Button>
          </Form>
        );
      case 'Google Search Integration':
        return (
          <Form onSubmit={handleSearchSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Search Query</Form.Label>
              <Form.Control
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter search term"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Search'}
            </Button>
            {searchResults.length > 0 && (
              <div className="mt-3">
                <h6>Search Results:</h6>
                <div className="list-group">
                  {searchResults.map((result, index) => (
                    <a 
                      key={index} 
                      href={result} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="list-group-item list-group-item-action"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">Result {index + 1}</h6>
                        <small className="text-muted">Click to open</small>
                      </div>
                      <p className="mb-1 text-truncate">{result}</p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </Form>
        );
      case 'AWS DevOps Blue Green Deployment':
        return (
          <Form onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            try {
              const response = await fetch(API_ENDPOINTS.BLUE_GREEN_DEPLOY, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  appName: formData.appName,
                  environment: formData.environment,
                  version: formData.version,
                }),
              });
              const result = await response.json();
              setMessage(result.message || 'Deployment triggered!');
              setMessageType('success');
            } catch (error) {
              setMessage('Error triggering deployment');
              setMessageType('error');
            }
            setLoading(false);
          }}>
            <Form.Group className="mb-3">
              <Form.Label>Application Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.appName || ''}
                onChange={e => setFormData({ ...formData, appName: e.target.value })}
                placeholder="e.g. my-app"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Environment</Form.Label>
              <Form.Select
                value={formData.environment || ''}
                onChange={e => setFormData({ ...formData, environment: e.target.value })}
                required
              >
                <option value="">Select Environment</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Version</Form.Label>
              <Form.Control
                type="text"
                value={formData.version || ''}
                onChange={e => setFormData({ ...formData, version: e.target.value })}
                placeholder="e.g. v1.2.3"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Trigger Deployment'}
            </Button>
          </Form>
        );
      case 'Jenkins Docker Node Pipeline':
        return (
          <Form onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            try {
              const response = await fetch(API_ENDPOINTS.JENKINS_PIPELINE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  repoUrl: formData.repoUrl,
                  branch: formData.branch,
                }),
              });
              const result = await response.json();
              setMessage(result.message || 'Pipeline triggered!');
              setMessageType('success');
            } catch (error) {
              setMessage('Error triggering pipeline');
              setMessageType('error');
            }
            setLoading(false);
          }}>
            <Form.Group className="mb-3">
              <Form.Label>Repository URL</Form.Label>
              <Form.Control
                type="text"
                value={formData.repoUrl || ''}
                onChange={e => setFormData({ ...formData, repoUrl: e.target.value })}
                placeholder="e.g. https://github.com/user/repo.git"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Branch</Form.Label>
              <Form.Control
                type="text"
                value={formData.branch || ''}
                onChange={e => setFormData({ ...formData, branch: e.target.value })}
                placeholder="e.g. main"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Trigger Pipeline'}
            </Button>
          </Form>
        );
      case 'Food Waste Management':
        return (
          <Form onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            try {
              const response = await fetch(API_ENDPOINTS.FOOD_WASTE_REPORT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  location: formData.location,
                  amount: formData.amount,
                  description: formData.description,
                }),
              });
              const result = await response.json();
              setMessage(result.message || 'Report submitted!');
              setMessageType('success');
            } catch (error) {
              setMessage('Error submitting report');
              setMessageType('error');
            }
            setLoading(false);
          }}>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={formData.location || ''}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. City, Area"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount (kg)</Form.Label>
              <Form.Control
                type="number"
                value={formData.amount || ''}
                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                placeholder="e.g. 10"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description || ''}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the food waste situation"
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Submit Report'}
            </Button>
          </Form>
        );
      case 'Computer Vision Image Processor':
        return (
          <div>
            <Row>
              <Col md={6}>
                <h6>Face Crop</h6>
                <Form onSubmit={handleFaceCrop}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="face-crop-upload">Upload Image for Face Crop</Form.Label>
                    <Form.Control
                      id="face-crop-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setImageFile((e.target as HTMLInputElement).files?.[0] || null);
                        setCroppedFaceUrls([]);
                        setFaceCropError(null);
                      }}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Crop Face'}
                  </Button>
                </Form>
              </Col>
              <Col md={6}>
                <h6>Image Filter</h6>
                <Form onSubmit={handleImageFilter}>
                  <Form.Group className="mb-3">
                    <Form.Label>Filter Color</Form.Label>
                    <Form.Select
                      value={filterColor}
                      onChange={(e) => setFilterColor(e.target.value)}
                    >
                      <option value="red">Red</option>
                      <option value="green">Green</option>
                      <option value="blue">Blue</option>
                    </Form.Select>
                  </Form.Group>
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Apply Filter'}
                  </Button>
                </Form>
              </Col>
            </Row>
            {faceCropError && (
              <div className="mt-3 text-center text-danger">
                <h6>{faceCropError}</h6>
              </div>
            )}
            {croppedFaceUrls.length > 0 && (
              <div className="mt-3 text-center">
                <h6>Cropped Face Preview{croppedFaceUrls.length > 1 ? 's' : ''}:</h6>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {croppedFaceUrls.map((url, idx) => (
                    <img key={idx} src={url} alt={`Cropped Face ${idx + 1}`} style={{maxWidth: '100px', border: '1px solid #ddd'}} />
                  ))}
                </div>
              </div>
            )}
            {filteredImageUrl && (
              <div className="mt-3 text-center">
                <h6>Filtered Image Preview:</h6>
                <img src={filteredImageUrl} alt="Filtered" style={{maxWidth: '100px', border: '1px solid #ddd'}} />
              </div>
            )}
          </div>
        );
      case 'Custom Image Generator':
        return (
          <Form onSubmit={handleCustomImage}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Width</Form.Label>
                  <Form.Control
                    type="number"
                    value={customImageData.width}
                    onChange={(e) => setCustomImageData({...customImageData, width: parseInt(e.target.value)})}
                    min="1"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Height</Form.Label>
                  <Form.Control
                    type="number"
                    value={customImageData.height}
                    onChange={(e) => setCustomImageData({...customImageData, height: parseInt(e.target.value)})}
                    min="1"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Shape</Form.Label>
                  <Form.Select
                    value={customImageData.shape}
                    onChange={(e) => setCustomImageData({...customImageData, shape: e.target.value})}
                  >
                    <option value="rectangle">Rectangle</option>
                    <option value="circle">Circle</option>
                    <option value="line">Line</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Color (R)</Form.Label>
                  <Form.Control
                    type="number"
                    value={customImageData.color_r}
                    onChange={(e) => setCustomImageData({...customImageData, color_r: parseInt(e.target.value)})}
                    min="0"
                    max="255"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Color (G)</Form.Label>
                  <Form.Control
                    type="number"
                    value={customImageData.color_g}
                    onChange={(e) => setCustomImageData({...customImageData, color_g: parseInt(e.target.value)})}
                    min="0"
                    max="255"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Color (B)</Form.Label>
                  <Form.Control
                    type="number"
                    value={customImageData.color_b}
                    onChange={(e) => setCustomImageData({...customImageData, color_b: parseInt(e.target.value)})}
                    min="0"
                    max="255"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Generate Image'}
            </Button>
            
            {generatedImage && (
              <div className="mt-4">
                <h6>Generated Image:</h6>
                <div className="text-center mb-3">
                  <img 
                    src={generatedImage.preview} 
                    alt="Generated Image" 
                    style={{maxWidth: '100%', maxHeight: '300px', border: '1px solid #ddd'}}
                  />
                </div>
                <div className="d-flex gap-2 justify-content-center">
                  <a 
                    href={generatedImage.download_url} 
                    download
                    className="btn btn-outline-success"
                  >
                    ⬇️ Download Image
                  </a>
                </div>
              </div>
            )}
          </Form>
        );

      case 'AWS EC2 Instance Manager':
        return (
          <div>
            <Form onSubmit={handleEC2Create}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>AWS Access Key ID</Form.Label>
                    <Form.Control
                      type="text"
                      value={awsData.aws_access_key_id}
                      onChange={(e) => setAwsData({...awsData, aws_access_key_id: e.target.value})}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>AWS Secret Access Key</Form.Label>
                    <Form.Control
                      type="password"
                      value={awsData.aws_secret_access_key}
                      onChange={(e) => setAwsData({...awsData, aws_secret_access_key: e.target.value})}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Region</Form.Label>
                    <Form.Select
                      value={awsData.region}
                      onChange={(e) => setAwsData({...awsData, region: e.target.value})}
                    >
                      <option value="us-east-1">US East (N. Virginia)</option>
                      <option value="us-west-2">US West (Oregon)</option>
                      <option value="ap-south-1">Asia Pacific (Mumbai)</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Instance Type</Form.Label>
                    <Form.Select
                      value={awsData.instance_type}
                      onChange={(e) => setAwsData({...awsData, instance_type: e.target.value})}
                    >
                      <option value="t2.micro">t2.micro</option>
                      <option value="t2.small">t2.small</option>
                      <option value="t2.medium">t2.medium</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Image ID</Form.Label>
                    <Form.Control
                      type="text"
                      value={awsData.image_id}
                      onChange={(e) => setAwsData({...awsData, image_id: e.target.value})}
                      placeholder="ami-xxxxxxxxx"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Count</Form.Label>
                    <Form.Control
                      type="number"
                      value={awsData.max_count}
                      onChange={(e) => setAwsData({...awsData, max_count: parseInt(e.target.value), min_count: parseInt(e.target.value)})}
                      min="1"
                      max="10"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Create EC2 Instance'}
              </Button>
            </Form>
            <hr />
            <Button variant="success" onClick={handleHandDetection} disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Start Hand Detection'}
            </Button>
            <small className="text-muted d-block mt-2">Use hand gestures to create EC2 instances</small>
          </div>
        );

      case 'AWS S3 Bucket Manager':
        return (
          <Form onSubmit={handleS3Create}>
            <Form.Group className="mb-3">
              <Form.Label>AWS Access Key ID</Form.Label>
              <Form.Control
                type="text"
                value={awsData.aws_access_key_id}
                onChange={(e) => setAwsData({...awsData, aws_access_key_id: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>AWS Secret Access Key</Form.Label>
              <Form.Control
                type="password"
                value={awsData.aws_secret_access_key}
                onChange={(e) => setAwsData({...awsData, aws_secret_access_key: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bucket Name</Form.Label>
              <Form.Control
                type="text"
                value={awsData.bucket_name}
                onChange={(e) => setAwsData({...awsData, bucket_name: e.target.value})}
                placeholder="my-unique-bucket-name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Region</Form.Label>
              <Form.Select
                value={awsData.region}
                onChange={(e) => setAwsData({...awsData, region: e.target.value})}
              >
                <option value="us-east-1">US East (N. Virginia)</option>
                <option value="us-west-2">US West (Oregon)</option>
                <option value="ap-south-1">Asia Pacific (Mumbai)</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Create S3 Bucket'}
            </Button>
          </Form>
        );

      case 'AI Image Recognition System':
        return (
          <Form onSubmit={handleImageRecognition}>
            <Form.Group className="mb-3">
              <Form.Label>Upload Image for Analysis</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile((e.target as HTMLInputElement).files?.[0] || null)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Analyze Image'}
            </Button>
          </Form>
        );

      case 'Instagram Auto Poster':
        return (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Instagram Username</Form.Label>
              <Form.Control
                type="text"
                value={instaUsername}
                onChange={e => setInstaUsername(e.target.value)}
                placeholder="Enter your Instagram username"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Instagram Password</Form.Label>
              <Form.Control
                type="password"
                value={instaPassword}
                onChange={e => setInstaPassword(e.target.value)}
                placeholder="Enter your Instagram password"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Image to Post</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={e => setInstaImage((e.target as HTMLInputElement).files?.[0] || null)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={instaDescription}
                onChange={e => setInstaDescription(e.target.value)}
                placeholder="Write a caption for your post"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Song (optional)</Form.Label>
              <Form.Control
                type="text"
                value={instaSong}
                onChange={e => setInstaSong(e.target.value)}
                placeholder="Enter a song name (optional)"
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Post to Instagram'}
            </Button>
          </Form>
        );

      case 'WhatsApp Automation Tool':
        return (
          <Form onSubmit={handleWhatsAppSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={waNumber}
                onChange={e => setWaNumber(e.target.value)}
                placeholder="Enter recipient's phone number (with country code)"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={waMessage}
                onChange={e => setWaMessage(e.target.value)}
                placeholder="Type your WhatsApp message"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Schedule Time (optional)</Form.Label>
              <Form.Control
                type="datetime-local"
                value={waSchedule}
                onChange={e => setWaSchedule(e.target.value)}
              />
            </Form.Group>
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Send WhatsApp Message'}
            </Button>
          </Form>
        );

      case 'Email Automation System':
        return (
          <Form onSubmit={handleEmailSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>To Email</Form.Label>
              <Form.Control
                type="email"
                value={emailData.to_email}
                onChange={(e) => setEmailData({...emailData, to_email: e.target.value})}
                placeholder="recipient@example.com"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                value={emailData.subject}
                onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                placeholder="Email subject"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={emailData.body}
                onChange={(e) => setEmailData({...emailData, body: e.target.value})}
                placeholder="Email body"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Delay (seconds)</Form.Label>
              <Form.Control
                type="number"
                value={emailData.delay_seconds}
                onChange={(e) => setEmailData({...emailData, delay_seconds: parseInt(e.target.value)})}
                min="0"
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Send Email'}
            </Button>
          </Form>
        );

      default:
        return (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control name="name" type="text" required value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Your Email</Form.Label>
              <Form.Control name="email" type="email" required value={formData.email} onChange={handleChange} />
            </Form.Group>
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Submit Interest'}
            </Button>
          </Form>
        );
    }
  };

  // Reset state on modal close or project change
  useEffect(() => {
    setCroppedFaceUrls([]);
    setFaceCropError(null);
    setFilteredImageUrl(null);
    setMessage('');
    setMessageType('');
  }, [show, projectTitle]);

  // Reset Instagram form state on modal close or project change
  useEffect(() => {
    setInstaUsername('');
    setInstaPassword('');
    setInstaDescription('');
    setInstaSong('');
    setInstaImage(null);
  }, [show, projectTitle]);

  // Reset WhatsApp form state on modal close or project change
  useEffect(() => {
    setWaNumber('');
    setWaMessage('');
    setWaSchedule('');
  }, [show, projectTitle]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="relative w-full max-w-2xl mx-4 rounded-3xl shadow-2xl border-2 border-blue-400/30 bg-white/80 backdrop-blur-lg p-0 overflow-hidden animate-fade-in"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-5 bg-gradient-to-r from-blue-600 to-cyan-400">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                {projectTitle} <span className="font-normal text-white/80">- Live Demo</span>
              </h3>
              <button
                className="text-white hover:text-blue-200 bg-white/10 hover:bg-blue-500/30 rounded-full p-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={onHide}
                aria-label="Close modal"
              >
                <X size={28} />
              </button>
            </div>
            {/* Body */}
            <div className="px-8 py-7 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {message && (
                <Alert variant={messageType === 'success' ? 'success' : 'danger'} dismissible onClose={() => setMessage('')}>
                  {message}
                </Alert>
              )}
              <div className="space-y-6">
                {renderDemoContent()}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal; 