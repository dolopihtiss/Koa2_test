const mongoose = require('mongoose'),
   bluebird = require('bluebird'),
    users = require('./users.json');

mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost:27017/koa2_test'
    , {useMongoClient: true}
    );
const db = mongoose.connection;
//await db.dropDatabase();
const userSchema = { name: String, family: String };
const UserModel = mongoose.model('User', new mongoose.Schema(userSchema));

module.exports.UserModel = UserModel;




