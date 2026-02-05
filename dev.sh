#!/bin/bash

echo "🚀 Starting ApplyFlow development servers..."

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB doesn't appear to be running."
    echo "   Please start MongoDB first:"
    echo "   - macOS: brew services start mongodb/brew/mongodb-community"
    echo "   - Linux: sudo systemctl start mongod"
    echo "   - Windows: net start MongoDB"
    echo ""
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Start the development servers
echo "🔥 Starting both frontend and backend..."
npm run dev