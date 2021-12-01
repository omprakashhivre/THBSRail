var counter = 100
var pnrok
async function searchpnr() {
    document.getElementById("showticket").style.display = "contents";

    var pnr = document.getElementById("pnr").value
    var disp = document.getElementById("print")

    if (pnr) {
        pnrok = pnr
        disp.innerHTML = " <h3 style='color:red; text-align: center;margin-top: 20px;'> No record found, Please check PNR....</h3> "
        let fres = await fetch("http://localhost:8080/thbs/tickets/" + pnr);
        let r = await fres.json();
        r = r[0]

        let fres2 = await fetch("http://localhost:8080/thbs/passengers/"+r.pid);
        data = await fres2.json(); 

        let fres1 = await fetch("http://localhost:8080/thbs/trains/"+r.trainno);
        r1 = await fres1.json(); 

        let txt = ` <div class="card border-success mb-3" style ="color:black;">
        <div class="card-header bg-transparent border-success"><h2>${pnr}</h2></div>
        <div class="card-body text-success">
          <h5 class="card-title" >Train Number : ${r1.trainname}</h5>
          <p class="card-text" id="text">Source : ${r1.source}<br> Destination : ${r1.destination} <br> Train Number : ${r1.trainno} <br> Price : ${r1.price}</p>
        </div>
        <div class="card-footer  bg-dark text-white border-"'">Passenger Details:<br>Passenger ID :${data.pid}<br>Name : ${data.pname}<br>Age : ${data.age}<br>Gender : ${data.gender}</div>
        <button onclick="download(pnrok)">Print Ticket</button>
        </div> `;
        // for(let r in data)
           
            
            document.getElementById("print").innerHTML = "<br>" + txt
    }
    else {
        let fres = await fetch("http://localhost:8080/thbs/alltickets");
        data = await fres.json();
        //console.log(data + " ")
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
           // console.log(r)
            txt += `<tr><th>${r.counter}</th> <th>${r.pnr}</th> <th>${r.date}</th> <th>${r.trainno}</th> <th>${r.pid}</th></tr>`;
        }
        txt += `</table>`
        if (fres)
            document.getElementById("print").innerHTML = "<br>" + txt
    }
    console.log( document.getElementById("print").innerText);
}

function generatepnr(){
    let source = document.getElementById("source").value
    let dest = document.getElementById("dest").value
    let  date = document.getElementById("date").value


    let pnr = source.charAt(0)+dest.charAt(0)+"_"+date+"_"+counter
    console.log(pnr)
    counter++
    return pnr.toUpperCase()
}

async function pnrbypid(){
    var passid = document.getElementById("passid").value
    document.getElementById("print").style.display = "contents"
    document.getElementById("showticket").style.display = "contents"
    if(passid){
        let fres = await fetch("http://localhost:8080/thbs/ticketsbypid/"+passid);
        let r = await fres.json();
        let txt;
        for(let i=0;i<r.length;i++){
            let tkt = r[i]
                let fres2 = await fetch("http://localhost:8080/thbs/passengers/"+passid);
                data = await fres2.json(); 

                let fres1 = await fetch("http://localhost:8080/thbs/trains/"+tkt.trainno);
                r1 = await fres1.json(); 

               txt += ` <div class="card border-success mb-3" style ="color:black;">
                <div class="card-header bg-transparent border-success"><h2>${tkt.pnr}</h2></div>
                <div class="card-body text-success">
                <h5 class="card-title" >Train Name : ${r1.trainname}</h5>
                <p class="card-text" id="text">Source : ${r1.source}<br> Destination : ${r1.destination} <br> Train Number : ${r1.trainno} <br> Price : ${r1.price}</p>
                </div>
                <div class="card-footer  bg-dark text-white border-"'">Passenger Details:<br>Passenger ID :${data.pid}<br>Name : ${data.pname}<br>Age : ${data.age}<br>Gender : ${data.gender}</div>
                <button onclick="download(pnrok)">Print Ticket</button>
                </div> `;
        }
        if (fres)
        document.getElementById("print").innerHTML = "<br>" + txt
    }
    else{
        alert("enter pass id")
    } 
}

function download(filename){
    var doc = new jsPDF();
    doc.text(20,20,"Thbs RailWays Ticket")
    doc.text(20,30,"")
    doc.text(20,40,document.getElementById("print").innerText)
    doc.save(filename+'.pdf')
    //alert(filename)
}