# Netlify Deployment Guide

This guide will help you deploy your React portfolio to Netlify.

## Prerequisites

- A GitHub account
- A Netlify account
- Your portfolio code pushed to a GitHub repository

## Deployment Steps

### 1. Build the Project Locally

First, ensure your project builds successfully:

```bash
npm install
npm run build
```

### 2. Deploy to Netlify

#### Option A: Deploy via Netlify UI (Recommended)

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "New site from Git"
3. Choose your GitHub repository
4. Configure the build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18` (or your preferred version)
5. Click "Deploy site"

#### Option B: Deploy via Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Deploy:
   ```bash
   netlify deploy --prod
   ```

### 3. Environment Variables (Optional)

If you have a backend API, set the environment variable in Netlify:

1. Go to your site settings in Netlify
2. Navigate to "Environment variables"
3. Add:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: Your backend API URL (e.g., `https://your-api.herokuapp.com`)

### 4. Custom Domain (Optional)

1. Go to your site settings in Netlify
2. Navigate to "Domain management"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Configuration Files

The project includes the following configuration files for Netlify:

- `netlify.toml` - Netlify configuration with build settings and redirects
- `src/config/api.ts` - API endpoint configuration
- `env.example` - Example environment variables

## Troubleshooting

### Build Errors

1. Check that all dependencies are installed:
   ```bash
   npm install
   ```

2. Verify the build works locally:
   ```bash
   npm run build
   ```

3. Check the build logs in Netlify for specific errors

### API Issues

- The frontend is configured to work with or without a backend
- If no backend is available, the app will show appropriate messages
- Set `VITE_API_BASE_URL` environment variable to point to your backend

### Routing Issues

- The `netlify.toml` file includes redirects for SPA routing
- All routes will redirect to `index.html` for client-side routing

## Features

- ✅ Responsive design
- ✅ SPA routing support
- ✅ Environment variable configuration
- ✅ Error handling for API calls
- ✅ Fallback messages when backend is unavailable
- ✅ Optimized build for production

## Support

If you encounter issues:

1. Check the Netlify build logs
2. Verify your local build works
3. Check the browser console for errors
4. Ensure all environment variables are set correctly 