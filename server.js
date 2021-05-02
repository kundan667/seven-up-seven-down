const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const index = require("./routes/index");

const app = express();
const server = http.createServer(app);
// CORS
const cors = require("cors");
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// Create server

const port = process.env.PORT || 9000;

// DB
const mdb = require("./config/key").mongoURIprod;
mongoose.connect(process.env.MONGODB_URI || mdb)
.then(() => console.log("Mongo DB connected"))
.catch(err => console.log("db error:",err));

// Middelwares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(passport.initialize());

// API Routes
app.use("/api", index);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/dist'));
}
//Listen
server.listen(port, () => console.log(`server running on port ${port}`));