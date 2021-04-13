
exports.up = function(knex) {
  return knex.schema
    .createTable('reviews', function(table) {
      table.string('username');
      table.string('summary');
      table.string('email');
      table.string('language');
      table.string('date');
      table.string('repo');
      table.string('status');
      table.string('reviewer')
      table.integer('id')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('reviews')
};
