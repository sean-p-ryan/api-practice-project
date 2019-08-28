const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');

 const app = express();
 app.listen(3000, () => console.log('listening at 3000'))
 app.use(express.static('public'));
 app.use(express.json({ limit: '1mb' }));

 const database = new Datastore('database.db');
 database.loadDatabase();

 app.post('/api', (request, response) => {
     response.json({
         status: "success",
         latitude: 'lat',
         longitude: 'lon'
     });
 });

app.get('/weather/:latlon', async (request, response) => {
 console.log(request.params)
 const latlon = request.params.latlon.split(',');
 console.log(latlon);
 const lat = latlon[0];
 const lon = latlon[1];
 console.log(lat, lon);
 const api_url = `https://api.darksky.net/forecast/b93ee3c59f5bdc3b2897e35e2901ad65/${lat},${lon}` 
 const fetch_response = await fetch(api_url);
 const json = await fetch_response.json();
 response.json(json)
});