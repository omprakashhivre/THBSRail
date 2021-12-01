var test
var counter = 0
var trainnox
var sourcex
var destx
var counterx = 1
var archit
var train_price

function swap() {
    console.log("swap call")
    let val1 = document.getElementById("source").value
    let val2 = document.getElementById("dest").value

    document.getElementById("source").value = val2

    document.getElementById("dest").value = val1
}

async function searchtrain() {
    var source = document.getElementById("source").value
    var dest = document.getElementById("dest").value
    var disp = document.getElementById("trainfind")
    var trainno = document.getElementById("trainno").value
    var trainname1 = document.getElementById("trainname").value

    if (trainno) {
        test = trainno
        disp.innerHTML = ` <h2 style="color:red;">There is no train for train number ${trainno} ..</h2>`
        let fres = await fetch("http://localhost:8080/thbs/trains/" + trainno);

        let data = await fres.json();


        let txt = ` <div class="card border-success mb-3" style ="color:black;">
      <div class="card-header bg-transparent border-success"><h2>${data.trainname}</h2></div>
      <div class="card-body text-success">
        <h5 class="card-title" >Train Number : ${data.trainno}</h5>
        <p class="card-text" id="text">Source : ${data.source}<br> Destination : ${data.destination} <br> Train Number : ${data.trainno} <br> Price : ${data.price}</p>
      </div>
      <div class="card-footer  bg-success border-success" style="text-align:center" onclick="location.href='Passengerindex.html?trainno=${trainno}'">Book Ticket</div>
    </div>`

        if (fres)
            document.getElementById("trainfind").innerHTML = txt
    }
    else if (source && dest) {
        disp.innerHTML = ` <h2 style="color:red;">There is no train From ${source} to ${dest} ..</h2>`
        let fres = await fetch("http://localhost:8080/thbs/trainbysource?source=" + source + "&dest=" + dest);
        let txt = `<br>`
        let r = await fres.json();
        for (let i = 0; i < r.length; i++) {
            let data = r[i]

            txt += ` <div class="card border-success mb-3" style ="color:black;">
            <div class="card-header bg-transparent border-success"><h2>${data.trainname}</h2></div>
            <div class="card-body text-success">
                <h5 class="card-title" >Train Number : ${data.trainno}</h5>
                <p class="card-text" id="text">Source : ${data.source}<br> Destination : ${data.destination} <br> Train Number : ${data.trainno} <br> Price : ${data.price}</p>
            </div>
            <div class="card-footer  bg-success border-success" style="text-align:center" onclick="location.href='Passengerindex.html?trainno=${data.trainno}'">Book Ticket</div>
            </div>`
        }
        if (fres)
            document.getElementById("trainfind").innerHTML = txt
    }
    else if (trainname1) {
        disp.innerHTML = ` <h2 style="color:red;">There is no train like ${trainname1} ..</h2>`
        let fres = await fetch("http://localhost:8080/thbs/trainbyname?trainname=" + trainname1);

        let r = await fres.json();
        let txt = `<br>`
        for (let i = 0; i < r.length; i++) {
            let data = r[i]

            txt += ` <div class="card border-success mb-3" style ="color:black;">
            
                    <div class="card-header bg-transparent border-success"><h2>${data.trainname}</h2></div>
                    <div class="card-body text-success">
                        <h5 class="card-title" >Train Number : ${data.trainno}</h5>
                        <p class="card-text" id="text">Source : ${data.source}<br> Destination : ${data.destination} <br> Train Number : ${data.trainno} <br> Price : ${data.price}</p>
                    </div>
                    <div class="card-footer bg-success border-success" style="text-align:center" onclick="location.href='Passengerindex.html?trainno=${data.trainno}'">Book Ticket</div>
                    </div>`
        }
        if (fres)
            document.getElementById("trainfind").innerHTML = txt
    }
    else {
        alert("Please enter atleast single entry........")
    }
}
async function bookTicket(train) {
    trainnox = train
    checkloginstatus()
    let fres = await fetch("http://localhost:8080/thbs/trains/" + train);
    let data = await fres.json();
    sourcex = data.source
    destx = data.destination
    train_price = data.price
    document.getElementById("gettrain").innerHTML = `<h5>Train Number : ${data.trainno} - ${data.trainname} <br>${sourcex} ==> ${destx}<br></h5>`
    document.getElementById("gettrainprice").innerHTML = `<h5>Total Price = ${train_price}</h5>`
    // gettrain.innerHTML = `<h3>Train Number : ${trainno} ${data.trainname}<br>From ${data.source} to ${data.destinationt}</h3>`
}
function checkloginstatus() {
    if (localStorage.getItem("email") && localStorage.getItem("password")) {
        console.log("login verified")
    } else {
        window.location.href = "C:/Users/user79/Desktop/THBSRail_official-project/ZIP/Gp/LoginforTrainProject/loginview.html"
    }
}

