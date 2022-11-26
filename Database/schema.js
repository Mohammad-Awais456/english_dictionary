const mongoose = require("mongoose");

const registeration_schema = new mongoose.Schema({

    name: {type:String,required:true},
    user_name: {type:String,required:true},
    email: {type:String,required:true},
    password: {type:String,required:true},   
    user_type: {type:String,required:true},   
    token: []
},{timestamps:true})



const dictionary_schema = new mongoose.Schema({
    meaning: {type:String,required:true},
    word: {type:String,required:true},
    id: {type:String,required:true}

   
})


const Registeration = new mongoose.model("User",registeration_schema);
const Dictionary = new mongoose.model("Dictionary",dictionary_schema);


module.exports= {
    Registeration,
    Dictionary
}
