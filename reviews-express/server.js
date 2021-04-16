const express = require('express');
const app = express();
const { default: knex } = require('knex');
// const knex = require('./db/knex.js');
const cors = require('cors');
const { response } = require('express');
app.use(express.json());

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile.js')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3003);
app.locals.title = 'Reviews';

app.use(cors());

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
 
// })npm

app.put('/api/v1/reviews/cancel/:id', (req, res) => {
    const { id } = req.params
    
        database('reviews')
        .where('id', '=', id)
        .update({reviewer: '', status: ''})
        .then(() => database('reviews').select())
        .then(data => res.status(200).json(data))
        .catch(err => console.log('Error', err));
})

app.put('/api/v1/reviews/undo/:id', (req, res) => {
    const { id } = req.params
    
        database('reviews')
        .where('id', '=', id)
        .update({status: 'active'})
        .then(() => database('reviews').select())
        .then(data => res.status(200).json(data))
        .catch(err => console.log('Error', err));
})

app.put('/api/v1/reviews/complete/:id', (req, res) => {
    const { id } = req.params
    
        database('reviews')
        .where('id', '=', id)
        .update({status: 'complete'})
        .then(() => database('reviews').select())
        .then(data => res.status(200).json(data))
        .catch(err => console.log('Error', err));
})

app.put('/api/v1/reviews/accept/:id/:user', (req, res) => {
    const { id } = req.params
    const { user } = req.params    
        database('reviews')
        .where('id', '=', id)
        .update({reviewer: user, status: 'active'})
        .then(() => database('reviews').select())
        .then(data => res.status(200).json(data))
        .catch(err => console.log('Error', err));
})

app.post('/api/v1/reviews', async (req, res) => {
  const review = req.body;
  try {
    const responseArr = await database('reviews').insert(review, ['id']);
    const newReview = await database('reviews').where('id', responseArr[0].id)
    return res.status(200).json(newReview) 
  } catch (err) {
  res.status(500).json( {err} )
  }

})

// app.post('/messages', async (req, res) => {
//   try {
//     const message = await knex('messages').insert({
//       message: req.body.message,
//       user_name: req.body.user_name
//     }, 'message')
//     res.status(201).json( { message } )
//   } catch (error) {
//     res.status(500).json( { error } )
//   }
// })



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