const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;
const path = require('path');
app.use(express.json());

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('public')); // Serve static files from 'public' folder

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'web.html'));
});
app.post('/', (req, res) => {
    exec(req.body.command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send(error);
        }
        res.send(stdout);
    });
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

