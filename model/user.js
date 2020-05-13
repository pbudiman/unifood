const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username:{ type: String,required:true},
    email:{ type: String,required:true},
    password:{type:String ,required:true} ,
    first_name: { type: String,required:true},
    last_name:{ type: String,required:true}
    },{collection: 'users'});

const User = mongoose.model("users", userSchema, "users");

module.exports = User;
