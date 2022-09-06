const app = require('./app');
const mongoose = require('mongoose');
const { PORT, MONGO_CONNECT_QUERY } = require('./general/constants');

const errorMessages = require('./errors/errorMessages.config');
const successMessages = require('./general/successMessages');

const mongoDB = MONGO_CONNECT_QUERY;
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(successMessages.server.dbConnected))
  .catch((error) => console.error(error));

const { connection } = mongoose;

connection.on('error', console.error.bind(console, errorMessages.general.mongoConnection));

// const Recipe = require('./models/recipes/recipe.model');
//
// const document = JSON.parse(`
// {
//
// }
// `);
//
// const recipe = new Recipe(document);
//
// recipe
//   .save()
//   .then(() => Recipe.estimatedDocumentCount())
//   .then((result) => console.log(result))
//   .catch((err) => console.error(err));

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(successMessages.server.listen(PORT));
  }
});
