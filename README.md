# Social Media Counter for Raspberry Pi

A dashboard to display social media statistics with draggable widgets.

## Installation

1. **Install Dependencies**
   ```bash
   sudo apt update && sudo apt upgrade -y
   sudo apt install python3 python3-pip python3-venv chromium-browser xdotool -y

2. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/social-counter.git
   cd social-counter

3. **Set Up Virtual Environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt

4. **Configure Service**
   ```bash
   sudo cp app/socialcounter.service /etc/systemd/system/
   sudo systemctl daemon-reload
   sudo systemctl enable socialcounter.service

5. **First Run**
   ```bash
   sudo systemctl start socialcounter.service

6. **Configuration**
   - Access the web interface at http://your-pi-ip:5000
   - Click the gear icon to configure:
      - Add social media URLs
      - Set dashboard title
      - Arrange widgets by drag-and-drop

7. **Supported Platforms**

   Initially supported: YouTube, Facebook, Instagram, LinkedIn (requires OAuth setup)

8. **Display Modes**
   Edit start.sh to choose between:
      - Web view mode (default)
      - Fullscreen HDMI mode (uncomment Chromium line)

### Implementation Steps

1. **Hardware Setup**
   - Connect Raspberry Pi to display via HDMI
   - Ensure internet connection

2. **Software Installation**
   ```bash
   # Follow the README.md instructions exactly
   sudo apt update && sudo apt full-upgrade -y
   sudo raspi-config
   # Enable auto-login to CLI

3. **Service Configuration**
   ```bash
   # Edit service file if needed
   sudo nano /etc/systemd/system/socialcounter.service

4. **First Run**
   ```bash
   sudo systemctl start socialcounter
   sudo systemctl status socialcounter

## Adding New Social Media Services
   For additional platforms (after initial setup):

1. **Edit config.json:**
   ```bash
   {
       "services": [
           {
               "platform": "twitter",
               "url": "https://twitter.com/username",
               "label": "Twitter"
           }
       ]
   }

2. **Restart service:**
   ```bash
   sudo systemctl restart socialcounter

## Troubleshooting
- Blank Screen: Check if Flask is running (sudo journalctl -u socialcounter)
- API Errors: Verify URLs in configuration
- Display Issues: Confirm Chromium is installed
