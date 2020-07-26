const express = require('express');
const organiserRouter = express.Router();
const organiserController = require('../controller/organiserController.js');

// For front end
organiserRouter.post("/signup", organiserController.addOrganiser);
organiserRouter.post("/update/:id", organiserController.updateOrganiser);
organiserRouter.get("/delete/:id", organiserController.deleteOrganiser);

// Appears in backend (localhost:5000)
organiserRouter.get("/", (req,res,next)=>{
    res.render('organiserLogin');
});
organiserRouter.get('/signup', (req,res,next)=>{
    res.render("organiserSignup");
});

organiserRouter.post('/logon', organiserController.loginOrganiser);
organiserRouter.get('/update/:id', organiserController.organiserPreview);
organiserRouter.get("/all", organiserController.getOrganisers);

// Export router
module.exports = organiserRouter;