@echo off
REM Quick start script for PulseIQ API (Windows)

if exist ".env" (
    call .env\Scripts\activate.bat
)

echo Starting PulseIQ API on http://localhost:8000
python app.py
