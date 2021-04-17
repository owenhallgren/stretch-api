exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(table) {
      table.increments('id').primary();
      table.string('user');
      table.string('username')
      table.string('email')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('users')
};