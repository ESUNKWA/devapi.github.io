const { Client } = require('pg')
const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'dev_db',
    user: 'postgres',
    password: 'postgres',
  });
client
  .connect()
  .then(() => console.log('connecté'))
  .catch(err => console.error('Erreur de connection: ', err.message));

  module.exports = client