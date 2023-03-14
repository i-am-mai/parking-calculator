const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const https = require('https');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("../app/build"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../app/build', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../app/build', 'index.html'));
});

app.get('/search', (req, res) => {
    let url = new URL("https://nominatim.openstreetmap.org/search?format=jsonv2");  
    let query = req.query.q;
    url.searchParams.append('q', query);

    const options = {
        method: 'GET',
        headers: { 'User-Agent': 'Mozilla/5.0' }
    }

    const request = https.request(url, options, response => {
        let data = '';
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });
        
        response.on('end', () => {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        })
    });

    request.on('error', (e) => {
        console.error(e);
    });

    request.end();
});

const port = 8080;
app.listen(port, () => console.log('App is listening on http://localhost:' + port));