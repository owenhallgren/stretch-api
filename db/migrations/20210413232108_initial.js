
exports.up = function(knex) {
  return knex.schema
    .createTable('reviews', function(table) {
      table.increments('id').primary();
      table.string('username');
      table.string('summary');
      table.string('email');
      table.string('language');
      table.string('date');
      table.string('repo');
      table.string('status');
      table.string('reviewer')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('reviews')
};
