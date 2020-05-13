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

// function for login
const loginOrganiser = (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

    Organiser.findOne({email:email}, (err, organiser)=>{
       if (err){
           console.error("An error occured.");
       }
       else if(!email || password!=organiser.password){
           res.send("The email or password you entered incorrect");
       } else {
           res.render('organiserLogon',
               {organisation_name:organiser.organisation_name, id:organiser._id});
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
        if(err){
            res.send('An error occured.');
        }
        else if(organiserExists){
            res.send("The email has been used.\nPlease enter other email.");
        }
        else if (req.body.organisation_name && req.body.officer_name && req.body.contact_number
            && req.body.email && req.body.password){

            var data =  new Organiser(new_organiser);
            data.save();
            res.send('Organisation account created.');
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
            console.error('An error occured!');
        }
        else if(!organiser_id){
            return res.send('Organiser is not found.');
        }
        else {
            return res.send("Organiser is updated.");
        }
    });
};

// function to delete an organiser
const deleteOrganiser = (req,res) => {
    var id = req.params.id;

    Organiser.findByIdAndRemove( id , (err, organiser) =>{
        if(err) {
            console.error("Deletion Error");
        }
        else {
            res.send("Organiser '" + organiser.organisation_name + "' is successfully deleted!");
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
