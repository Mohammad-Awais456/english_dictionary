const { Registeration , Dictionary } = require("../Database/schema");
const jwt = require("jsonwebtoken");
const secret_key = "therearemanystarsinthespace";
// ---------------------------------------------------------
// send response
const Send_response = async (res, s_code, message, status, data = null) => {
    await res.status(s_code).json({
      data,
      status,
      message,
  
    })
  }
// ---------------------------------------------------------
//---------------------------------------
//   Generate Json web Token 
const generate_token = async (user) => {
    let token = await jwt.sign({id: user._id },secret_key, {
      expiresIn: "7d"
    })
    return token;
  }
// ---------------------------------------------------------

//..................Registeration ...............
const register_user = async (req, res) => {

    try {

       let { email, user_name,password } = req.body;
       let email_check = await Registeration.findOne({ email })
       let user_name_check = await Registeration.findOne({ user_name })
       
          //-----------------------------------
       if (email_check) {

           Send_response(res,200,{'msg':"Account already present with this Email!"},false);
       }
       else {
           if (user_name_check) 
           {
               Send_response(res,200,{"msg":`This user name "${user_name}" is not available.`},false);

           } 
           else
           {
                
            //   req.body.password= await hash_password(password);
              let create_user = await Registeration.create(req.body);
                    
               Send_response(res,201,{"msg":"Account Created Successfully !","user":create_user},true);

           }
       }

   } catch (error) {
       console.log(error);
       res.status(200).json({ error,"msg":"Something is wrong !" });
   }




}
// ---------------------------------------------------------
const Login_user = async (req,res)=>
{
    try {

        let { user_name,password } = req.body;
        let email_check = await Registeration.findOne({ email:user_name })
        let user_name_check = await Registeration.findOne({ user_name })
        
        
         //-----------------------------------
        if (!email_check) { 
            
            if (!user_name_check) 
            {

                Send_response(res,200,{'msg':"User Name not found!"},false);
            }
            else
            {  
                // execute : if user-name is used
                
                // let check = await bcrypt.compare(password,user_name_check.password);
                if(password == user_name_check.password)
                {
               
                    
                      let token = await generate_token(user_name_check)
                      user_name_check.token= [token];
                      await user_name_check.save();
              
                res.cookie("login",token,{
                    maxAge: 1000*60*525960,
                    httpOnly:false
                   
                  });
                    Send_response(res,200,{'msg':"You have Sign In successfully.",'user':email_check},true);

                }else{

                    Send_response(res,200,{'msg':"Invalid Password"},false);
                }
             
               
             
                  
            }


        }
        // execute this code , if email is found 
        else     
        {     
            // let check = await bcrypt.compare(password,email_check.password);
           
            if(password == user_name_check.password)
            {
           

                    let token = await generate_token(email_check)
                    email_check.token= [token];
                    await email_check.save();
                    res.cookie("login",token,{
                        maxAge: 1000*60*525960,
                        httpOnly:false
                       
                      });
           let length= token.length;

                  return  Send_response(res,200,{'msg':"You have sign In successfully.",'user':email_check,length},true) 
            }else{

            return    Send_response(res,200,{'msg':"Invalid Password"},false);
            }
            
        
        }

    } catch (err) {
        console.log(err);
        Send_response(res,200,{'msg':"Something Wrong!"},false);

    }

}
// ----------------------------------------
// -----------------------------------------
const auth = async (req,res)=>
{
  try {
    
    let token = req.cookies.login;
    let verify_token;
    let user ;
         if(token==undefined || token==null || token=="" || token ==false)
         {
      return Send_response(res,200,{msg:"You are not login!"},false);
          
         }else{

           verify_token = jwt.verify(token,secret_key)
            user = await Registeration.findOne({ _id: verify_token.id });
          }
    // if user present 

    if (user) {

      res.cond = false;   // default value

      user.token.forEach((value, i, element) => {
        if (token === value) {
          res.cond = true;
          // res.new_tokens= user.token[i];
          user.token = [value];
        }
      })

      res.user = user;
    }

    if (res.cond != true) {
      return Send_response(res,200,{msg:"You are not login!"},false);

    }else{

      return Send_response(res,200,{msg:"You are login!"},true);
    }


  }
  catch (err) {
    console.log(err);
    return Send_response(res,200,{msg:"Something Wrong!"},false);

    

  }
}
// -----------------------------------------
const auth_middleware = async (req,res,next)=>
{
  try {
    
    let token = req.cookies.login;


    let verify_token;
    let user ;
         if(token==undefined || token==null || token=="" || token ==false)
         {
            //   return Send_response(res,200,{msg:"You are not login!"},false);
            res.cond = false;
          
         }else{

           verify_token = jwt.verify(token,secret_key)
            user = await Registeration.findOne({ _id: verify_token.id });
          }
    // if user present 

    if (user) {

      res.cond = false;   // default value

      user.token.forEach((value, i, element) => {
        if (token === value) {
          res.cond = true;
          // res.new_tokens= user.token[i];
          user.token = [value];
        }
      })

      res.user = user;
    }

   


  }
  catch (err) {
    // return Send_response(res,200,{msg:"Something Wrong!"},false);
    res.cond = false;


    

  }
  next();
}

// -----------------------------------------
const get_dictionary = async (req,res)=>{
  try {

     
      let full_dic= await Dictionary.find();
   
      Send_response(res, 200, { "msg": "Everything is ok",data:full_dic }, true);

    
    
  } catch (error) {
    console.log(error);
    Send_response(res, 200, { "msg": "Something Wrong !" }, false);

  }
}
// -----------------------------------------
const update_dictionary= async (req,res)=>{
  try {

    if (res.cond==true && res.user.user_type=="admin") {
     
      let doc= await Dictionary.findOneAndDelete({id:req.body.id});

        
               
           
      
      Send_response(res, 200, { "msg": "Word Deleted Succesfully" }, true);

    } else {

      Send_response(res, 200, { "msg": "You are not login, Please login first!" }, false);
    }
  } catch (error) {
    console.log(error);
    Send_response(res, 200, { "msg": "Something Wrong !" }, false);

  }
}
// -----------------------------------------
const add_word_to_dictionary= async (req,res)=>{
  try {

    if (res.cond==true) {
     
      let full_dic= await Dictionary.find();
     
        await Dictionary.create(req.body)
    
               
           
      
      Send_response(res, 200, { "msg": "Word Added Successfully",data:full_dic }, true);

    } else {

      Send_response(res, 200, { "msg": "You are not login, Please login first!" }, false);
    }
  } catch (error) {
    console.log(error);
    Send_response(res, 200, { "msg": "Something Wrong !" }, false);

  }
}
// -----------------------------------------
const Logout_user= async (req,res)=>{
  try {


    if (res.cond==true) {
      let temp_user = res.user;
      temp_user.token = [];
      await temp_user.save();
      res.clearCookie("login");
      Send_response(res, 200, { "msg": "Logout Successfully" }, true);

    } else {

      Send_response(res, 200, { "msg": "Something Wrong !" }, false);
    }
  } catch (error) {
    console.log(error);
    Send_response(res, 200, { "msg": "Something Wrong !" }, false);

  }
}


module.exports={
  update_dictionary,
    Login_user,
    Logout_user,
    Send_response,
    get_dictionary,
    register_user,
    add_word_to_dictionary,
    auth_middleware,
    auth
}