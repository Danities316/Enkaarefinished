
let loader =document.getElementsByClassName("loader");


const formdata = new FormData();

 const options ={

     method: 'POST',

     headers:{

        
         "Acces-Control-Allow-Credentials":true,
         "Access-Control-Allow-Origin": "https://calm-gingersnap-fdb8ce.netlify.app",
         withCredentials:true

     },
    credentials: 'include',

    

     
    
 };
// https://1ed2-105-231-144-76.ngrok.io/api'

//https://yielding-dented-amusement.glitch.me
 
 let f= fetch('https://yielding-dented-amusement.glitch.me/get',options).catch(err =>{
   

});

loader[0].classList.add("addedloader");

f.then(res => res.json()).then(d =>{
    loader[0].classList.remove("addedloader");
const{auth,dashboard}=d;

if(auth==="yes"){
    if(dashboard==="candidate"){
        window.location.href="/workerdashboard"
    }else{
        window.location.href="/employerdashboard"
    }
}




}).catch(err =>{

console.log(err);
if(err){
// yes();
//  alert("Not sent.........the server is down!");

}else{

}
});







let form = document.getElementById("loginform");
let email= document.getElementById("username");
let password=document.getElementById("password");
let check =document.getElementById("check");

let alert= document.getElementsByClassName("invalidnot");

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    
    
    
    const formdata = new FormData();
    
    
    formdata.append("email", email.value);

    formdata.append("password",password.value);
    formdata.append("check", check.checked);
 
    const options ={

        method: 'POST',
        
        headers:{
            "Acces-Control-Allow-Credentials":true,
            withCredentials:true

        },
       credentials: 'include',
   
        body: formdata,
       
    };
   // https://1ed2-105-231-144-76.ngrok.io/api'

   //https://half-geode-roundworm.glitch.me/api
   //http://127.0.0.1:3890
    
    let f= fetch('https://yielding-dented-amusement.glitch.me/login',options).catch(err =>{
      

});
loader[0].classList.add("addedloader");

f.then(res => res.json()).then(d =>{
    
   
  const{ verytype,usertype,userid,firstname,secondname}=d;


    if(verytype==="valid"){
        localStorage.setItem("pfname",firstname);
        localStorage.setItem("psname",secondname);
        localStorage.setItem("userloged",userid);
        localStorage.setItem("usertype",usertype);
        if(usertype==="client"){
            loader[0].classList.remove("addedloader");
            form.reset()
          window.location.href="/employerdashboard"
        }else if(usertype==="candidate"){
            loader[0].classList.remove("addedloader");
            form.reset()
           window.location.href="/workerdashboard";
            
        }
    }else{
        alert[0].style.display="block";
        loader[0].classList.remove("addedloader");
    }
   
    
    
    }).catch(err =>{
    
    console.log(err);
     if(err){
    // yes();
    //  alert("Not sent.........the server is down!");
    
     }else{
    
     }
    });


   
    
    
});
let removealert=()=>{
    alert[0].style.display="none";
}

