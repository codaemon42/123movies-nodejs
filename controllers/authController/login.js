const logger = require('../../configuration/logger');

module.exports.getLogin = (req, res, next)=>{

    logger.stream;
    res.send(`<h1>welcome to the login route</h1>`);
}