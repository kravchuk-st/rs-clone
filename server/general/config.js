const vars = require('dotenv');
const path = require('path');

vars.config({
  path: path.join(__dirname, '../vars.env'),
});

const PORT = 3000;
const MongoConnect = process.env.CONNECTION_QUERY;

module.exports = { PORT, MongoConnect };
