#!/bin/bash
# Simple script to run the app locally with Python's built-in server

echo "Starting US Time Zone Comparator..."
echo "Opening http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null
then
    python3 -m http.server 8000
elif command -v python &> /dev/null
then
    python -m http.server 8000
else
    echo "Python is not installed. Please install Python or open index.html directly in your browser."
fi
