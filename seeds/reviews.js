const reviewData = require ('../reviewdata')
const userData = require ('../userdata')
// exports.seed = function(knex) {
//   // Deletes ALL existing entries
//   return knex('table_name').del()
//     .then(function () {
//       // Inserts seed entries
//       return knex('table_name').insert([
//         {id: 1, colName: 'rowValue1'},
//         {id: 2, colName: 'rowValue2'},
//         {id: 3, colName: 'rowValue3'}
//       ]);
//     });
// };

// exports.seed = async function (knex) {
//   try {
//     await knex('reviews').del() // delete all footnotes first
  
//     // Now that we have a clean slate, we can re-insert our paper data
//     // Insert a single paper, return the paper ID, insert 2 footnotes
//     await knex('reviews').insert({
//       username: 'jacksonmcguire', summary: 'this is a summary', email: 'lumbersexual69@gmail.com', language: 'javascript', date: '03/11/21', repo:'https://github.com/josharagon/self-care-center', status:'complete', reviewer: 'Jackson'
//     }, 'id')
//   } catch (error) {
//     console.log(`Error seeding data: ${error}`);
//   }
// }


exports.seed = async function (knex) {
  try {
    await knex('users').del()
    await knex('reviews').del() // delete all footnotes first
    
    await knex('reviews').insert(reviewData)
    await knex('users').insert(userData)
    
  } catch (error) {
    console.log(`Error seeding data: ${error}`);
  }
}