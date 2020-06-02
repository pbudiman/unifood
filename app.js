const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


const axios = require("axios");
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io= socketIo(server);

var connection_string = "mongodb+srv"mongodb+srv://pbudiman:<password>@cluster0-hdaoj.mongodb.net/unifood?retryWrites=true&w=majority";://pbudiman:budiman01@cluster0-hdaoj.mongodb.net/unifood?retryWrites=true&w=majority";
var mongo_url=connection_string.replace("<password>",process.env.MONGO_PASSWORD);


const db = require("monk")(mongo_url);
const form_collection = db.get("forms");
const getAllForms= async socket =>{
    try{
        form_collection.find({}).then( res => {
            forms=res;
        });
        socket.emit("Forms",forms)
    }catch(error){
        console.log("fail to retrieve forms")
    }
}
let interval;

io.on("connection", (socket)=> {
    console.log("New client Time connected");
    // if (interval) {
    //     clearInterval(interval);
    // }
    interval = setInterval(()=> getAllForms(socket),1000);

    // Returning the initial data of food menu from FoodItems collection
    // socket.on("initial_data", () => {
    //     form_collection.find({}).then(docs => {
    //         io.sockets.emit("get_data", docs);
    //         console.log("emit data!");
    //     }
    //     );
        // collection_foodItems.find({}).then(docs => {
        //     io.sockets.emit("get_data", docs);
        // });
    // });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

require('./model')

// set up form routes
const formRouter = require('./routes/formRouter');
const userRouter = require('./routes/userRouter');
const organiserRouter = require('./routes/organiserRouter');

// set up location routes
const locationRouter = require('./routes/locationRouter');

app.use(cors());

// use the body-parser middleware, which parses request bodies into req.body
// support parsing of json
app.use(bodyParser.json());
// support parsing of urlencoded bodies (e.g. for forms)
app.use(bodyParser.urlencoded({ extended: true }));

// // GET home page
// app.get('/', (req, res) => {
//     res.render('index' ,{title:'Unifood HomePage'});
// });

// Handle user-management requests
// the user routes are added onto the end of '/user-management'
app.use('/users', userRouter);
// handle form-management requests
//the form routes are added to the end of '/form-management'
app.use('/forms', formRouter);
// handle organiser-management requests
// the form routes are added to the end of '/organiser-management'
app.use('/organisers', organiserRouter);
// handle organiser-management requests
// the form routes are added to the end of '/organiser-management'
app.use('/locations', locationRouter);

// //Static file declaration
// app.use(express.static(path.join(__dirname, 'client/build')));
// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))


// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "public", "index.html"));
// // });
// const formController=require('./controller/formController')

// let interval;
// io.on("connection", socket => {
//     // console.log("user connected", getApiAndEmit(socket));
//     // if(interval){
//     //     clearInterval(interval)
//     // }
//     // interval=setInterval(()=>{
//     //     // getApiAndEmit(socket),
//     //     // getForms(socket)
//     //     formController.getAllForms(io)

//     // },1000);

//     socket.on("Forms", (io)=>{
//         formController.getAllForms(io);
//     })
//     socket.on("disconnect",()=> {
//         console.log("Client disconnected");
//         clearInterval(interval)
//     });
// });

// Step 3
if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

// //production mode
// if(process.env.NODE_ENV === 'production') {  
//     app.use(express.static(path.join(__dirname, 'client/build')));  
//     app.get('*', (req, res) => {    res.sendfile(path.join(__dirname = 'client/build/index.html'));  
// })}

server.listen(process.env.PORT || 5000, () => {
    console.log("The Unifood app is listening on port 5000!");
});
