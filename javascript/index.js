// global variables 

// --------------------
let new_word_query = {
    word:"", meaning:"",id:""
}

let full_dictionary;

// --------------------
let admin_login_conditon = false;

// -------------------variables for dom -----------------
const inner_dictionary = document.querySelector(".inner_dictionary");



// event listenser 

// -----------------------------------------
close_dictionary.addEventListener("click",()=>toggle_ele(document.querySelector('.dictionary_container'),'n','perfect'))
// -----------------------------------------
view_dictionay_button.addEventListener("click",()=>toggle_ele(document.querySelector('.dictionary_container'),'perfect','n'))

// -----------------------logout eventlistener------------------
sign_out_button.addEventListener("click",async ()=>{
let res = await    https_request("/logout","post");
if(res.status===true)
{
    alert(res.message.msg);
    location.reload();
}
else
{
    alert(res.message.msg);

}

})

// -----------------------------------------
close_word_manager.addEventListener("click",()=>toggle_ele(document.querySelector('.word_manager_container'),'n','perfect_transform'))
// -----------------------------------------
add_new_word_btn.addEventListener("click",()=>toggle_ele(document.querySelector('.word_manager_container'),'perfect_transform','n'))

// -----------------------------------------
// -----------------------------------------
new_word_add_btn.addEventListener("click",add_new_word)

// -----------------------------------------
// document.querySelector(".").addEventListener("click",(e)=>{

    
//     if (document.querySelector(".inner_dictionary").contains(e.target)){
//         // Clicked in box
//       } else{
//         // Clicked outside the box
//       }
    
// })
window.addEventListener('click', function(e){   
    if (!(document.querySelector(".inner_dictionary").contains(e.target))){
        // Clicked outside the box
        close_other_meaning_div()
    } 

})
// -----------------------------------------

// -----------------------------------------
// -----------------------functions --------------------

// -----------------------------------------
async function get_full_dictionary()
{
    let res = await https_request("/dictionary","get");
    if(res.status==true)
    {
        return res.message.data;
    }else{
        return false;
    }
}
// -----------------------------------------
async function show_dic_words()
{
    inner_dictionary.innerHTML="";
    if( condition_for_admin_login.getAttribute("target") == "true")
    {
       admin_login_conditon=true;
    }
     full_dictionary= await get_full_dictionary()
    if(full_dictionary==false)
    {
        inner_dictionary.innerHTML=`
        <h1>Empty <i class="fas fa-trash"></i></h1>
        `;
        return false;
    }
    

    full_dictionary.forEach((ele,i)=>{
        let html = get_word_meaning_html(ele);
        inner_dictionary.innerHTML+=html;

        
    })
 if(admin_login_conditon==true)
 {
        let all_del_btn = document.querySelectorAll(".del_btn")
        all_del_btn.forEach((e)=>{
            e.addEventListener("click",delete_dictionary_word);
        })

    let divs= document.querySelectorAll(".word_meaning_container");
    if(divs!=null && divs !=undefined && (divs[0]!=undefined && divs.length!=0))
    {

       
          divs.forEach((e,i)=>{

            e.addEventListener("click",(e)=>{

               let div_el= e.target.querySelector(".edit_delete_container")
               toggle_ele(div_el,"n","dnone")

               close_other_meaning_div(div_el)
             
            
            
            })
          })
        }
    }
   
}
show_dic_words();
// -----------------------------------------
function close_other_meaning_div(div_el="all")
{

    let all_meaning_divs= document.querySelectorAll(".edit_delete_container");

    if(all_meaning_divs!=null && all_meaning_divs !=undefined && (all_meaning_divs[0]!=undefined && all_meaning_divs.length!=1))
       {
           
           all_meaning_divs.forEach((ed,i)=>{
            if(div_el!="all")
            {
                   if(div_el==null || div_el==undefined || ed ==null || ed==undefined)
                   {
                    return false;
                   }
                if(div_el.id!=ed.id)
                {
                    toggle_ele(ed,"dnone","n")
                    
                }
            }else{
                toggle_ele(ed,"dnone","n")

            }

           })
       }
}
// -----------------------------------------
function get_word_meaning_html(ele)
{
    let cond_classes=" ";
   
        cond_classes= "class='edit_delete_container n dnone'"
    
   
    return (`
    <div class="word_meaning_container">
    <h3>${ele.word}</h3>
    <p>${ele.meaning}</p>
    <div ${cond_classes} id="${ele.id}">
    
     <i class="fas fa-trash del_btn hover" on target="${ele.id}" ></i>
    </div>
</div>
    `)
}
// -----------------------------------------
async function add_new_word()
{
    const meaning = new_word_meaning_field.value.trim();
    const word = new_word_field.value.trim();
    const id = generate_random(6);
    if(!word)
    {
        alert("Word Name Field Required!😡");
    }
    else if(!meaning)
    {
        
        alert("Meaning Field Required!😡");
    }
    else
    {
        new_word_query.meaning = meaning;
        new_word_query.word = word;
        new_word_query.id = id;
        let res = await https_request("/dictionary","post",new_word_query,true);
        if(res.status==true)
        {
            alert("New Word Added Successfully!");
            new_word_meaning_field.value = "";

             new_word_field.value= "";

             new_word_query.meaning = "";
        new_word_query.word = "";
        new_word_query.id = "";
           show_dic_words();

        return true;
        }
        
        new_word_query.meaning = "";
        new_word_query.word = "";
        new_word_query.id = "";
            alert(res.message.msg);
        

    }
}

// -----------------------------------------
// -----------------------------------------
async function delete_dictionary_word(e)
{
      let get_id = e.target.getAttribute("target");
   let res = await  https_request("/dictionary","put",{id:get_id},true);
      if(res.status==true)
      {
        alert(res.message.msg);
        show_dic_words();
    }  
    else{
          alert(res.message.msg);

      }
}
// -----------------------------------------
