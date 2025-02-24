# Social Media Dashboard for Raspberry Pi

This project is a web-based application designed to run on a Raspberry Pi. It fetches and displays social media analytics (e.g., Facebook, Instagram) in real-time. The application includes an admin console for configuring API credentials and a responsive frontend for displaying data.

## Features
- **Real-time Data Fetching**: Fetches data from Facebook and other social media platforms using their APIs.
- **Admin Console**: Allows users to input API credentials, select fields to display, and manage data.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.
- **Manual Refresh**: Users can manually refresh the data using a refresh button.
- **Drag-and-Drop Support**: (Future feature) Allows reordering of social media data boxes.

## Directory Structure
```
/social-counter
│
├── /assets
│   └── /icons
│       └── facebook.png          # Facebook logo
│
├── /css
│   └── styles.css                # CSS styles for the application
│
├── /data                         # Directory for storing fetched data
│
├── /js
│   ├── admin.js                  # JavaScript for the admin console
│   └── main.js                   # JavaScript for the main dashboard
│
├── /api
│   ├── facebook.js               # Facebook API integration
│   └── instagram.js              # Instagram API integration (future)
│
├── index.html                    # Main dashboard page
├── admin.html                    # Admin console page
├── server.js                     # Node.js server script
├── package.json                  # Node.js dependencies
└── README.md                     # This file
```

---

## Installation

### Prerequisites
1. **Raspberry Pi**: Running Raspberry Pi OS (preferably Lite version).
2. **Node.js**: Install Node.js and npm on your Raspberry Pi.
3. **Facebook API Access**: A Facebook Developer account and a valid Page Access Token.

### Step 1: Clone the Repository
1. Open the terminal on your Raspberry Pi.
2. Clone the repository:
   ```bash
   git clone https://github.com/furipaf/social-counter.git
   cd social-counter
   md data
   ```

### Step 2: Install Dependencies
1. Install the required Node.js packages:
   ```bash
   npm install express body-parser fs path node-fetch
   ```

### Step 3: Configure the Application
1. **Facebook API**:
   - Obtain a **Page Access Token** from the [Facebook Graph API Explorer](https://developers.facebook.com/tools/explorer/).
   - Open the admin console (`http://<raspberry-pi-ip>:3000/admin`).
   - Enter the **Page Access Token** and **Page ID** in the Facebook settings form.

2. **Other Social Media Platforms**:
   - Follow similar steps for Instagram, Twitter, etc., by adding their respective API credentials in the admin console.

### Step 4: Start the Server
1. Run the Node.js server:
   ```bash
   node server.js
   ```
2. The application will be accessible at:
   - **Dashboard**: `http://<raspberry-pi-ip>:3000`
   - **Admin Console**: `http://<raspberry-pi-ip>:3000/admin`

---

## Usage

### Dashboard (`index.html`)
- Displays real-time social media analytics in a responsive layout.
- Use the **refresh icon** (<i class="fa fa-refresh"></i>) in the top-right corner to manually refresh the data.

### Admin Console (`admin.html`)
- Configure API credentials for social media platforms.
- Select which fields to display (e.g., fan count, followers count).
- Delete old data files using the "Delete Old Data" button.

### Icons
- **Home Icon** (<i class="fa fa-home"></i>): Redirects to the dashboard.
- **Info Icon** (<i class="fa fa-info-circle"></i>): Opens the Facebook Graph API documentation in a new tab.

---

## Screenshots

### Dashboard
![1740380574080](https://github.com/user-attachments/assets/118e03a6-3183-4fd0-a6fe-658789174e14)


### Admin Console
![1740380574083](https://github.com/user-attachments/assets/e53b41b7-18c7-4d03-998e-66c503db6ba6)


---

## Future Enhancements
1. **Support for More Platforms**: Add integrations for Instagram, Twitter, LinkedIn, etc.
2. **Drag-and-Drop Interface**: Allow users to reorder social media data boxes.
3. **Auto-Refresh**: Add an option to enable/disable auto-refresh.
4. **User Authentication**: Secure the admin console with a login system.

---

## Contributing
Contributions are welcome! If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.
4. NOTE: Currently only Facebook is added for display, if you want other social media platforms, please mention Social Media Platform Name and the required fields, I will add them on request basis only.

---

## Acknowledgments
- **Font Awesome**: For providing the icons used in this project.
- **Facebook Graph API**: For enabling access to Facebook data.

---

Enjoy using the Social Media Dashboard! If you have any questions or issues, feel free to open an issue on GitHub.

