const authRouter = require('./auth');

const movieRouter = require('./movie');

module.exports = (app) => {

    app.use('/auth', authRouter);

    app.use('/movies', movieRouter);
    
    app.get('/', (req, res, next) => {
        res.send("<h1>welcome to the first route</h1>");
    });

    app.get('/:postId', (req, res, next) => {
        console.log(req.params);
        console.log(req.query);
        res.send(`<h1>welcome to the first route param ${req.params.postId}</h1>`);
    });

}