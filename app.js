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


//to get notification
const getApiAndEmit =  async socket =>{
    try{
        const res =  await axios.get("https://unifood-app.herokuapp.com/forms/formList");
        socket.emit("Notifications", res.data);

    }catch(error){
        console.error("Error")
    }
};

//to get all forms
const getForms= async socket=>{
    try{
        const response=await axios.get("https://unifood-app.herokuapp.com/forms/formList");
        socket.emit("Forms", response.data);
    }catch (error){
        console.log("Error");
    }
}


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


// use the body-parser middleware, which parses request bodies into req.body
// support parsing of json
app.use(bodyParser.json());
// support parsing of urlencoded bodies (e.g. for forms)
app.use(bodyParser.urlencoded({ extended: true }));

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

app.use(express.static(path.join(__dirname, "client", "build")))

// GET home page
app.get('/', (req, res) => {
    res.render('index' ,{title:'Unifood HomePage'});
});





let interval;
io.on("connection", socket => {
    // console.log("user connected", getApiAndEmit(socket));
    if(interval){
        clearInterval(interval)
    }
    interval=setInterval(()=>{
        getApiAndEmit(socket),
        getForms(socket)
    },1000);

    socket.on("disconnect",()=> {
        console.log("Client disconnected");
        clearInterval(interval)
    });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

server.listen(process.env.PORT || 5000, () => {
    console.log("The Unifood app is listening on port 5000!");
});
