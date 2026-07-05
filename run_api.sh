#!/bin/bash
# Quick start script for PulseIQ API

# Activate virtual environment (Windows)
if [ -d ".env" ]; then
    source .env/Scripts/activate
fi

# Run the FastAPI server
echo "Starting PulseIQ API on http://localhost:8000"
python app.py
