const express = require('express');
const loginController = require('../controllers/Login');

const loginRoute = express.Router();

loginRoute.post('/', loginController.userByEmail);

module.exports = loginRoute;
