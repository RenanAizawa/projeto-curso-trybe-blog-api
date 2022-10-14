const express = require('express');
const catController = require('../controllers/Category');
const jwtValidate = require('../middlewares/Auth');

const catRoute = express.Router();

catRoute.post('/', jwtValidate, catController.createCat);
catRoute.get('/', jwtValidate, catController.allCat);

module.exports = catRoute;