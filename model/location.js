const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    email: {type: String, unique:true},
    allowLocationAccess: Boolean,
    coordinates: [{
        latitude: Number,
        longitude: Number
    }]
});

const Location = mongoose.model("locations", locationSchema, "locations");

module.exports = Location;
