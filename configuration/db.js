const { MongoClient } = require('mongodb');

const _uri = 'mongodb+srv://naim42:b6sePJbfSGhm2r0z@starterproject.nbiom.mongodb.net/sample_mflix?retryWrites=true&w=majority';

const dbCon = (coll, cb) => {

    MongoClient.connect(_uri, {useUnifiedTopology: true})

    .then( async client => {

        const db = client.db('sample_mflix').collection(coll);

        await cb(db);

        client.close();

    })

};

// dbCon('movies', async db => {
//     const movie = await db.findOne();
//     console.log(movie);
// })

module.exports = dbCon;