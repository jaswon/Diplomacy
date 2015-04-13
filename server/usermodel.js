var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    faction: {
        type: String,
        unique: true,
        required: true
    },
    token: String
});

module.exports = mongoose.model('User', userSchema);;

//mongoose.connect("mongodb://admin:passwor@ds061651.mongolab.com:61651/users");
