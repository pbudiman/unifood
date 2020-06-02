const express = require('express');

const organiserRouter = express.Router();

const organiserController = require('../controller/organiserController.js');


organiserRouter.get("/", (req,res,next)=>{
    res.render('organiserLogin');
});

organiserRouter.post('/logon', organiserController.loginOrganiser);

organiserRouter.get('/update/:id', organiserController.organiserPreview);

organiserRouter.get('/signup', (req,res,next)=>{
    res.render("organiserSignup");
});

organiserRouter.get("/all", organiserController.getOrganisers);

organiserRouter.get("/:email", organiserController.getOrganiserById);

organiserRouter.post("/signup", organiserController.addOrganiser);

organiserRouter.post("/backend/update/:id", organiserController.updateOrganiser);

// organiserRouter.get('/delete/:email', (req,res, next)=>{
//     res.redirect();
// });

organiserRouter.get("/delete/:id", organiserController.deleteOrganiser);

// Export router
module.exports = organiserRouter;
