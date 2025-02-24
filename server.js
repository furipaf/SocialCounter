const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

// Middleware to parse JSON and serve static files
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve static files from the root directory

// Ensure the /data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Endpoint to serve the latest data
app.get('/getLatestData', (req, res) => {
    try {
        const files = fs.readdirSync(dataDir);

        if (files.length === 0) {
            return res.json([]); // Return an empty array if no data is available
        }

        // Read the latest file
        const latestFile = files[files.length - 1];
        const filePath = path.join(dataDir, latestFile);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        // Parse the file content and send it as JSON
        const data = JSON.parse(fileContent);
        res.json([data]); // Return as an array to match the expected format
    } catch (error) {
        console.error('Error fetching latest data:', error);
        res.status(500).json({ error: 'Failed to fetch latest data' });
    }
});

// Endpoint to fetch Facebook data
app.get('/api/facebook', async (req, res) => {
    const { accessToken, pageId, fields } = req.query;
    const url = `https://graph.facebook.com/v22.0/${pageId}?fields=${fields}&access_token=${accessToken}`;

    console.log('Fetching Facebook data from:', url); // Debugging: Log the API URL

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Facebook API Response:', data); // Debugging: Log the API response

        if (data.error) {
            throw new Error(data.error.message);
        }

        res.json(data);
    } catch (error) {
        console.error('Error fetching Facebook data:', error);
        res.status(500).json({ error: error.message });
    }
});
// Endpoint to save data
app.post('/saveData', (req, res) => {
    const data = req.body;
    console.log('Received data:', data); // Debugging: Log the received data

    // Save the data to a file
    const filename = path.join(dataDir, `facebook_${Date.now()}.txt`);
    fs.writeFileSync(filename, JSON.stringify(data, null, 2)); // Pretty-print JSON for readability
    console.log('Data saved to:', filename); // Debugging: Log the file path

    res.send({ status: 'success' });
});

// Endpoint to delete old data
app.post('/deleteData', (req, res) => {
    try {
        const files = fs.readdirSync(dataDir);

        files.forEach(file => {
            const filePath = path.join(dataDir, file);
            fs.unlinkSync(filePath);
            console.log('Deleted file:', filePath);
        });

        res.send({ status: 'success', message: 'Old data deleted' });
    } catch (error) {
        console.error('Error deleting old data:', error);
        res.status(500).json({ error: 'Failed to delete old data' });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});