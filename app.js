const express = require("express");

//  acts as middle wear parses the  incoming requests and data before it is handled
const bodyParser = require("body-parser");

// Creating app which utilizes the express package
const app = express();

// this is where new items will get stored, default items are also here
let items= ["Buy Food", "Cook Food", "Eat Food"];
// data data store for workitems
let workItems=  [];

// app will utilze ejs templating and view engine

// the engine will look for files in the views folder by default
app.set('view engine', 'ejs');

// telling app to use body parser
app.use(bodyParser.urlencoded({extended: true})); 

// serve up location of static files which can be rendered in ejs
app.use(express.static("public"))

// home route
app.get("/", function (req, res) {
  // variable which  hold the new date meth
  let today = new Date();

  // options object which will display  and render values in a specific way ex. april 2th
let options = {

    weekday:"long",
    day: "numeric",
    month: "long"
};

// variable which  will hold method to render the options and for it to be in english
let day = today.toLocaleDateString("en-US", options)

  // switch statement to see what specific day it is

    // looks for file called list in views then pass variable to file
    // day variable gets rendered here

    // rediretced from post route and then render the kindof day and the new list item
    res.render("list", {listTitle:day, newListItems: items})
});

// post request which will post the data from the input new Item to the sever

app.post("/", function(req,res){
    // body parser allows to grab value from new Item and saved

     let item= req.body.newItem;

if (req.body.list === "Work") {

    // push to work items array
workItems.push(item)
res.redirect("/work")
} else{


// push item into the items array
 items.push(item);

// once item is saved, redirected to home route

res.redirect("/")
}


   
});

// render and get the the work page
app.get("/work", function(req,res){
res.render("list", {listTitle: "Work List", newListItems: workItems} );

})

// post new work items into the work items array
app.post("/work", function(req,res){

    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work")
})

app.get("/about", function(req,res){
res.render("about")

})

// local server
app.listen(3000, function () {
  console.log("Server is running on port 3000!");
});
