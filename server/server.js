const app = require('./app');
const mongoose = require('mongoose');
const { PORT, MongoConnect } = require('./general/config');

const mongoDB = MongoConnect;
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
