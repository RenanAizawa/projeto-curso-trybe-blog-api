const express = require('express');
const userControler = require('../controllers/User');
const userValidate = require('../middlewares/User');

const userRoute = express.Router();

userRoute.post('/', userValidate, userControler.newUserControler);

module.exports = userRoute;