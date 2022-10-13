const express = require('express');
const userControler = require('../controllers/User');
const userValidate = require('../middlewares/User');
const authValidate = require('../middlewares/Auth');

const userRoute = express.Router();

userRoute.post('/', userValidate, userControler.newUserControler);
userRoute.get('/', authValidate, userControler.allUsers);

module.exports = userRoute;