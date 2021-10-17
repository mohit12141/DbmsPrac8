const name={"name":"admin@a.c"};
fetch("http://localhost:4001/getFiles",{
    method:"POST",
    body:JSON.stringify({"name":"admin@a.c"}),
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
        out+="<td>"+element.owner+"</td>"
        out+="<td><button class='btn btn-primary' onclick='download(this)' id='"+element.filename+"'>Download</button></td>"
        //out+="<td><button class='btn btn-primary' id='"+element.id+"' type='button' data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='setDocid()'>Add</button></td>"
        out+="</tr>"
    });
       document.getElementById("files").innerHTML=out;   
})
function download(filename)
{
    location.replace("http://localhost:4001/download/"+filename.id);
    //fetch("http://localhost:4001/download/"+filename.id).then(res=>res.download())
}
var docid='';
function setDocid(data)
{
    docid=data.id;
}
function addUser()
{
    var username=document.getElementById('username').value
    console.log(docid,username)
}