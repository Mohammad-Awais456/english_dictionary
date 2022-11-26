const { register_user,get_dictionary, add_word_to_dictionary,Login_user, auth_middleware, Logout_user,update_dictionary
 } = require("../Functions/functions");

const  Router = require("express").Router();


// Files Paths 
// ----------------------------


Router.get("/",auth_middleware,(req,res)=>{
    
  if(res.cond==true)
  {
    let admin_cond="false";
      if(res.user.user_type=="admin")
     {
        admin_cond="true";
      }

      res.status(200).render("index",{
        name:res.user.name,
        profile_cond:"ok",
        sign_btn_cond:"dnone",
        new_btn_conditoin:"ok",
        logout_btn_cond:"ok",
        condition_for_login:"true",
        admin_login:admin_cond
      });
  }
  else
  {
    res.status(200).render("index",{
        name:"nothing",
        profile_cond:"dnone",
        new_btn_conditoin:"dnone",
        sign_btn_cond:"ok",
        logout_btn_cond:"dnone",
        condition_for_login:"true",
        admin_login:"false"
      });

  }

})
// login get request
Router.get("/login",(req,res)=>{
    
  
    res.status(200).render("signin");

})
Router.post("/register",register_user)
// Login Request
Router.post("/login",Login_user)
// 
// get full dictionary 
Router.get("/dictionary",get_dictionary);
// delete word in dictionary
Router.put("/dictionary",auth_middleware,update_dictionary);
// 
// New word creation Request
Router.post("/dictionary",auth_middleware,add_word_to_dictionary)
// Logout Request
Router.post("/logout",auth_middleware,Logout_user)

module.exports={Router}