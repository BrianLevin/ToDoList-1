const express = require("express");

//  acts as middle wear parses the  incoming requests and data before it is handled
const bodyParser = require("body-parser");

// Creating app which utilizes the express package
const app = express();

// app will utilze ejs templating and view engine

// the engine will look for files in the views folder by default
app.set('view engine', 'ejs');

// home route
app.get("/", function (req, res) {
  // variable which  hold the new date meth
  var today = new Date();

  // options object which will display  and render values in a specific way ex. april 2th
var options = {

    weekday:"long",
    day: "numeric",
    month: "long"
};

// variable which  will hold method to render the options and for it to be in english
var day = today.toLocaleDateString("en-US", options)

  // switch statement to see what specific day it is

    // looks for file called list in views then pass variable to file
    // day variable gets rendered here
    res.render("list", 
    
    {kindOfDay:day})
});

// local server
app.listen(3000, function () {
  console.log("Server is running on port 3000!");
});
