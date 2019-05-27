const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const port = 9000;

const API_KEY = process.env.GOOGLE_API_KEY;
const MAP_KEY = process.env.MAPBOX_API_KEY;

app.use(cors());

// retrieve the restaurant list from google and return it
app.get('/', (req, res) => {
  let startUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=";
  let lat = req.query.lat;
  let lng = req.query.lng;
  let endUrl = "&radius=3000000&type=restaurant&keyword=cruise&key=";
  let url = startUrl + lng + "," + lat + endUrl + API_KEY;

  console.log(url);
  axios
    .get(url)
    .then(response => {
      let final = response.data;
      res.send(final);
    })
    .catch(err => {
      console.log(`Couldn't get data from Google: ${err}`);
    });
});

app.get('/geocode', (req, res) => {
  let baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
  let query = encodeURI(req.query.city);
  let endUrl = '.json?access_token='
  let finalUrl = baseUrl + query + endUrl + MAP_KEY;

  axios
    .get(finalUrl)
    .then(response => {
      let final = response.data;
      res.send(final);
    })
    .catch(err => {
      console.log(`Couldn't get data from MapBox: ${err}`);
    });
})

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
