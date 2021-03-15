const express = require('express');
const routes = require('./routes/routes');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const port = process.env.PORT;

app.use('/', routes);

app.listen(port, ()=> console.log(`Server started on port ${port}`));
