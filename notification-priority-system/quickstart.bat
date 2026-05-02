@echo off
REM Quick Start Script for Priority Inbox System on Windows

echo.
echo ========================================
echo Priority Inbox System - Quick Start
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo [1/6] Checking Node.js...
node --version
echo.

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed or not in PATH
    pause
    exit /b 1
)

echo [2/6] Checking npm...
npm --version
echo.

REM Install root dependencies
echo [3/6] Installing root dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo.

REM Check for token
echo [4/6] Checking for access token...
if not exist token.txt (
    echo WARNING: token.txt not found
    echo Please ensure your token.txt file is in the project root
    echo.
)

REM Display the token for user reference
if exist token.txt (
    echo Token found! You're ready to run Stage 1.
    echo.
)

REM Install frontend dependencies
echo [5/6] Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies
    cd ..
    pause
    exit /b 1
)
cd ..
echo.

echo [6/6] Setup complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo.
echo Stage 1 - Run Backend Algorithm:
echo   1. Open PowerShell and navigate to project root
echo   2. Set token: $env:ACCESS_TOKEN = "YOUR_TOKEN_FROM_token.txt"
echo   3. Run: npm run stage1
echo.
echo Stage 2 - Run Frontend:
echo   1. Open Command Prompt and navigate to project root
echo   2. Run: cd frontend
echo   3. Run: npm run dev
echo   4. Open browser: http://localhost:3000
echo.
echo For detailed setup instructions, see SETUP_GUIDE.md
echo.
pause
