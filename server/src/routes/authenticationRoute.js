const express = require('express');
const { login } = require('../controllers/authenticationController/login');
const {
  register,
} = require('../controllers/authenticationController/register');

const { bodyValidation } = require('../middlewares/bodyValidation');
const authenticationRoute = express.Router();

authenticationRoute.post('/login', bodyValidation.authentication, login);

authenticationRoute.post('/register', bodyValidation.authentication, register);

exports.authenticationRoute = authenticationRoute;