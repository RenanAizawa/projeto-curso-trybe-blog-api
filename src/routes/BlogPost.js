const express = require('express');
const postControler = require('../controllers/BlogPost');
const authValidator = require('../middlewares/Auth');

const postRoute = express.Router();

postRoute.delete('/:id', authValidator, postControler.deleteById);

module.exports = postRoute;