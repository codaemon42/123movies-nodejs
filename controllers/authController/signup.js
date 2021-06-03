const { User } = require('../../models');
const createError = require('http-errors');
const createHttpError = require('http-errors');


module.exports.getSignUp = (req, res, next)=>{

    const validation = User.validate(req.body);
    if(validation.error) {
        const error = new Error(validation.error.message);
        error.statusCode = 400;
        console.log(error);
        return next(error);
    }
    else{
        const user = new User(req.body);
        user.checkExistance()
        .then( exist => {
            if(exist.check) {
                const error = new Error(exist.message);
                error.statusCode = 409;
                console.log(error);
                return next(error);
            }
    //present
            user.save((user, error) => {
                //console.log(err);
                if(error){
                    res.status(500).json({
                        message: 'Internal Server Error',
                        user: user,
                        error: error
                    });
                }
                else{
                    res.status(201).json({
                        message: 'User inserted',
                        user: user,
                        error: error
                    });
                }
            })

        })
        .catch( err => {
            next(createError(500));
        });

    }

}