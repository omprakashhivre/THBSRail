var counter = 1
var trainnox
var sourcex
var destx
var counterx = 1
var pnrxcs

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
        disp.innerHTML = ` <h2 style="color:red;">There is no train for train number ${trainno} ..</h2>`
        let fres = await fetch("http://localhost:8080/thbs/trains/" + trainno);

        let data = await fres.json();


        let txt = ` <div class="card border-success mb-3" style ="color:black;">
      <div class="card-header bg-transparent border-success"><h2>${data.trainname}</h2></div>
      <div class="card-body text-success">
        <h5 class="card-title" >Train Number : ${data.trainno}</h5>
        <p class="card-text" id="text">Source : ${data.source}<br> Destination : ${data.destination} <br> Train Number : ${data.trainno} <br> Price : ${data.price}</p>
      </div>
      <div class="card-footer  bg-success border-success" style="text-align:center" onclick="location.href='html/pass.html?trainno=${trainno}'">Book Ticket</div>
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
            <div class="card-footer  bg-success border-success" style="text-align:center" onclick="location.href='html/pass.html?trainno=${data.trainno}'">Book Ticket</div>
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
                    <div class="card-footer bg-success border-success" style="text-align:center" onclick="location.href='html/pass.html?trainno=${data.trainno}'">Book Ticket</div>
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

    let fres = await fetch("http://localhost:8080/thbs/trains/" + train);
    let data = await fres.json();
    sourcex = data.source
    destx = data.destination
    document.getElementById("gettrain").innerHTML =     `<h5>Train Number : ${data.trainno} - ${data.trainname} <br>${sourcex} ==> ${destx}</h5>`

    // gettrain.innerHTML = `<h3>Train Number : ${trainno} ${data.trainname}<br>From ${data.source} to ${data.destinationt}</h3>`
}

async function addPassenger() {
    let name = document.getElementById("name").value
    let age = document.getElementById("age").value
    let gender = document.getElementById("gender").value

    if (name && age && gender) {
        try{
        let nameage =await fetch("http://localhost:8080/thbs/passengers/nameage?pname=" + name+"&age="+age);
        let xcs001 = await  nameage.json();
            alert(name+" is Already Registered. Ok to Use Existing Details.")
            addTicket(name,age);
        }
        catch{
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

            let fres = fetch("http://localhost:8080/thbs/passengers", options);
            console.log("pass added")
            if (fres) {
                console.log("calling ticket")
                addTicket(name,age);
                console.log("after calling ticket")
                //console.log(pnrxx)
                document.getElementById("passs").innerHTML += `<ol><h5>${counter++} : ${name} ${age} ${gender} ${pnrxcs}</h5></ol>`
                // addTicket(name,age);
            }
        }
    
    }
    else {
        alert("Please enter name age gender")
    }
}

async  function addTicket(name,age) {
    let pnr = generatepnr()
    let date = document.getElementById("date").value;
    console.log("in addticket")
    let tara = await fetch("http://localhost:8080/thbs/passengers/nameage?pname=" + name + "&age="+age);
    let xcs002 = await  tara.json();
    console.log(xcs002)
    let trainno = trainnox
    // document.getElementById("passs").innerHTML += pnr
    if (date) {
        var data = {
            "pnr": pnr,
            "trainno": trainno,
            "date": date,
            "pid": xcs002[0].pid,
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

function generatepnr(){
    let source = sourcex
    let dest = destx
    let  date = document.getElementById("date").value


    let pnr = source.charAt(0)+dest.charAt(0)+""+date+""+counterx
    console.log(pnr)
    counterx++
    pnrxcs =  pnr.toUpperCase()
    return pnrxcs
}

function searchsomething(some){
    alert(some)
    console.log(some.value)
}