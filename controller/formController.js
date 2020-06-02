const mongoose = require("mongoose");

// import form model
const Form = mongoose.model("forms");
const Organiser = mongoose.model("organisers");


// function to create a new form
const createForm = async (req, res,next) => {
    const new_form = {
        email:req.body.email,
        name:req.body.name,
        description:req.body.description,
        address:req.body.address,
        time:req.body.time,
        quantity:req.body.quantity,
        photo:req.body.photo,
        latitude:req.body.latitude,
        longitude: req.body.longitude
    };
    console.log(new_form)
    if (new_form.email&&new_form.name&&new_form.description&&new_form.address&&new_form.time){
        try {
            var data = new Form(new_form);
            data.save();
            console.log("New Form Posted")
            // console.log(new_form)
            return res.json({ success: true });
        } catch (err) {
            // res.status(400);
            console.log("fails to post form")
            // return res.send("Error making post!");
            return res.json({ success: false });
        }
    }else{
        return res.json({ success: false });
    }
   
};






//update form
const updateForm = async (req, res, next) => {
    var id = req.body.id;

    Form.findById(id, function(err, doc) {
        if (err) {
            res.send("An error has occurred!");
            return res.json({success:false})
        } else if (!Form) {
            return res.send('Form is not found!');
            return res.json({success:false})
        }
        doc.email = req.body.email;
        doc.name = req.body.name;
        doc.description = req.body.description;
        doc.address = req.body.address;
        doc.time = req.body.time;
        doc.quantity = req.body.quantity;
        doc.photo = req.body.photo;
        doc.latitude = req.body.latitude;
        doc.longitude = req.body.longitude;
        doc.save();
    });
    console.log("Form is updated!");
    res.json({success:true});
};





//update form by email
const updateFormbyEmail = async (req, res, next) => {
    var email = req.body.email;

    Form.findById(email, function(err, doc) {
        if (err) {
            res.send("An error has occurred!");
        } else if (!Form) {
            return res.send('Form is not found!');
        }
        doc.email = req.body.email;
        doc.name = req.body.name;
        doc.description = req.body.description;
        doc.address = req.body.address;
        doc.time = req.body.time;
        doc.quantity = req.body.quantity;
        doc.photo = req.body.photo;
        doc.latitude = req.body.latitude;
        doc.longitude = req.body.longitude;
        doc.save();
    });
    console.log("Form is updated!");
    res.redirect('/forms');
};



// delete a form by form ID
var deleteForm = function(req, res, next) {
    var id = req.body.id;
    Form.findByIdAndRemove( id , (err, organiser) =>{
        if(err) {
            console.error("Deletion Error");
            res.json({success:false})
        }
        else {
            console.log("Form ID #"+id+" is deleted!");
            res.json({success:true});
        }2
    });

};






// function to get all forms
const getAllForms = async (req, res) => {
    try {
        const all_form = await Form.find();
        return res.send(all_form);
    } catch (err) {
        res.status(400);
        return res.send("Database query failed!");
    }
};

// function to get all forms by email
const getAllFormsByEmail = async (req, res) => {
    //var email = req.params.email;
    var email=  req.params.email;

    try {
        const all_form = await Form.find().where("email").in(email).exec();
        return res.send(all_form);
    } catch (err) {
        res.status(400);
        return res.send("Database query failed!");
    }
};

// Remember to export the callbacks
module.exports = {
    createForm,
    getAllForms,
    updateForm,
    deleteForm,
    updateFormbyEmail,
    getAllFormsByEmail,
};