async function addPassenger() {
    
    let name = document.getElementById("name").value
    let age = document.getElementById("age").value
    let gender = document.getElementById("gender").value
    var txt = ""

    if (name && age && gender) {
        document.getElementById("tab").style.display = "contents"
        document.getElementById("tab1").style.display = "contents"
        try {
            let nameage = await fetch("http://localhost:8080/thbs/passengers/nameage?pname=" + name + "&age=" + age);
            let dax = await nameage.json();
            alert(name + " is Already Registered. Ok to Use Existing Details.")
            addTicket(name, age);
        }
        catch {
            var data = {
                "pname": name,
                "age": age,
                "gender": gender
            }
            console.log(data);

            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)

            }

            //         txt = `<table><tr id='table1'>
            //     <th>PassengerID </th> <th>Name</th> <th> Age </th> <th> Gender </th> <th> PNR </th></tr>
            //      `;

            //         let fres = fetch("http://localhost:8080/thbs/passengers", options);
            //         if (fres) {
            //             addTicket(name,age);
            //             txt  += `<tr><th>${counter++}</th>  <th>${name}</th> <th>${age}</th> <th>${gender}</th> <th>${archit}</th>  </tr>`

            //         }
            //         txt += `</table>`
            //         document.getElementById("passs").innerHTML += "</br>"+txt

                    // await new Promise(r => setTimeout(r, 2000));
                    // let nameage1 =await fetch("http://localhost:8080/thbs/passengers/nameage?pname="+name+"&age="+age);
                    // const xcs001 = await  nameage1.json();
                    // let passenger_id =  xcs001[0].pid
                    // updateUser(passenger_id)  
            //         alert("passenger added")
            //     }

            // }
            // else {
            //     alert("Please enter name age gender")
            // }
            let fres = fetch("http://localhost:8080/thbs/passengers", options);
            if (fres) {
                addTicket(name, age);

                var tabl = document.getElementById('tab')
                var row = tabl.insertRow(-1);
                var cell0 = row.insertCell(0);
                var cell1 = row.insertCell(1);
                var cell2 = row.insertCell(2);
                var cell3 = row.insertCell(3);
                var cell4 = row.insertCell(4);
                console.log("inserting before")

                cell0.innerHTML = `${++counter}`;
                cell1.innerHTML = `${name}`;
                cell2.innerHTML = `${age}`;
                if (gender == "M" || gender == 'm' || gender == 'f' || gender == 'F' || gender == "Male" || gender == "Female" || gender == "MALE" || gender == "male" || gender == "female" || gender == 'FEMALE') {
                    cell3.innerHTML = `${gender}`;
                } else {
                    let gen = "Others"
                    cell3.innerHTML = `${gen}`;
                }
                cell4.innerHTML = `${archit}`;
                document.getElementById("totalfare").value = train_price * counter ;
                document.getElementById("checkout").innerText= "Pay amount RS."+(train_price * counter)
            }
        }
console.log("before null")
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("gender").value = "";
        document.getElementById("date").value = "";
    }
    else {
        alert("Please enter name age gender");
    }
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("date").value = "";
}

async function morepassenger() {
    // let trainno = document.getElementById("trainno").value
    // window.location.href = "C:/Users/User76/Desktop/PROJECT/Gp/Passengerindex.html"
    // let fres = await fetch("http://localhost:8080/thbs/trains/" + test);
    // let data = await fres.json();
    // sourcex = data.source
    // destx = data.destination
    // document.getElementById("gettrain").innerHTML =     `<h5>Train Number : ${data.trainno} - ${data.trainname} <br>${sourcex} ==> ${destx}</h5>`

}

