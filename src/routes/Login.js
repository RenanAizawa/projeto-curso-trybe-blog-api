const express = require('express');
const loginController = require('../controllers/Login');
const loginValidate = require('../middlewares/Login');

const loginRoute = express.Router();

loginRoute.post('/', loginValidate, loginController.userByEmail);

module.exports = loginRoute;
