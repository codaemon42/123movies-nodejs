const { dbCon } = require('../configuration');
const { userValidator } = require('../validator');

class User {
    constructor(userData) {
        this.userData = {...userData};
    }

    //present
    save(cb) {
        try{
            dbCon('users', async (db) => {
                const insertUser = await db.insertOne(this.userData);
                // console.log(insertUser);          
                // console.log('users_id retrived: ',insertUser.insertedId);
                const error = false;
                cb(insertUser, error);
            });
        }
        catch(err){
            const error = true;
            cb(err, error)
        }
    }


    static validate(userData) {
        return userValidator.validate(userData);
    }


    checkExistance() {
        return new Promise( (resolve, reject) => {
            dbCon('users', async (db) => {
                try{
                    const user = await db.findOne({'$or':  [ {email: this.userData['email']}, {name: this.userData['name']} ] });
                    console.log(user);
                    if(!user) {
                        resolve({
                            check: false
                        });
                    }
                    else if(this.userData['name'] === user.name) {
                        resolve({
                            check: true,
                            message: 'This name is already in use'
                        });
                    }
                    else if(this.userData['email'] === user.email) {
                        resolve({
                            check: true,
                            message: 'This email is already in use'
                        });
                    }
                }
                catch(err) {
                    reject(err);
                }
            });
        });
    }


}


module.exports = User;