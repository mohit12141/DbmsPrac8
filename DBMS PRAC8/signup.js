var sform=document.getElementById("sform");
sform.addEventListener('submit',(e)=>{
    e.preventDefault();
    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
    var data={email:email,password:password};
    //var fdata={data:data};
   // console.log(JSON.stringify(fdata));
    //console.log(email,pass);
    fetch("http://localhost:4001/signUp",{
        method:"post",
        body:JSON.stringify(data),
        headers:{"Content-Type": "application/json" }
    }).then(res=>res.json())
    .then(j=>console.log(j)).catch(e=>console.error(e));
});
