const express = require('express');
const { default: knex } = require('knex');
const app = express();
// const cors = require('cors');
// app.use(cors());
app.use(express.json());

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

// app.put('/api/v1/reviews/:id', async (request, response) => {
//   try {
//      const { id } = request.params
//      await database('reviews').where({ id: id }).update({ name: 'Ceral'})
//       // knex('reviews')
//       //   .where({ id: id })
//       //   .update({ name: 'Ceral'})

//       response.status(200).json({id: 'ceral'})
//   } catch (error) {
//     response.status(500).json({ error: 'ceral' })
//   }
 
// })

app.put('/api/v1/reviews/update/:id', (req, res) => {
    // console.log(req.body)
    // const { id, name, year, house, mobile, email, occupation, gender} = req.body
    const { id } = req.params
    
        database('reviews')
        .where('id', '=', id)
        .update({email: 'Ceral'})
        .then(data => res.status(200).json('Success'))
        .catch(err => console.log('Error', err));
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});



// //PUT request:  CANCEL button
// app.put('/reviews/cancel/:id', (request, response) => {
//   const { id } = request.params;

//   app.locals.reviews.forEach((review) => {
//     if(parseInt(id) === review.id) {
//       review.status = '';
//       review.reviewer = '';
//     }
//   })

//   response.status(200).json(app.locals.reviews)
// })

// //PUT request:  UNDO button
// app.put('/reviews/undo/:id', (request, response) => {

//   const { id } = request.params;

//   app.locals.reviews.forEach((review) => {
//     if(parseInt(id) === review.id) {
//       review.status = 'active';
//     }
//   })

//   response.status(200).json(app.locals.reviews)
// })

// //PUT request:  Complete button
// app.put('/reviews/complete/:id', (request, response) => {

//   const { id } = request.params;

//   app.locals.reviews.forEach((review) => {
//     if(parseInt(id) === review.id) {
//       review.status = 'complete';
//     }
//   })

//   response.status(200).json(app.locals.reviews)
// })


// //PUT request:  ACCEPT button
// app.put('/reviews/accept/:id/:user', (request, response) => {

//   const { id, user } = request.params;

//   app.locals.reviews.forEach((review) => {
//     if(parseInt(id) === review.id) {
//       review.status = 'active';
//       review.reviewer = `${user}`;
//     }
//   })

//   response.status(200).json(app.locals.reviews)
// })


// app.listen(app.get('port'), () => {
//   console.log(`Running on port ${app.get('port')}`)
// })