var mongoose = require ('mongoose');

const Schema = mongoose.Schema;

let schema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String 
    },
    email: {
        type: String
    },
    ssoId: {
        type: String
    }
});

var users = mongoose.model('users', schema);
module.exports = users;