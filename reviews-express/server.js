const express = require('express');
const app = express();
const { default: knex } = require('knex');
const cors = require('cors');
const { response } = require('express');
app.use(express.json());
const { key } = require('../ApiKey/key')
const sgMail = require('@sendgrid/mail')
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

app.get('/api/v1/users', async (request, response) => {
  try {
    const users = await database('users').select();
    response.status(200).json(users)
  } catch(error) {
    response.status(500).json({ error });
  }
})

app.post('/api/v1/email', (req, res) => {
  sgMail.setApiKey(key)

  const review = req.body;

  let message = {
    to: review.email,
    from: 'PearPaired@gmail.com',
    subject: `Your review on Pear has been ${review.type}`,
    text:`Hi ${review.user}! ${review.username} has ${review.type} your review! If you wish to get in touch you can 
    contact them at ${review.reviewerEmail}. You will be notified when any update has been made to your review`
  }
   
    
  sgMail.send(message)
  .then(() => res.status(200).json({status: 'ok'}))
  .catch(err => console.log('Error', err))
})

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

app.delete('/api/v1/reviews/:id', (req, res) => {
  const { id } = req.params

  database('reviews')
  .where('id', '=', id)
  .del()
  .then(() => database('reviews').select())
  .then(data => res.status(200).json(data))
  .catch(err => console.log('Error', err));

})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});


