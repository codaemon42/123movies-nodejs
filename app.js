const express = require('express');

const middleware = require('./middlewares');

const { logger } = require('./configuration');

const createError = require('http-errors');

const router = require('./routes');

const app = express();



// handle rejection
process.on('unhandledRejection', (reason) => {
    logger.error(reason);
    process.exit(1);
})

// middleware
middleware(app);


// routes
router(app);

// handle errors
app.use((req, res, next) => {
    const error = createError(404);
    next(error);
})

app.use((error, req, res, next) => {
    logger.error(error.message);

    res.statusCode = error.statusCode;

    res.json({
        message: error.message
    })
})

module.exports = app;