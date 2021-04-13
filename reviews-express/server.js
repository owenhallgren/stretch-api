const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile.js')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3001);
app.locals.title = 'Reviews';

app.get('/api/v1/reviews', async (request, response) => {
  try {
    const reviews = await database('reviews').select();
    response.status(200).json(reviews)
  } catch(error) {
    response.status(500).json({ error });
  }
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});