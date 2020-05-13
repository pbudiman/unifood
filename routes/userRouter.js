const express = require('express');

// add router
const userRouter = express.Router();

// require the user controller
const userController = require('../controller/userController.js');

userRouter.get("/",userController.getUsers);

//user logging in
userRouter.get('/login', function(req, res, next) {
    res.render('login');
});
userRouter.post("/login",userController.logIn);

//when username and/or password used is incorrect
userRouter.get("login/error",function(req, res, next) {
    res.render('loginError');
});

//user signing up
userRouter.get('/signUp', function(req, res, next) {
    res.render('signUp');
});
userRouter.post("/signUp", userController.addUser);

//user getting their details and updating
userRouter.get("/login/:username",userController.getDetails);

userRouter.post("/login/update/:username",userController.updateUser);

//user deleting account
userRouter.get("/delete/:username",userController.deleteUser);


// export the router
module.exports = userRouter;
