#!/bin/bash

# Quick Start Script for Priority Inbox System on macOS/Linux

echo ""
echo "========================================"
echo "Priority Inbox System - Quick Start"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed"
    echo "Download from: https://nodejs.org/"
    exit 1
fi

echo "[1/6] Checking Node.js..."
node --version
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "ERROR: npm is not installed"
    exit 1
fi

echo "[2/6] Checking npm..."
npm --version
echo ""

# Install root dependencies
echo "[3/6] Installing root dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi
echo ""

# Check for token
echo "[4/6] Checking for access token..."
if [ ! -f token.txt ]; then
    echo "WARNING: token.txt not found"
    echo "Please ensure your token.txt file is in the project root"
    echo ""
else
    echo "Token found! You're ready to run Stage 1."
    echo ""
fi

# Install frontend dependencies
echo "[5/6] Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install frontend dependencies"
    cd ..
    exit 1
fi
cd ..
echo ""

echo "[6/6] Setup complete!"
echo ""
echo "========================================"
echo "Next Steps:"
echo "========================================"
echo ""
echo "Stage 1 - Run Backend Algorithm:"
echo "  1. In terminal, navigate to project root"
echo "  2. Set token: export ACCESS_TOKEN=\"YOUR_TOKEN_FROM_token.txt\""
echo "  3. Run: npm run stage1"
echo ""
echo "Stage 2 - Run Frontend:"
echo "  1. In terminal, navigate to project root"
echo "  2. Run: cd frontend && npm run dev"
echo "  3. Open browser: http://localhost:3000"
echo ""
echo "For detailed setup instructions, see SETUP_GUIDE.md"
echo ""
