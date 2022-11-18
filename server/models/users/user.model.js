const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'User name is required'],
  },
  email: {
    type: String,
    unique: [true, 'User with such email already exists'],
    lowercase: true,
    trim: true,
    required: [true, 'Email is required'],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: '{VALUE} is not a valid email',
    },
  },
  password: {
    type: String,
    required: true,
  },
  articles: {
    saved: [String],
    favorite: [String],
  },
  recipes: {
    saved: [String],
    favorite: [String],
  },
  products: {
    shopping: [String],
    own: [String],
  },
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
