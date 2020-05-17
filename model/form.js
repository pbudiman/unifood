const mongoose = require("mongoose");
const formSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    address:{type:String, required:true},
    time:{type:String, required:true},
    quantity: String,
    photo: String,
    latitude: Number,
    longitude: Number
});

const Form = mongoose.model("forms", formSchema, "forms");

module.exports = Form;
