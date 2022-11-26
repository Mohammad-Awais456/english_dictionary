const mongoose= require("mongoose");

// connect to database
const Connect_Database= async ()=>
{
    let url = "mongodb+srv://awais:3mwtZ6uQJIzRU0G4@cluster0.w3ct3.mongodb.net/?retryWrites=true&w=majority";
    let res= await mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true});
    console.log("Database connected successfully with server "+ res.connection.host);

}

module.exports={Connect_Database};