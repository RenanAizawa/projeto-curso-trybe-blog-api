const express = require('express');
const postControler = require('../controllers/BlogPost');
const authValidator = require('../middlewares/Auth');

const postRoute = express.Router();

postRoute.delete('/:id', authValidator, postControler.deleteById);
postRoute.post('/', authValidator, postControler.createPost);
postRoute.get('/:id', authValidator, postControler.postById);
postRoute.get('/', authValidator, postControler.getAllPosts);

module.exports = postRoute;