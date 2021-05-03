
const express = require("express");

//  acts as middle wear parses the  incoming requests and data before it is handled
const bodyParser = require("body-parser");


// Creating app which utilizes the express package
const app = express();


// home route
app.get("/", function(req, res){

    // variable which  hold the get date method
    var today = new Date();
// if statement to see if its the wekeend
    if(today.getDay() === 5 || today.getDay() === 0 ) {
    
    res.send("It's the weekend!")

    } else{

res.send("I have to Work!")

    }

      });


// local server
app.listen(3000, function () {
    console.log("Server is running on port 3000!");
  });


