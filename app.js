const express = require("express");

//  acts as middle wear parses the  incoming requests and data before it is handled
const bodyParser = require("body-parser");

const mongoose = require("mongoose");





// Creating app which utilizes the express package
const app = express();



// app will utilze ejs templating and view engine

// the engine will look for files in the views folder by default
app.set('view engine', 'ejs');

// telling app to use body parser
app.use(bodyParser.urlencoded({extended: true})); 

// serve up location of static files which can be rendered in ejs
app.use(express.static("public"))

// crreate new database using mongo db connecting mongoose
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

// JSON object that defines the shape and content of the documents embedded in the document collection
const itemsSchema = {
    name: String

}
// new model based on the schema // item will be collection
const Item = mongoose.model("Item", itemsSchema);

// add values to the model
const item1 =  new Item ({
   
    name: "Welcome to your todolist!"
});

const item2 =  new Item ({
   
    name: " hit the + button to add a new item"
});

const item3 =  new Item ({
   
    name: "  <-- Hit this to delete an item"
});
// array holding values
const defaultItems = [item1, item2, item3];




// home route
app.get("/", function (req, res) {




    // find everthing in items collection to send over to list.ejs
Item.find({}, function(err,foundItems){
    // if statement which will create items if there are no items in the collection
    if (foundItems.length === 0) {
// insert item and array to database
Item.insertMany(defaultItems, function(err){
   
    if (err){
        console.log(err);
    } else{

        console.log("Successfully saved default items to database")
    }
});
res.redirect("/");

    } else{
         // pass title and  foundItems to list.ejs
  res.render("list", {listTitle:"Today", newListItems: foundItems})

    }
    
  
 

});

  
});

// post request which will post the data from the input new Item to the sever

app.post("/", function(req,res){
  // text user puts in the input box
const itemName = req.body.newItem;

// new item document based off  model in  mongo db
const item = new Item({

    name: itemName
})
// mongoose shortcut to save new items
item.save();
// redirect to home page
res.redirect ("/");

   
});
app.post("/delete", function(req,res){

    console.log(req.body.checkbox)
})

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
