const { Router } = require('express');
const { getMovies, getMoviesByPage, getOneMovie } = require('../controllers');

const router = Router();

router
.get('/', getMovies)
.get('/page/:page', getMoviesByPage)
.get('/id/:id', getOneMovie);

module.exports = router;