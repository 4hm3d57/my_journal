@echo off
echo Installing Node.js dependencies...

REM Change the path to your project directory
cd "C:\Users\Ahmed\programming\my_journal"

REM Install Express and other dependencies
npm install express path mongoose body-parser bcrypt ejs

echo Node.js dependencies installed successfully.
pause

