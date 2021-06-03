const { dbCon } = require('../../configuration');
const { ObjectId } = require('bson');
const createError = require('http-errors');



const getMovies = (req, res, next) => {

    dbCon('movies', async db => {

        try {

            const movie = await db.findOne();
        
            res.json(movie);
    
        }
        catch (err) {

            next(createError(500));
            
        }

    })

}



const getMoviesByPage = (req, res, next) => {

    const pageNum = parseInt(req.params.page);

    if( isNaN(pageNum) ){

        next(createError(400));

    }

    const moviesToSkip = (pageNum - 1) * 10;

    dbCon('movies', async db => {

        try {

            const movies = await db.find({}).skip(moviesToSkip).limit(10).toArray();

            res.json(movies);

        }
        catch (err) {

            next(createError(500));

        }

    })

}



const getOneMovie = (req, res, next) => {

    if(!ObjectId.isValid(req.params.id)){

        next(createError(400));

    }

    const _id = new ObjectId(req.params.id);

    dbCon('movies', async db => {

        try {

            const oneMovie = await db.findOne({_id});

            if(!oneMovie){
    
                next(createError(404));
    
            }
    
            res.json(oneMovie);

        }
        catch (err) {
            next(createError(500));
        }

    })

}



module.exports = {
    getMovies,
    getMoviesByPage,
    getOneMovie
}