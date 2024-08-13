/**
 * server.js
 * Node.js Backend for Spin2Win Wheel Application
 * Author: MD Asaduzzaman -Areban
 * Description: This Express server serves the front-end assets and saves spin results to a JSON file.
 */

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON data from POST requests
app.use(express.json());

// Route to save spin result
app.post('/save-result', (req, res) => {
    const result = req.body;

    // Path to the JSON file where results will be stored
    const filePath = path.join(__dirname, 'spin-results.json');

    // Read existing data from the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).json({ error: 'Failed to read results file' });
        }

        let results = [];
        if (data) {
            results = JSON.parse(data);
        }

        // Add the new result to the list
        results.push(result);

        // Write the updated results back to the file
        fs.writeFile(filePath, JSON.stringify(results, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save result' });
            }
            res.status(200).json({ message: 'Result saved successfully' });
        });
    });
});

// Serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
