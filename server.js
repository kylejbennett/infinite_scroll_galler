global.fetch = require('node-fetch');
const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;
const express = require('express');
require('dotenv/config');

const unsplash = new Unsplash({
    accessKey: process.env.APP_ACCESS_KEY,
    callbackUrl: process.env.CALLBACK_URL
});

const app = express();

app.get('/api/photos', (req, res) => {
    unsplash.photos
        .listPhotos(req.query.start, req.query.count)
        .then(toJson)
        .then(json => res.json(json));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
