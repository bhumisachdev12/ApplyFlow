# ApplyFlow Troubleshooting Guide

## Common Issues and Solutions

### 1. MongoDB Connection Issues

**Error**: `MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017`

**Solutions**:
- **macOS**: `brew services start mongodb/brew/mongodb-community`
- **Linux**: `sudo systemctl start mongod`
- **Windows**: `net start MongoDB`
- **Docker**: `docker run -d -p 27017:27017 --name mongodb mongo:latest`

### 2. Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solutions**:
- Kill the process: `lsof -ti:5000 | xargs kill -9`
- Change port in `server/.env`: `PORT=5001`

### 3. TypeScript Compilation Errors

**Error**: `Cannot find module '@/types'`

**Solutions**:
- Run `npm install` in the client directory
- Check `client/tsconfig.json` path mapping
- Restart your IDE/editor

### 4. React Beautiful DnD Warnings

**Warning**: `react-beautiful-dnd` strict mode warnings

**Solution**: These are expected in development mode and won't affect production.

### 5. CORS Issues

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solutions**:
- Ensure backend is running on port 5000
- Check `server/src/app.ts` CORS configuration
- Verify `client/.env` API URL is correct

### 6. JWT Token Issues

**Error**: `Invalid or expired token`

**Solutions**:
- Clear localStorage: `localStorage.clear()`
- Check JWT_SECRET in `server/.env`
- Re-login to get a fresh token

### 7. Build Issues

**Error**: Build fails with TypeScript errors

**Solutions**:
- Run `npm run lint` to check for issues
- Update dependencies: `npm update`
- Clear node_modules and reinstall

### 8. Environment Variables Not Loading

**Error**: `process.env.VITE_API_URL is undefined`

**Solutions**:
- Ensure `.env` files exist in both client and server
- Restart development servers
- Check variable names start with `VITE_` for client

## Development Commands

```bash
# Setup project
./setup.sh

# Start development servers
npm run dev
# or
./dev.sh

# Install dependencies
npm run install:all

# Build for production
npm run build

# Lint code
cd client && npm run lint
```

## Useful Debugging

### Check MongoDB Connection
```bash
mongosh
# or
mongo
```

### Check Running Processes
```bash
lsof -i :3000  # Frontend
lsof -i :5000  # Backend
lsof -i :27017 # MongoDB
```

### Clear All Data
```bash
# Clear browser data
localStorage.clear()

# Drop MongoDB database
mongosh
use applyflow
db.dropDatabase()
```

## Getting Help

1. Check this troubleshooting guide
2. Look at console errors in browser dev tools
3. Check server logs in terminal
4. Verify all services are running
5. Try restarting development servers

## Production Deployment Issues

### Vercel Deployment
- Ensure build command is set correctly
- Check environment variables are configured
- Verify output directory is `dist`

### Railway/Render Deployment
- Ensure start command is `cd server && npm start`
- Check all environment variables are set
- Verify MongoDB connection string for production

### MongoDB Atlas
- Whitelist your IP address
- Use correct connection string format
- Ensure database user has proper permissions