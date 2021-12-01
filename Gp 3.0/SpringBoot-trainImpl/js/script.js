async function showpass() {
    let fres = await fetch("http://localhost:8080/thbs/trains");
    // var r = fres.then(res => {return res.json()}).then(d =>  {
    //    console.log("success : "+ JSON.stringify(d) + "") 
    //    return d
    // });
    var data = await fres.json();
    console.log(data);
    if (fres) {
        console.log("loading well ....")
    }


    document.getElementById("printhere").innerHTML = `<p1>${data.id}</p1>`
    show(data)

}

function show(data) {
    let txt = `<tr>
    <th>id</th> <th>mail</th> <th>pass</th>
    </tr> `;
    for (let r of data.list) {
        txt += `<tr>
        <th>${r.id}l</th> <th>${r.email}</th> <th>${r.password}</th>
        </tr> `;
    }
    document.getElementById("printhere").innerHTML = "ok" + txt
}

async function getTrains() {
    document.getElementById("printtrains").style.display = "contents";
    var disp = document.getElementById("traindetails")
    let trainnum = document.getElementById("trainnum").value
    let trainname = document.getElementById("trainname").value
    let source = document.getElementById("from").value
    let dest = document.getElementById("to").value
    
    

    if (trainnum) {
        disp.innerHTML = " <h3 style='color:red; text-align: center;margin-top: 20px;'> No record found...</h3> "
        let fres = await fetch("http://localhost:8080/thbs/trains/" + trainnum);

        data = await fres.json();
        txt = `<style>th, td {
            border: 1px solid black;
            border-radius: 10px;
          }
          table{
              width:100%;}
              </style><table><tr>
        <th>Train number</th> <th>Train Name</th> <th>Source</th> <th> Destination </th> <th>Fare</th></tr>
         `;
        txt += `<tr><th>${data.trainno}</th> <th>${data.trainname}</th> <th>${data.source}</th> <th>${data.destination}</th> <th>${data.price}</th></tr>`;
        txt += `</table>`
        if (fres) {
            disp.innerHTML = "<br>" + txt
        }
    }
    else if (source && dest) {
        disp.innerHTML = ` <h2 style="color:red;">There is no train From ${source} to ${dest} ..</h2>`
        let fres = await fetch("http://localhost:8080/thbs/trainbysource?source=" + source + "&dest=" + dest);
        let txt 
        let data = await fres.json();
        txt = `<style>th, td {
            border: 1px solid black;
            border-radius: 10px;
          }
          table{
              width:100%;}
              </style><table><tr>
        <th>Train number</th> <th>Train Name</th> <th>Source</th> <th> Destination </th> <th>Fare</th></tr>
         `;
        for (let r of data) {
            console.log(r)
            txt += `<tr><th>${r.trainno}</th> <th>${r.trainname}</th> <th>${r.source}</th> <th>${r.destination}</th> <th>${r.price}</th></tr>`;
        }
        txt += `</table>`
        if(fres)
        document.getElementById("traindetails").innerHTML = "<br>" + txt
    }
    else if (trainname) {
        disp.innerHTML = ` <h2 style="color:red;">There is no train like ${trainname} ..</h2>`
        let fres = await fetch("http://localhost:8080/thbs/trainbyname?trainname=" + trainname);
        let data = await fres.json();
        let txt = `<style>th, td {
            border: 1px solid black;
            border-radius: 10px;
          }
          table{
              width:100%;}
              </style><table><tr>
        <th>Train number</th> <th>Train Name</th> <th>Source</th> <th> Destination </th> <th>Fare</th></tr>
         `;
        for (let r of data) {
            console.log(r)
            txt += `<tr><th>${r.trainno}</th> <th>${r.trainname}</th> <th>${r.source}</th> <th>${r.destination}</th> <th>${r.price}</th></tr>`;
        }
        txt += `</table>`
        if(fres)
                document.getElementById("traindetails").innerHTML = "<br>" + txt
    }
    else {
        document.getElementById("traindetails").style.display = "contents"
        let fres = await fetch("http://localhost:8080/thbs/alltrains");
        data = await fres.json();
        txt = `<style>th, td {
            border: 1px solid black;
            border-radius: 10px;
          }
          table{
              width:100%;}
              </style><table><tr>
        <th>Train number</th> <th>Train Name</th> <th>Source</th> <th> Destination </th> <th>Fare</th></tr>
         `;
        for (let r of data) {
            console.log(r)
            txt += `<tr><th>${r.trainno}</th> <th>${r.trainname}</th> <th>${r.source}</th> <th>${r.destination}</th> <th>${r.price}</th></tr>`;
        }
        txt += `</table>`
        if(fres)
        document.getElementById("traindetails").innerHTML = "<br>" + txt
    }
}
async function addtrain() {
    var source = document.getElementById("from").value
    var dest = document.getElementById("to").value
    var trainname = document.getElementById("trainname").value
    var fare = document.getElementById("fare").value
    var trainno =  document.getElementById("trainnum").value

    if (source && dest && trainname && fare) {
        var data = {
            "trainno" : trainno,
            "trainname": trainname,
            "source": source,
            "destination": dest,
            "price": fare
        }

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        }

        let fres = fetch("http://localhost:8080/thbs/trains", options);
        fres.then(res => res.json()).then(d => console.log("Added succesfully : " + d + ""));
        //    var data = await fres.json();

        console.log(data);
        if (fres) {
            console.log("added succesfully ....")
        }
    }
    else {
        alert("all fields are required ")
    }
}
function addTicket() {
    let pnr = document.getElementById("pnr").value;
    let date = document.getElementById("traveldate").value;
    let pid = document.getElementById("pid").value;
    let trainno = document.getElementById("trainno").value;

    if (pnr && date && pid && trainno) {
        var data = {
            "pnr": pnr,
            "trainno": trainno,
            "date": date,
            "pid": pid,
        }
        console.log(data);

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        }

        let fres = fetch("http://localhost:8080/thbs/tickets", options);
        fres.then(res => res.json()).then(d => alert("ticket added Succesfully : "+JSON.stringify(d)))
    } else {
        alert("all fields are required ")
    }
}
async function getTickets() {
    document.getElementById("printticket").style.display = "contents";

    let pnr = document.getElementById("counter").value
    if (pnr) {
        document.getElementById("ticketdetails").innerHTML = " <h3 style='color:red; text-align: center;margin-top: 20px;'> No record found...</h3> "
        let fres = await fetch("http://localhost:8080/thbs/tickets/" + pnr);
        let r = await fres.json();
        let txt = `<style>th, td {
            border: 1px solid black;
            border-radius: 10px;
          }
          table{
              width:100%;}
              </style><table><tr>
        <th>Counter</th> <th>Train PNR</th> <th>Travel date</th> <th> Train Number </th> <th>Pass ID </th></tr>
         `;
        txt += `<tr><th>${r.counter}</th> <th>${r.pnr}</th> <th>${r.date}</th> <th>${r.trainno}</th> <th>${r.pid}</th></tr>`;
        txt += `</table>`
        if (fres)
            document.getElementById("ticketdetails").innerHTML = "<br>" + txt
    }
    else {
        let fres = await fetch("http://localhost:8080/thbs/alltickets");
        data = await fres.json();
        console.log(data + " ")
        txt = `<style>th, td {
            border: 1px solid black;
            border-radius: 10px;
          }
          table{
              width:100%;}
              </style><table><tr>
        <th>Counter</th> <th>Train PNR</th> <th>Travel date</th> <th> Train Number </th> <th>Pass ID </th></tr>
         `;
        for (let r of data) {
            console.log(r)
            txt += `<tr><th>${r.counter}</th> <th>${r.pnr}</th> <th>${r.date}</th> <th>${r.trainno}</th> <th>${r.pid}</th></tr>`;
        }
        txt += `</table>`
        if (fres)
            document.getElementById("ticketdetails").innerHTML = "<br>" + txt
    }
}
function updateTicket() {
    let pnr = document.getElementById("pnr").value;
    let date = document.getElementById("traveldate").value;
    let pid = document.getElementById("pid").value;
    let trainno = document.getElementById("trainno").value;
    let counter = document.getElementById("counter").value;

    var data = {
        "trainno": trainno,
        "date": date,
        "pid": pid,
        "pnr":pnr
    }
    console.log(data);

    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    }
    let fres = fetch("http://localhost:8080/thbs/tickets/" + counter, options);
    fres.then(res => res.json()).then(d => console.log("Ticket Updated succesfully with pnr"))
}
async function updateTrain() {
    var trainnum = document.getElementById("trainnum").value
    var source = document.getElementById("from").value
    var dest = document.getElementById("to").value
    var trainname = document.getElementById("trainname").value
    var fare = document.getElementById("fare").value

    if (trainnum && source && dest && trainname && fare) {
        var data = {
            "trainname": trainname,
            "source": source,
            "destination": dest,
            "price": fare
        }
        // console.log(data);

        let options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        }

        let fres = fetch("http://localhost:8080/thbs/trains/" + trainnum, options);
        fres.then(res => res.json()).then(d => console.log("Train details updated succesfully : " + d + ""));


        // console.log(data);
    }
    else {
        alert("All Train details are Required")
    }
}
function deleteTicket() {
    let pnr = document.getElementById("counter").value;

    if (pnr) {
        var data = {

        }
        let options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        }
        let fres = fetch("http://localhost:8080/thbs/tickets/" + pnr, options);
        fres.then(res => res.json()).then(d => console.log("Ticket Deleted succesfully with "))
    }
    else {
        alert("Counter required")
    }
}
function deleteTrain() {
    let trainnum = document.getElementById("trainnum").value;

    if (trainnum) {
        let fres = fetch("http://localhost:8080/thbs/trains/" + trainnum, { method: 'DELETE' });
        if (fres)
            alert(trainnum + " Deleted.." + fres)
    }
    else {
        alert("Train number required")
    }
}