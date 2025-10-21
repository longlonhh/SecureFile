@echo off
echo Starting Secure File Server...

echo.
echo Checking MongoDB...
mongod --version >nul 2>&1
if %errorlevel% neq 0 (
    echo MongoDB is not installed or not in PATH
    echo Please install MongoDB or use MongoDB Atlas
    echo See SETUP_INSTRUCTIONS.md for details
    pause
    exit /b 1
)

echo Starting MongoDB...
start "MongoDB" mongod

echo Waiting for MongoDB to start...
timeout /t 3 /nobreak >nul

echo Starting Node.js server...
cd server
npm start

pause
