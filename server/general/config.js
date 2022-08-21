const vars = require('dotenv');
const path = require('path');

vars.config({
  path: path.join(__dirname, '../vars.env'),
});

const PORT = process.env.PORT;
const MONGO_CONNECT_QUERY = process.env.CONNECTION_QUERY;

module.exports = { PORT, MONGO_CONNECT_QUERY };
