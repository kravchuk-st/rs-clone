const app = require('./app');
const mongoose = require('mongoose');
const { PORT, MONGO_CONNECT_QUERY } = require('./general/config');

const errorMessages = require('./errors/errorMessages.config');

const mongoDB = MONGO_CONNECT_QUERY;
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to DB'))
  .catch((error) => console.error(error));

const { connection } = mongoose;

connection.on('error', console.error.bind(console, errorMessages.general.mongoConnection));

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Server is listening on ${PORT}`);
  }
});
