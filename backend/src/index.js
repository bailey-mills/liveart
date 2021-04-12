const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express();
require('dotenv').config();
// middleware  
// json data and urls
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// session
app.use(session({
  secret: process.env.SESSION_SECRET,
  name:'uniqueSessionID',
  resave: false,
  saveUninitialized: false
}));
app.use(cookieParser(process.env.SESSION_SECRET));


// cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



// routes import 
const routes = require('./routes/routes');

const port = process.env.PORT;

app.use('/', routes);

app.listen(port, ()=> console.log(`Server started on port ${port}`));