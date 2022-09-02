const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');

const User = require('../models/users/user.model');
const QueryError = require('../errors/errorEmitter');
const errorMessages = require('../errors/errorMessages.config');

const { SALT_ROUNDS } = require('../general/constants');

function signup(req, res) {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, SALT_ROUNDS),
  });

  user
    .save()
    .then(() => res.status(StatusCodes.CREATED).send('Registered successfully'))
    .catch((error) => res.status(StatusCodes.UNAUTHORIZED).send(error.message));
}

module.exports = { signup };
