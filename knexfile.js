// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/reviews',
    migrations: {
      directory: './db/migrations'
    }, seeds: {
      directory: './seeds'
    }, useNullAsDefault: true
  },

};
