 exports.getDate=  function () {
 // variable which  hold the new date meth
 const today = new Date();

 // options object which will display  and render values in a specific way ex. april 2th
const options = {

   weekday:"long",
   day: "numeric",
   month: "long"
};

// variable which  will hold method to render the options and for it to be in english
return  today.toLocaleDateString("en-US", options)


 }

 exports.getDay= function () {
    // variable which  hold the new date meth
    const today = new Date();
   
    // options object which will display  and render values in a specific way ex. april 2th
   const options = {
   
      weekday:"long",
      
   };
   
   // variable which  will hold method to render the options and for it to be in english
   return today.toLocaleDateString("en-US", options)
   
   
    }

    