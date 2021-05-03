const express = require("express");

//  acts as middle wear parses the  incoming requests and data before it is handled
const bodyParser = require("body-parser");

// Creating app which utilizes the express package
const app = express();

// home route
app.get("/", function (req, res) {
  // variable which  hold the new date meth
  var today = new Date();

  //variable which will hold the get day method
  var currentDay = today.getDay();

  // if statement to see if its the wekeend
  if (currentDay === 5 || currentDay === 0) {
    res.write("<h1>It's the weekend!</h1>");
  } else {
    res.write("<p>It's not the weekend</p>");
    res.write("<h1>have to Work!</h1>");
    // can only use res.send once , use res.write multiple times
    res.send();
  }
});

// local server
app.listen(3000, function () {
  console.log("Server is running on port 3000!");
});
