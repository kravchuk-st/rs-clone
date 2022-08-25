const vars = require('dotenv');
const path = require('path');

vars.config({
  path: path.join(__dirname, '../vars.env'),
});

const PORT = process.env.PORT;
const MONGO_CONNECT_QUERY = process.env.CONNECTION_QUERY;

const PAGE_NUMBER = 0;
const ITEMS_PER_PAGE = 10;

module.exports = {
  PORT,
  MONGO_CONNECT_QUERY,
  PAGE_NUMBER,
  ITEMS_PER_PAGE,
};
