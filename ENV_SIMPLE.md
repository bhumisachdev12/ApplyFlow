# ApplyFlow Environment Configuration - Simple Guide

## 📁 Environment Files

### Server (.env)
```bash
# Core Settings
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/applyflow
JWT_SECRET=your-super-secret-jwt-key

# Security
CORS_ORIGIN=http://localhost:3000
JWT_EXPIRES_IN=7d

# Feature Toggles
ENABLE_ANALYTICS=true
ENABLE_SWAGGER=true
ENABLE_DEBUG_LOGS=true
```

### Client (.env)
```bash
# API Settings
VITE_API_URL=http://localhost:5000/api

# App Info
VITE_APP_NAME=ApplyFlow
VITE_APP_VERSION=1.0.0

# Feature Toggles
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_DRAG_DROP=true
VITE_DEBUG=true
```

## 🎛️ Feature Toggles

### Server Features
- `ENABLE_ANALYTICS` - Enable/disable analytics endpoints
- `ENABLE_SWAGGER` - Enable/disable API documentation
- `ENABLE_DEBUG_LOGS` - Enable/disable debug logging

### Client Features
- `VITE_ENABLE_ANALYTICS` - Enable/disable analytics tracking
- `VITE_ENABLE_DARK_MODE` - Enable/disable dark mode toggle
- `VITE_ENABLE_NOTIFICATIONS` - Enable/disable toast notifications
- `VITE_ENABLE_DRAG_DROP` - Enable/disable drag & drop functionality
- `VITE_DEBUG` - Enable/disable debug mode

## 🚀 Quick Setup

### 1. Copy Environment Files
```bash
# Development setup
cp server/.env.example server/.env
cp client/.env.example client/.env
```

### 2. Update Core Settings
Edit `server/.env`:
- Change `JWT_SECRET` to a secure random string
- Update `MONGODB_URI` if using different database

Edit `client/.env`:
- Update `VITE_API_URL` if backend runs on different port

### 3. Toggle Features
```bash
# Use the toggle script
./setup-env.sh

# Or manually edit .env files
# Change true/false values for any ENABLE_* variables
```

## 🔧 Environment Switching

### Development (Default)
- All debug features enabled
- Local database and API
- Relaxed security settings

### Production
```bash
cp server/.env.production server/.env
cp client/.env.production client/.env
```
- Debug features disabled
- MongoDB Atlas connection
- Secure JWT secrets
- HTTPS URLs

### Testing
```bash
cp server/.env.test server/.env
cp client/.env.test client/.env
```
- Minimal features enabled
- Test database
- Fast execution settings

## 🎯 Essential Variables

### Must Change for Production
- `JWT_SECRET` - Use 64+ character random string
- `MONGODB_URI` - Use MongoDB Atlas connection string
- `CORS_ORIGIN` - Set to your domain
- `VITE_API_URL` - Set to your API domain

### Optional but Recommended
- `VITE_APP_NAME` - Your app branding
- Feature toggles based on your needs

## 🔄 Runtime Feature Toggling

### In Browser Console (Development)
```javascript
// Toggle features at runtime
featureToggle.toggleAnalytics()
featureToggle.toggleDarkMode()
featureToggle.printFeatures()
```

### Using Toggle Script
```bash
./setup-env.sh
# Select options 1-11 to toggle specific features
```

---

*Keep it simple, toggle what you need! 🎛️*