const mongoose = require("mongoose");

// import user model
const User = mongoose.model("users");

//get all users
const getUsers=(req,res)=>{
    User.find()
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json('Error: ' + err));
};

// function for user to log in
const logIn = (req, res, next) => {
    const {username,password}=req.body;
    console.log("server: "+req.body)

    // find the user in the database with the log in username
    User.findOne({username:username},function (err,user){
        if (err) {
            res.error("An error occured.");
        }
        //validate whether the password and username matches each other
        else if (!user || password!=user.password) {
            console.log("Wrong username or password! Please go back and try again!");
            // res.render('loginError');
            return res.json({ success: false, error: err });
            // return res.status(500).send({message:'invalid'})
            
        }
        //when both username and password is correct, user is logged in
        else {
            console.log("User "+username+" is logged in!")
            // return res.status(500).send({user})
            // res.render('welcomeUser',{ first_name:user.first_name, username:username });
            return res.json({ success: true, user: user });
            // res.send(true)
           
        }
    });
};

// function to add user account when a new user signs up
const addUser = async (req, res,next) => {
    const new_user ={
        username,
        email,
        password,
        first_name,
        last_name,
    } = req.body;

    // check if the username/email has been registered
    User.exists({username:req.body.username} || {email:req.body.email},function (err,userExists) {
        if(err){
            res.send('An error occured');
        } else if (userExists) {
            // res.render("signUpError");
            return res.json({ success: false, error: err });

        } else {
            //check whether all required information to sign up is present
            if (new_user.username && new_user.email && new_user.password && new_user.first_name && new_user.last_name){
                    var data = new User(new_user);
                    data.save();
                    console.log("User "+new_user.username+" is added!")
                    // res.render('welcomeUser', {first_name: req.body.first_name});
                    return res.json({ success: true, user: new_user });
                    
            }
            else{
                // res.render('userError');
                return res.json({ success: false, error: err });
                
            }
        }
    });
};

// get the details of the user when user wants to update their account information
const getDetails = (req,res,next) => {
    var requested=  req.params.username;

    User.findOne({username:requested},function (err,user){
        if (err) {
            console.error("An error occured.");
        } else if (!user) {
            return res.json({ success: true, error: err });
            // res.send("No user with that username.")
        } else {
            // res.render('userDetails',{first_name:user.first_name, last_name:user.last_name,username:user.username});
            return res.json({ success: true, user: user });
             
            
        }
    });
};

// function to update an information about a user
const updateUser =  async (req, res) => {
    var condition = {username: req.params.username};
    const update= {username,email,first_name,last_name,password}=req.body;
  
   

    //only take the filled information
    for( field in update ){
        if(update[field] ==''){
            delete update[field]
        }
    }
     console.log(update)

    //find the user's details and update it
    User.findOneAndUpdate(condition, update, function(err,user){
        if (err){
            return res.json({success:false})
    
        } else if (!user) {
            
        } else {
            
            if(update.first_name){
                var first_name = update.first_name;
            } else {
                first_name=user.first_name;
            }
            console.log("User is updated!");
            
            // res.render('welcomeUser',{first_name:first_name}); 
            return res.json({success:true})
    
        }
    });
};

// function to delete a user when the user wants to delete their account
const deleteUser = (req,res) => {
    var requested = req.params.username;

    User.deleteOne( {username:requested} ,function (err) {
        if (err) {
            return res.json({success:false})
        } else {
            return res.json({success:true})
        }
    });
};


// export the functions
module.exports = {
    getUsers,
    logIn,
    addUser,
    getDetails,
    updateUser,
    deleteUser
};
