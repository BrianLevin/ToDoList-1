
const express = require("express");

//  acts as middle wear parses the  incoming requests and data before it is handled
const bodyParser = require("body-parser");


// Creating app which utilizes the express package
const app = express();


// home route
app.get("/", function(req, res){

    res.send("Hello")
    
      });


// local server
app.listen(3000, function () {
    console.log("Server is running on port 3000!");
  });


