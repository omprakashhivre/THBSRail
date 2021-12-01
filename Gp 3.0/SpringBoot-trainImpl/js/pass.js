async function getPass(){

    document.getElementById("printpass").style.display = "contents";
    let pid = document.getElementById("pid").value;
    let name = document.getElementById("pname").value; 
    let age = document.getElementById("page").value;
    var disp = document.getElementById("passdetails")
    
    if(pid){
        disp.innerHTML = " <h3 style='color:red; text-align: center;margin-top: 20px;'> No record found...</h3> "

        let fres = await fetch("http://localhost:8080/thbs/passengers/"+pid);
        data = await fres.json();
        let txt = `<style>th, td {
            border: 1px solid black;
            border-radius: 10px;
          }
          table{
              width:100%;}
              </style><table><tr>
        <th>Pass id</th> <th>Pass name</th> <th>Age </th> <th> Gender </th></tr>
         `;
       
          //  console.log(r)
            txt += `<tr><th>${data.pid}</th> <th>${data.pname}</th> <th>${data.age}</th> <th>${data.gender}</th></tr>`;
        
        txt += `</table>`
        if(fres)
        disp.innerHTML = "<br>"+txt
    }
    else if(name && age){
        try {
            let nameage =await fetch("http://localhost:8080/thbs/passengers/nameage?pname=" + name+"&age="+age);
        let xcs001 = await  nameage.json();
        let txt = `<style>th, td {
            border: 1px solid black;
            border-radius: 10px;
          }
          table{
              width:100%;}
              </style><table><tr>
        <th>Pass id</th> <th>Pass name</th> <th>Age </th> <th> Gender </th></tr>
         `;
        for( let r of xcs001){
          //  console.log(r)
            txt += `<tr><th>${r.pid}</th> <th>${r.pname}</th> <th>${r.age}</th> <th>${r.gender}</th></tr>`;
        }
        txt += `</table>`
    document.getElementById("passdetails").innerHTML = "<br>"+txt
        } catch (error) {
            alert("User not registered with given name "+name+" & age "+age)
        }
    }
    else{
        let fres = await fetch("http://localhost:8080/thbs/allpassengers");
        data = await fres.json();
        //console.log(data+" ")
        let txt = `<style>th, td {
            border: 1px solid black;
            border-radius: 10px;
          }
          table{
              width:100%;}
              </style><table><tr>
        <th>Pass id</th> <th>Pass name</th> <th>Age </th> <th> Gender </th></tr>
         `;
        for( let r of data){
          //  console.log(r)
            txt += `<tr><th>${r.pid}</th> <th>${r.pname}</th> <th>${r.age}</th> <th>${r.gender}</th></tr>`;
        }
        txt += `</table>`
    document.getElementById("passdetails").innerHTML = "<br>"+txt
    }
    
}

function updatePass(){
    let pid = document.getElementById("pid").value;
    let pname  = document.getElementById("pname").value;
    let page  = document.getElementById("page").value;
    let pgender  = document.getElementById("pgender").value;

    document.getElementById("printpass").style.display = "contents";

    if(pid){
    var data = {
        "pname":pname,
        "age" :page,
        "gender":pgender
    }
       console.log(data);
    
       let options = {
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
        
       }
    let fres = fetch("http://localhost:8080/thbs/passengers/"+pid,options);
    if(fres)
       alert("passenger Details Updated Succesfully")
    }
    else{
        alert("enter required details")
    }
}

function addPass(){
    let name = document.getElementById("pname").value;
    let age  = document.getElementById("page").value;
    let gender  = document.getElementById("pgender").value;

    if(name && age && gender){
    var data = {
        "pname":name,
        "age":age,
        "gender" :gender
    }
       console.log(data);
    
       let options = {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
        
       }

    let fres = fetch("http://localhost:8080/thbs/passengers",options);
    alert("passenger added")
    // fres.then(res => res.json()).then(d =>  console.log("passenger Added succesfully with pnr"))
    }
    else{
        alert("Please enter name age gender")
    }
}

function deletePass(){
    let pid = document.getElementById("pid").value;

    if(pid){    
    let fres = fetch("http://localhost:8080/thbs/passengers/"+pid,{method : 'DELETE'});
   if(fres)
    alert("Passenger having id :"+ pid+ " is Deleted..")
    }
    else{
        alert("passenger id required to delete")
    }
}