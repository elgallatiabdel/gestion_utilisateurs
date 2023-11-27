const express = require('express');
const RegisterRoute = express.Router();
const RegisterController = require('../controllers/RegisterController');
const Auth = require('../midellware/auth')

// les routes get
RegisterRoute.get('/', RegisterController.get_register);
RegisterRoute.get('/login', RegisterController.get_login);
RegisterRoute.get('/logout', RegisterController.get_logout);

// les routes post
RegisterRoute.post('/', RegisterController.post_register);
RegisterRoute.post('/login',Auth, RegisterController.post_login);


module.exports = RegisterRoute;