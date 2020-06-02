const mongoose = require("mongoose");

// import user model
const Organiser = mongoose.model("organisers");


// function to get all organisers
const getOrganisers = async (req, res) => {

    try {
        const organisers = await Organiser.find();
        return res.send(organisers);
    } catch (err) {
        res.status(400);
        return res.send("Database query failed!");
    }
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

// function for login
const loginOrganiser = (req, res)=>{
    const {email,password} = req.body;
    Organiser.findOne({email:email}, function(err, organiser){
       if (err){
           return res.json({success:false, error:err})
           res.error("An error occured.");
       }
       else if(!organiser || password!=organiser.password){
        //    res.send("The email or password you entered incorrect");
            return res.json({success:false, error:err})
       } else {
           console.log(organiser)
        //    res.render('organiserLogon',
        //        {organisation_name:organiser.organisation_name, id:organiser._id});
            return (res.json({ success: true, organiser:organiser }));

       }
    });
};

// The display for updating organiser's profile
const organiserPreview = (req, res, next)=>{
    var id =  req.params.id;

    Organiser.findById(id,(err,organiser)=>{
        if (err) {
            console.error("An error occured.");
        }
        else if(!organiser){
            res.send("Internal Error.")
        }
        else {
            res.render("organiserUpdate",
                {
                    id:organiser._id,
                    organisation_name:organiser.organisation_name,
                    email:organiser.email,
                    officer_name: organiser.officer_name,
                    contact_number: organiser.contact_number,
                    email: organiser.email,
                    password: organiser.password
                });
        }
    });
};

// function to get organiser by email
const getOrganiserById = (req, res) => {
    var requested =  req.params.email;

    Organiser.findOne({email:requested},(err,organiser)=>{
        if (err) {
            console.error("An error occured.");
        }
        else if(!organiser){
            res.send("Sorry, the email is not registered.\nPlease check again your input.")
        }
        else {
            res.send(organiser);
        }
    });
};

// function to create organiser
const addOrganiser = async (req, res) => {
    var new_organiser = {
        organisation_name: req.body.organisation_name,
        officer_name: req.body.officer_name,
        contact_number: req.body.contact_number,
        email: req.body.email,
        password: req.body.password
    };
    Organiser.exists( {email:req.body.email},(err,organiserExists) => {
        console.log("Organiser doesnt exist");
        if(err){
            res.send('An error occured.');
        }
        else if(organiserExists){
            res.send("The email has been used.\nPlease enter other email.");
            // res.status(409);
        }
        else if (req.body.organisation_name && req.body.officer_name && req.body.contact_number
            && req.body.email && req.body.password){
            var data =  new Organiser(new_organiser);
            data.save();
            // res.send('Organisation account created.');
            // return res.json({ success: true });
            // res.send({ message: 'Organisation created' });
            res.json({success:true});
            // res.status(201);
        }
        else {
            res.send("You haven't filled all the required fields.");
        }
    });
};

//function to update an organiser
const updateOrganiser =  async (req, res) =>{
    var id = req.params.id;

    Organiser.findByIdAndUpdate(id, { $set: req.body }, (err,organiser_id)=>{
        if (err){
            console.error('An error occured! '+ err);
            return res.send({success:false})
        }
        else if(!organiser_id){
            return res.send({success:false, message:"Organiser is not found"});
            res.send('Organiser is not found.');
        }
        else {
            return (res.json({ success: true, organiser:organiser }));
        }
    });
};

// function to delete an organiser
const deleteOrganiser = (req,res) => {
    var id = req.params.id;

    Organiser.findByIdAndRemove( id , (err, organiser) =>{
        if(err) {
            console.error("Deletion Error");
            res.json({success:false})
        }
        else {
            // res.send("Organiser '" + organiser.organisation_name + "' is successfully deleted!");
            res.json({success:true});
        }
    });

};

// export the functions

module.exports = {
    getOrganisers,
    getOrganiserById,
    addOrganiser,
    updateOrganiser,
    deleteOrganiser,
    organiserPreview,
    loginOrganiser
};
