const reviewData = require ('../reviewdata')
const userData = require ('../userdata')


exports.seed = async function (knex) {
  try {
    await knex('users').del()
    await knex('reviews').del()
    
    await knex('reviews').insert(reviewData)
    await knex('users').insert(userData)
    
  } catch (error) {
    console.log(`Error seeding data: ${error}`);
  }
}