async function addTicket(name, age) {
    let pnr = generatepnr()
    let date = document.getElementById("date").value;
    console.log("ok")
    await new Promise(r => setTimeout(r, 2000))
    let tara = await fetch("http://localhost:8080/thbs/passengers/nameage?pname=" + name + "&age=" + age);
    console.log("ok after call")
    let naveen = await tara.json();
    // let r =await  omi.json();

    let trainno = trainnox
    //document.getElementById("passs").innerHTML += pnr
    if (date) {
        var data = {
            "pnr": archit,
            "trainno": trainno,
            "date": date,
            "pid": naveen[0].pid,
        }

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        }

        let fres = fetch("http://localhost:8080/thbs/tickets", options);
        fres.then(res => res.json()).then(d => console.log("Ticket Added succesfully with pnr"))
    } else {
        alert("all fields are required ")
    }
}

function generatepnr() {
    let source = sourcex
    let dest = destx

    var date = new Date(document.getElementById("date").value)
    let dt = date.getFullYear() + "" + (date.getMonth() + 1) + "" + date.getDate()


    let pnr = source.charAt(0) + dest.charAt(0) + "_" + dt + "_" + counterx
    console.log(pnr)
    counterx++
    archit = pnr.toUpperCase()
    alert(archit)
    return archit
}

function searchsomething(some) {
    alert(some)
    console.log(some.value)
}

async function searchpassenger(pass_id) {

    if (pass_id) {
        try {
            let fres = await fetch("http://localhost:8080/thbs/passengers/" + pass_id);
            let reponse = await fres.json();

            // alert("user exist")
            window.location.href = "C:/Users/User76/Desktop/PROJECT/Gp/UpdatePassengerForm.html"
        } catch (error) {
            alert(pass_id + " User does not exist")
        }


    }
    else {
        alert("Passenger id Required")
    }
}

function editPassenger() {
    let name = document.getElementById("name1").value
    let age = document.getElementById("age1").value
    let gender = document.getElementById("gender1").value
    var txt

    if (id) {
        var data = {
            "id": id,
            "name": name,
            "age": age,
            "gender": gender
        }
        // console.log(data);

        let options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        }

        let fres = fetch("http://localhost:8080/api/passengers/" + id, options);
        fres.then(res => res.json()).then(d => console.log("Passenger details updated succesfully : " + d + ""));
        //    var data = await fres.json();

        // console.log(data);
    }
    else {
        alert("Passenger id Required")
    }
}
async function updateUser(passid) {
    let usermail = localStorage.getItem("email");
    let fres = await fetch("http://localhost:8080/thbs/users/" + usermail);
    let data1 = await fres.json();
    let _pid = data1[0].passengers
    if (_pid) {
        _pid += "," + passid
    } else {
        _pid = passid
    }
    console.log("users " + data1)


    let data = {
        "passengers": _pid,
    }
    console.log(data);

    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    }
    let fres1 = fetch("http://localhost:8080/thbs/addnewpass/" + usermail, options);
    console.log("passengers added.....")

}
async function printUsersHistory() {
    checkloginstatus()
    let usermail = localStorage.getItem("email");
    const fres = await fetch("http://localhost:8080/thbs/users/" + usermail);
    let data = await fres.json();
    let pass = data[0].passengers
    let arr = pass.split(",")
    console.log(arr)
    let table = `<table style="width:100%">
    <tr>
      <th>Passenger ID</th>
      <th>Name</th> 
      <th>Age</th>
      <th>Gender</th>
    </tr>`
    // let table = `<table style="width:100%"><tr><th>Passenger ID</th><th>Passenger Name</th><th>Passenger Age</th><th>Passenger Gender</th></tr>`
    for (let i = 0; i < arr.length; i++) {
        let fres = await fetch("http://localhost:8080/thbs/passengers/" + arr[i]);
        let data = await fres.json();
        table += ` <tr>
          <th>${arr[i]}</th>
          <th>${data.pname}</th> 
          <th>${data.age}</th>
          <th>${data.gender}</th>
        </tr>`
    }

    document.getElementById("m-foot").innerHTML = "<br>" + "" + table + "</table>"
}
function xc098(){
    console.log(localStorage.getItem("name")+" "+localStorage.getItem("email"))
  document.getElementById("card-name").innerText = localStorage.getItem("name")
  document.getElementById("card-mail").innerText = localStorage.getItem("email")
  }