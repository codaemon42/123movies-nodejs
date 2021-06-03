const { getLogin } = require('./authController/login');
const { getSignUp } = require('./authController/signup');
const { getMovies, getMoviesByPage, getOneMovie } = require('./movieController/movies');

module.exports = {
    getLogin,
    getSignUp,
    getMovies,
    getMoviesByPage,
    getOneMovie
}