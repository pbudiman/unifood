const mongoose = require("mongoose");

// import user model
const Location = mongoose.model("locations");

const addLocation = (req, res)=>{

    try {
        // req.body
        res.render(req.body)
        console.log(req.body.latitude);
        console.log(req.body.longitude);
    } catch (err) {
        return res.send("error");
    }
}

const getLocations = async (req, res) => {

    try {
        const locations = await Location.find();
        return res.send(locations);
    } catch (err) {
        res.status(400);
        return res.send("Database query failed!");
    }
};
module.exports = {
    addLocation
}
