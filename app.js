const express = require("express");

const ejs = require("ejs");
//  acts as middle wear parses the  incoming requests and data before it is handled
const bodyParser = require("body-parser");

const _ = require("lodash")

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
mongoose.connect(process.env.MONGODB_URI ||"mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

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

// schema for which the objects documents will be based on
const listSchema = {
name: String,
items: [itemsSchema]

}
// new model based on the schema // item will be collection
const List = mongoose.model("List", listSchema);



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
// dynamic get route that goes to a custom page
app.get("/:customListName", function (req,res){

   
    // this holds what ever the user enters after the fprward slash
const customListName= _.capitalize(req.params.customListName);

// method to make sure the list the user enters exists or doesnt exist already to prevent duplicate pages.
List.findOne({name: customListName}, function(err,foundList){
    if (!err ) {

        if(!foundList) {
            // create a new list
            // document which will pass into the list model
const list= new List({
    name: customListName,
    items:defaultItems
});
// save to db
list.save();
// display list on page
res.redirect("/" + customListName);

        } else{
            // show an existing list
// render dynamic esisting lists
            res.render("list", {listTitle: foundList.name, newListItems: foundList.items} )
        }
    }
});




});

// post request which will post the data from the input new Item to the sever

app.post("/", function(req,res){
  // text user puts in the input box
const itemName = req.body.newItem;
const listName= req.body.list;

// new item document based off  model in  mongo db
const item = new Item({

    name: itemName
})
// if list was from the default page
if (listName=== "Today"){
// mongoose shortcut to save new items
item.save();
// redirect to home page
res.redirect ("/");
// if user put in a custom list route, push items and then redirect to cuslim lists  nameroute and render it
} else {
    List.findOne({name:listName}, function(err, foundList){
        foundList.items.push(item);
        foundList.save();
        res.redirect("/" + listName);
    })
}



   
});
app.post("/delete", function(req,res){

// hold the check box variable when it is checked
    const checkedItemId = req.body.checkbox;
    // value of listName
const listName = req.body.listName;

// deleting an item from the default list
if(listName === "Today" ) {

// method to remove chekced item
Item.findByIdAndRemove(checkedItemId, function(err){

    if (!err){
console.log("successfully deleted checked item.")

// this redirect will display the deleted check items on the page
res.redirect("/");

    }
})  
// deleting list from custom list  
} else{
                // name of custom list // pull from items array to // pull specific checked item id // callback func to find list
    List.findOneAndUpdate( {name:listName}, {$pull:{items: {_id:checkedItemId}}}, function(err,foundList){
// redirect to cusum list path
        if(!err) {
            res.redirect("/"+ listName);
        }

    })
  
}

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

//  server

app.listen(process.env.PORT|| 3000, function() {
    console.log("Server started on port 3000");
  });