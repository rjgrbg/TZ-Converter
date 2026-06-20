@echo off
REM Simple script to run the app locally with Python's built-in server

echo Starting US Time Zone Comparator...
echo Opening http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% == 0 (
    python -m http.server 8000
) else (
    echo Python is not installed. Please install Python or open index.html directly in your browser.
    pause
)
