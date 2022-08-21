const app = require('./app');
const mongoose = require('mongoose');
const { PORT, MONGO_CONNECT_QUERY } = require('./general/config');

const mongoDB = MONGO_CONNECT_QUERY;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const { connection } = mongoose;

connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Server is listening on ${PORT}`);
  }
});
