require('dotenv').config()
const mongoose = require("mongoose");

// Connect to MongoDB --- Replace this with your Connection String
CONNECTION_STRING = "mongodb+srv://pbudiman:<password>@cluster0-hdaoj.mongodb.net/unifood?retryWrites=true&w=majority";
MONGO_URL = CONNECTION_STRING.replace("<password>",process.env.MONGO_PASSWORD);

mongoose.connect(MONGO_URL || "mongodb://localhost/info30005",
    { useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        dbName: "unifood"
    });
const db = mongoose.connection;
db.on("error", err => {
    console.error(err);
    process.exit(1);
});
db.once("open", async () => {
    console.log("Mongo connection started on " + db.host + ":" +
        db.port); });

require("./user");

require("./organiser");

require("./form");

require("./location");
module.exports = {
    MONGO_URL
}