const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io= socketIo(server);

// view engine setup
app.set('views', path.join(__dirname, 'views_backend'));
app.set('view engine', 'pug');

require('./model')

// set up form routes
const formRouter = require('./routes/formRouter');
const userRouter = require('./routes/userRouter');
const organiserRouter = require('./routes/organiserRouter');

app.use(cors());


// support json parsing
app.use(bodyParser.json());
// support urlencoded bodies parsing
app.use(bodyParser.urlencoded({ extended: true }));

var connection_string = "mongodb+srv://pbudiman:<password>@cluster0-hdaoj.mongodb.net/unifood?retryWrites=true&w=majority";
var mongo_url = connection_string.replace("<password>", process.env.MONGO_PASSWORD);

// Get forms from mongodb and emit to client using socket.io
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

// Listen from the client
let interval;
io.on("connection", (socket)=> {
    console.log("New client Time connected");
    interval = setInterval(()=> getAllForms(socket),1000);

    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});

// Routers, to handle requests
app.use('/users', userRouter);
app.use('/forms', formRouter);
app.use('/organisers', organiserRouter);

app.use(express.static(path.join(__dirname, "client", "build")))

// For app in heroku
if (process.env.NODE_ENV === 'production') {
    // production build that can serve our server
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

server.listen(process.env.PORT || 5000, () => {
    console.log("The Unifood app is listening!");
});

module.exports={app}