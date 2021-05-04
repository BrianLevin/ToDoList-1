 module.exports= getDate;  
 function getDate() {
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
return day

 }