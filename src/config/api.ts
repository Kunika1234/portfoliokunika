// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  SEND_MESSAGE: `${API_BASE_URL}/send_message`,
  SUBMIT: `${API_BASE_URL}/submit`,
  HANDLE_SMS: `${API_BASE_URL}/handle_sms`,
  SEND_EMAIL: `${API_BASE_URL}/send_email`,
  GOOGLE_SEARCH: `${API_BASE_URL}/google_search`,
  CAPTURE_PHOTO: `${API_BASE_URL}/capture_photo`,
  FACE_CROP: `${API_BASE_URL}/facecrop`,
  UPLOAD_FILTER: `${API_BASE_URL}/uploadfilter`,
  CUSTOM_IMG: `${API_BASE_URL}/CustomImg`,
  EC2: `${API_BASE_URL}/ec2`,
  CREATE_S3_BUCKET: `${API_BASE_URL}/create_s3_bucket`,
  ANALYZE_IMAGE: `${API_BASE_URL}/analyze-image`,
  START_DETECTION_FINGER: `${API_BASE_URL}/start_detection_finger`,
  SEND_WHATSAPP: `${API_BASE_URL}/send_whatsapp`,
  BLUE_GREEN_DEPLOY: `${API_BASE_URL}/bluegreen_deploy`,
  JENKINS_PIPELINE: `${API_BASE_URL}/jenkins_pipeline`,
  FOOD_WASTE_REPORT: `${API_BASE_URL}/food_waste_report`,
  SOCKET: API_BASE_URL,
  IMAGE: (filename: string) => `${API_BASE_URL}/image/${filename}`,
  VIDEO_FEED: (url: string) => `${API_BASE_URL}/video_feed?url=${encodeURIComponent(url)}`,
};

export default API_ENDPOINTS; 