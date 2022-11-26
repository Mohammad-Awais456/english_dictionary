function toggle_ele(ele,classadd,classremove)
{
  if(ele!=null)
  {

    ele.classList.add(classadd)
    ele.classList.remove(classremove)
  }
}
// ------------------------------------------------------------
// https_request function

async function https_request(root, type, data, cond = false) {
    let res;
    if (cond) {
      // console.log("data");
  
      res = await fetch(root, {
        method: type,
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data)
  
      })
    } else {
      // console.log("data no");
  
      res = await fetch(root, {
        method: type,
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        credentials: "include"
      })
    }
    res = await res.json();
    return res;
  }


//   ---------------------------
function generate_random(n) {
    var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   
  
    if (n > max) {
      return generate_random(max) + generate_random(n - max);
    }
  
    max = Math.pow(10, n + add);
    var min = max / 10; // Math.pow(10, n) basically
    var number = Math.floor(Math.random() * (max - min + 1)) + min;
  
    return ("" + number).substring(add);
  }

  