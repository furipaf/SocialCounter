#!/bin/bash

# Activate virtual environment
source /home/$(whoami)/social-counter/venv/bin/activate

# Start Flask application
python3 /home/$(whoami)/social-counter/app.py

# For HDMI Display Mode (uncomment below)
# chromium-browser --kiosk --incognito http://localhost:5000
