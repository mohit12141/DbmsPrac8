var sform=document.getElementById("sform");
sform.addEventListener('submit',(e)=>{
    e.preventDefault();
    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
    var data={email:email,password:password};
    var fdata={data:data};
    //console.log(email,pass);
    fetch("http://localhost:4001/signIn",{
        method:"post",
        body:JSON.stringify(fdata),
        headers:{"Content-Type": "application/json"} 

    }).then(res=>res.json())
    .then(j=>{
        console.log(j.msg)
        if(j.msg == 'VERIFIED'){
            var name = //value
            localStorage.setItem("id",name);
            location.replace("home.html");
        }
        else{
            window.alert("Wrong credentials");
            
        }
    }).catch(e=>console.error(e));
});
