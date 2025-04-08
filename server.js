const express = require('express');
const cors = require('cors');
const axios = require("axios");
const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.sendFile("public/index.html", {root: __dirname});
});

app.get('/searchword', async (req, res) => {
    try {
        let options = {
            method: 'GET',
            url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/association/',
            params: { entry: req.query.entry },
            headers: {
                'x-rapidapi-key': '31e7f7bbfamsh0d7978de4503d48p18df95jsnbd61bf7ca8fa',
                'x-rapidapi-host': 'twinword-word-graph-dictionary.p.rapidapi.com'
            }
        };

        let response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port} - http://localhost:${port}`);
});
