const express = require("express");
const app = express();
const l = require('lodash');
const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: true}));
app.use(express.json()); 
app.use(bodyParser.json());

// ROUTES
const userRoute = require('./routes/usersRoutes')
// const systemRoute = require('./routes/systemsRoutes')

app.use(userRoute)
// app.use(systemRoute)

app.listen(5000, () => {
    console.log("listening on port 5000");
});