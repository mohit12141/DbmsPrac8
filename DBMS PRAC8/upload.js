var fsubmit=document.getElementById("myform");
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
fsubmit.addEventListener('submit',async function(e){
    e.preventDefault();
    var files=document.getElementById("file");
    var data=Array();
    for(let i=0;i<files.files.length;i++)
    {
        var dcode
     var result= await toBase64(files.files[0]).catch((suc)=>console.log(suc));
    console.log(result);
        console.log(dcode);
        let data1={"filename":files.files[i].name,"filecontent":result,"owner":localStorage.getItem("email"),"sharedusers":[]};
        data.push(data1);
    }
    var fdata={data:data};
    console.log(fdata);
    fetch("http://localhost:4001/upload",{
        method:"POST",
        body:JSON.stringify(fdata),
        headers: {                              
            "Content-Type": "application/json"  
          }
    }).then(res=>res.json())
    .then(j=>console.log(j));
});
function upload()
{
    
var data=Array();

//var data={"filename":file.files[0].name,"owner":"pravesh","sharedusers":[]}
console.log(data);
var fdata={"data":data};
fdata=JSON.stringify(fdata);
console.log(fdata);
fetch('http://localhost:4001/uploadEnt',{
    method:'POST',
    body:fdata,
    headers: {                              
        "Content-Type": "application/json"  
      }  
})
.then(res=>res.json())
.then(suc=>console.log(suc));
}