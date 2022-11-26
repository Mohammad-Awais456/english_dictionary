// global variables 

let login_query={
    user_name: "",
    password : ""
}

// ------------------------------- Login Script ------------------------
// event listeners 
sign_in_form.addEventListener("submit",(e)=>e.preventDefault());
// --------------------------------------------
sign_in_submit_btn.addEventListener("click",login_function);
// --------------------------------------------
//

// ++++++++++++++++++++Functions++++++++++++++++++++++++++++

async function login_function()
{
    const pass = password_field.value.trim();
    const user_name = user_name_field.value.trim();

    if(!pass)
    {
        alert("Password Field Required!😡");
    }
    else if(!user_name)
    {
        
        alert("User Name Field Required!😡");
    }
    else
    {
        login_query.password = pass;
        login_query.user_name = user_name;
        let res = await https_request("/login","post",login_query,true);
        if(res.status==true)
        {
            alert("Sign In Successfully ☺")
            return location.href="/";
        }
        
            login_query.password = "";
            login_query.user_name = "";
            alert(res.message.msg);
        

    }

}