#!/bin/bash

echo "🚀 Setting up ApplyFlow..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server && npm install && cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client && npm install && cd ..

# Copy environment files
echo "📝 Setting up environment files..."
if [ ! -f server/.env ]; then
    cp server/.env.example server/.env
    echo "✅ Created server/.env from example"
else
    echo "ℹ️  server/.env already exists"
fi

if [ ! -f client/.env ]; then
    cp client/.env.example client/.env
    echo "✅ Created client/.env from example"
else
    echo "ℹ️  client/.env already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Make sure MongoDB is running on your system"
echo "   - Install MongoDB: https://docs.mongodb.com/manual/installation/"
echo "   - Start MongoDB: mongod (or brew services start mongodb/brew/mongodb-community)"
echo "2. Update environment variables in server/.env and client/.env if needed"
echo "3. Run 'npm run dev' to start both frontend and backend"
echo ""
echo "🌐 The app will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo "   Health:   http://localhost:5000/health"
echo ""
echo "Happy coding! 🚀"