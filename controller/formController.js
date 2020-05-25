const mongoose = require("mongoose");

// import form model
const Form = mongoose.model("forms");

// function to create a new form
const createForm = async (req, res,next) => {
    const new_form = {
        name:req.body.name,
        description:req.body.description,
        address:req.body.address,
        time:req.body.time,
        quantity:req.body.quantity,
        photo:req.body.photo,
        latitude:req.body.latitude,
        longitude: req.body.longitude
    };
    var data = new Form(new_form);
    data.save();
    // res.render('formManagement',{name:req.body.name, formID:Form.id});
    res.send("New form added");
}

//update form
const updateForm = async (req, res, next) => {
    var id = req.body.id;

    Form.findById(id, function(err, doc) {
        if (err) {
            res.send("An error has occurred!");
        } else if (!Form) {
            return res.send('Form is not found!');
        }
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
    Form.findByIdAndRemove(id).exec();
    res.redirect('/forms');
};



// // function to get all forms
// const getAllForms = async (req, res) => {
//     try {
//         const all_form = await Form.find();
//         return res.send(all_form);
//     } catch (err) {
//         res.status(400);
//         return res.send("Database query failed!");
//     }
// };
// function to get all forms
const getAllForms = async (io) => {
    try {
        const all_form = await Form.find();
        // io.emit('Forms',all_form)
        // return res.send(all_form);
        io.emit("Forms",all_form)
    } catch (err) {
        console.log("fail to retrieve")
        // res.status(400);
        // return res.send("Database query failed!");
    
    }
};


// Remember to export the callbacks
module.exports = {
    createForm,
    getAllForms,
    updateForm,
    deleteForm,
};
