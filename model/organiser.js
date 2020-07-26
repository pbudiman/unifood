const mongoose = require("mongoose");

// Organiser schema in mongodb
const organiserSchema = new mongoose.Schema({
    organisation_name:{type: String, unique: true, require:true},
    officer_name: {type: String, require:true},
    contact_number: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true}
});

const Organiser = mongoose.model("organisers", organiserSchema, "organisers");

module.exports = Organiser;
