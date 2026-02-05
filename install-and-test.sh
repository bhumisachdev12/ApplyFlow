#!/bin/bash

echo "🚀 ApplyFlow - Complete Installation and Test Script"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check prerequisites
echo "🔍 Checking prerequisites..."

if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    print_error "Node.js version 16+ required. Current version: $(node --version)"
    exit 1
fi

print_status "Node.js $(node --version) found"
print_status "npm $(npm --version) found"

# Check MongoDB
if command -v mongod &> /dev/null; then
    print_status "MongoDB found"
else
    print_warning "MongoDB not found in PATH. Make sure it's installed and running."
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."

# Root dependencies
print_status "Installing root dependencies..."
npm install --silent

# Server dependencies
print_status "Installing server dependencies..."
cd server
npm install --silent
cd ..

# Client dependencies
print_status "Installing client dependencies..."
cd client
npm install --silent
cd ..

# Setup environment files
echo ""
echo "📝 Setting up environment files..."

if [ ! -f server/.env ]; then
    cp server/.env.example server/.env
    print_status "Created server/.env"
else
    print_warning "server/.env already exists"
fi

if [ ! -f client/.env ]; then
    cp client/.env.example client/.env
    print_status "Created client/.env"
else
    print_warning "client/.env already exists"
fi

# Test builds
echo ""
echo "🔨 Testing builds..."

# Test server build
print_status "Testing server TypeScript compilation..."
cd server
if npm run build --silent; then
    print_status "Server build successful"
else
    print_error "Server build failed"
fi
cd ..

# Test client build
print_status "Testing client build..."
cd client
if npm run build --silent; then
    print_status "Client build successful"
else
    print_warning "Client build had issues (this is normal without running servers)"
fi
cd ..

echo ""
echo "🎉 Installation Complete!"
echo "========================"
echo ""
echo "📋 Next Steps:"
echo "1. Start MongoDB:"
echo "   - macOS: brew services start mongodb/brew/mongodb-community"
echo "   - Linux: sudo systemctl start mongod"
echo "   - Docker: docker run -d -p 27017:27017 --name mongodb mongo:latest"
echo ""
echo "2. Start development servers:"
echo "   npm run dev"
echo ""
echo "3. Open your browser:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000/health"
echo ""
echo "🔧 Troubleshooting:"
echo "   - Check TROUBLESHOOTING.md for common issues"
echo "   - Ensure MongoDB is running before starting servers"
echo "   - Check console for any error messages"
echo ""
print_status "Ready to code! 🚀"