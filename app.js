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

  //variable which will hold the get day method
  var currentDay = today.getDay();
// hold empty day and will change and be used in ejs engine depending on condition
  var day = "";

  // switch statement to see what specific day it is
switch(currentDay){
case 0:
    day= "Sunday";
break;
case 1:
    day= "Monday";
break;
case 2:
    day= "Tuesday";
break;
case 3:
    day= "Wednesday";
break;
case 4:
    day= "Thursday";
break;
case 5:
    day= "Friday";
break;
case 6:
    day= "Saturday";
break;
default:
    console.log("Error current day is equal to " + currentDay);


}
    // looks for file called list in views then pass variable to file
    res.render("list", {kindOfDay:day})
});

// local server
app.listen(3000, function () {
  console.log("Server is running on port 3000!");
});
