fetch("http://localhost:4001/getMyFiles",{
    method:"POST",
    body:JSON.stringify({"name":localStorage.getItem("email").toString()}),
    headers:{"Content-Type":"application/json"}
}).then(res=>res.json())
.then(data=>{
    console.log(data);
    var out='';
    var i=1;
    data.forEach(element => {
        out+="<tr>"
        out+="<th scope='row'>"+i+"</th>"
        out+="<td>"+element.filename+"</td>"
        //out+="<td>"+element.owner+"</td>"
        out+="<td><button class='btn btn-primary' onclick='download(this)' id='"+element.filename+"'>Download</button></td>"
        out+="<td><button class='btn btn-primary' id='"+element.id+"' type='button' data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='setDocid(this)'>Add</button></td>"
        out+="</tr>"
    });
       document.getElementById("files").innerHTML=out;
})
var docid='';
function setDocid(data)
{
    docid=data.id;
}
function adduser()
{
    var username=document.getElementById('username').value;
    console.log(docid,username)
    fetch('http://localhost:4001/addUser',{
        method:"POST",
        body:JSON.stringify({id:docid,username:username}),
        headers:{"Content-Type":"application/json"}
    }).then(res=>res.json()).then(r=>console.log(r));
}
function download(filename)
{
    location.replace("http://localhost:4001/download/"+filename.id);
    //fetch("http://localhost:4001/download/"+filename.id).then(res=>res.download())
}