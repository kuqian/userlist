const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName:String,
    lastName:String,
    sex:String,
    age:Number,
    password:String
});
module.exports = mongoose.model("User", UserSchema);