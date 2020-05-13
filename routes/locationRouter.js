const express = require('express');

// add router
const locationRouter = express.Router();

// require the location controller
const locationController = require('../controller/locationController.js');


// handle the GET request on root of location-management path
locationRouter.get("/", (req,res,next)=> {
    res.render('location');
});

locationRouter.post('/', locationController.addLocation);
// handle the POST request on root of location-management path

// export the router
module.exports = locationRouter;
