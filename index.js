const express = require("express");
const app = express();
const PORT = 2300 || process.env.PORT
const {Router} = require("./Router/Router");
const cookie_parser = require("cookie-parser")
const path = require("path")
const hbs = require("hbs");
const { Connect_Database } = require("./Database/Database");
// create absolute paths 
const views_directory_path = path.join(__dirname,"/Html")
const partial_directory_path = path.join(__dirname,"/Html/components")
const css_directory_path = path.join(__dirname,"/css")
const javascript_directory_path = path.join(__dirname,"/javascript")
// --------------------------------
// registering paths and somethings 
app.set("views",views_directory_path);
hbs.registerPartials(partial_directory_path)
app.set("view engine","hbs");

// calling functions
Connect_Database()    // Connecting Database
// midllewares 


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookie_parser());
app.use(express.static(javascript_directory_path));
app.use(express.static(css_directory_path));
app.use(Router);
//----------------------------

app.listen(PORT,(e)=>{
    if (e) {
        console.log(e);
    }
    else {
        console.log("Server Is Running on Port No."+PORT);
    }
})

