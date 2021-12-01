var sendotp
function checklocalstorage(){
   let email = localStorage.getItem("email") 
   let pass = localStorage.getItem("password") 
   if(email && pass){
       document.getElementById("email").value = email
       document.getElementById("pass").value = pass
   }
}
function sendMail(params){
        sendotp = Math.floor((Math.random() * 100000));
        let mailid = document.getElementById("resetemail").value
        console.log(sendotp)
          try {
              if(validateEmail(mailid)){
                var temp={
                    to_name: localStorage.getItem("name"),
                    from_name: "THBSRail",
                    message: "Your OTP for Reset the password is "+sendotp+" ",
                    msg1:"This is a system generated email, no need to reply this email id.",
                    to_email: mailid,
                    };
                emailjs.send("service_ukgndsq","template_k8qpx17",temp).then(
                    function(res){
                        console.log("status "+res.status);
                        alert("OTP send")
                    }
                );
                localStorage.clear()
                localStorage.setItem("email",mailid)
                document.getElementById("div1").style.display = "none"
                document.getElementById("div2").style.display = "contents"
              }
              else{
                  alert("Email required")
              }
            
          } catch (error) {
              alert("some error occured : "+error)
          }        
    }
function verify(pass) {
    let otp = document.getElementById("resetotp").value
    let email = localStorage.getItem("email")
    console.log(sendotp +" = "+otp)
        if (otp == sendotp) {
           console.log("otp matches") 
        var data = {
            "password" : pass,
        }
     
        let options = {
         method:'PUT',
         headers:{
             'Content-Type':'application/json'
         },
         body: JSON.stringify(data)         
        }       
        let fres = fetch("http://localhost:8080/thbs/changepass/"+email,options);
        localStorage.setItem("password",pass)
        if(fres){
            alert("password updated succesfully")
            window.location.href = "loginview.html"
        }
    }
    else {
        alert("Wrong otp entered")
    }
}
async function login(){
        let email = document.getElementById("email").value
        let pass = document.getElementById("pass").value
        if(email == "admin" && pass == "admin123"){
            localStorage.setItem("email",email)
            localStorage.setItem("password",pass)
            localStorage.setItem("name","Admin")
            window.location.href = "../NiceAdmin/index.html"
        }
        else if(email && pass){
            console.log(email+" & "+pass+" verifies........")
            localStorage.clear();
           try{
            let fres = await fetch("http://localhost:8080/thbs/users/"+email);
            let reponse = await fres.json();
            let email12,pass12,name12
            for(let r of reponse){
                email12 = r.email
                pass12 = r.password
                name12 = r.name
            }
            console.log(email12+" "+pass12)
           let jsone = JSON.stringify(reponse)
           let pass1 = reponse.password
            console.log(reponse)
            console.log(jsone);
            if(pass == pass12){
                localStorage.setItem("email",email)
                localStorage.setItem("password",pass)
                localStorage.setItem("name",name12)
                console.log("email and password added to local")
                
                window.location.href = "../index.html"
             }else{
                 alert("password is wrong")
             }
            }
            catch(e){
                alert("User not registered, Plesae register and try again.....")
           }
        }
        else{
            alert("email & password required")
        }
    }
async function registerUser(){
    let email = document.getElementById("signemail").value
    let pass = document.getElementById("signpass").value
    let cpass = document.getElementById("csignpass").value
    let name = document.getElementById("signname").value
    let regotp = document.getElementById("regotp").value
    if(pass !== cpass){
        console.log(pass+" "+cpass+" "+email)
        alert(pass+" Password not Matches..."+cpass)  
    }
    else if(email && pass && name ){
       if(validateEmail(email)){
           if(regotp == sendotp){

            try {
                let fres = await fetch("http://localhost:8080/thbs/users/"+email);
                let reponse = await fres.json();
                if(fres)
                alert("user is already registered")
            } catch (error) {
                var data = {
                    "email": email,
                    "password": pass,
                    "name": name,
                    "passengers": "",
                }
                console.log(data);

                let options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }

                let fres = fetch("http://localhost:8080/thbs/insertusers", options);
                if(fres){
                    localStorage.clear();
                    localStorage.setItem("email",email) 
                    localStorage.setItem("password",pass) 
                    localStorage.setItem("name",name) 
                    alert("registered succesfully")
                    window.location.href="loginview.html"
                }
                
            }
            
            }else{
                alert("Incorrect OTP")
            }          
       }else{
           alert(email+" is not a correct email, please check it.")
       }
    }
    else{
        alert(" all fields are required...")
    }
}    
function  logout(){
    let con = confirm("Are you sure about logout")
    if(con){
        localStorage.clear();
        window.location.href="loginview.html"
    }else{
        
    }
}
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
async function verifyemail(){
    sendotp = Math.floor((Math.random() * 1000000));
    let signemail = document.getElementById("signemail").value
    
    console.log(signemail)
      try {
       try {
        let fres = await fetch("http://localhost:8080/thbs/users/"+signemail);
        let data = await fres.json()
        if(fres)
        alert("user is already registered")
       } catch (error) {
        if(validateEmail(signemail)){
            var temp={
                to_name: localStorage.getItem("name"),
                from_name: "THBSRail",
                message: "Verify your Email address \n  OTP : "+sendotp+" ",
                msg1:"This is a system generated email, no need to reply this email id.",
                to_email: signemail,
                };
            emailjs.send("service_ukgndsq","template_k8qpx17",temp).then(
                function(res){
                    console.log("status "+res.status);
                    alert("OTP send")
                }
            );
            localStorage.clear()
            localStorage.setItem("email",signemail)
            document.getElementById("otpdiv").style.display = "contents"
            // document.getElementById("div1").style.display = "none"
          }
          else{
              alert("Email required")
          }
       }        
      } catch (error) {
          alert("some error occured : "+error)
      }    
}

function valid(){
    document.getElementById("myForm1").style.display = "none";
    let regotp = document.getElementById("regotp").value;
        if(regotp == sendotp){
            document.getElementById("myForm").style.display = "block";
        }
        else{
            alert("Wrong OTP!");
            openform1();
        }
}
function openform1(){
    document.getElementById("myForm1").style.display = "block";
}
