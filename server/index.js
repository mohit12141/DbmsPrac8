const express=require('express')
const fs=require('fs');
const cors=require('cors');
const firebase=require('./config');
const db=firebase.firestore();
var file=db.collection('docs');
var users=db.collection('users');
const bodyp=require('body-parser');
const app=express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept');
    next();
  });
var multer=require('multer');
var storage=multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'./images');
    },
    filename:function(req,file,callback)
    {
        callback(null,file.originalname);
    }
})
var upload=multer({
    storage:storage,
    fileFilter:null
});
app.use(bodyp.json({limit:"100mb"}));
//app.use(cors());
app.listen(4001,()=>console.log('4001'));

//post--ADD
//get---fetch
//put ---Update
//url/path

app.post('/signUp',async (req,res)=>{
    console.log(req.body);
    var data=req.body;
    console.log(data);
    users.add(data);
    res.send("USER ADDED");
});
app.post('/signIn',async (req,res)=>{
    var data=req.body;
    console.log(data);
    var snapshot=await users.where('email','==',data.data.email).get();
   // res.send(snapshot);
    var list=snapshot.docs.map((doc)=>({id:doc.id,...doc.data()}));
    list.forEach((d)=>{
        if(d.password==data.data.password)
        {
            res.send({msg:"VERIFIED"});
        }
    })
    res.send({msg:"INVALID USER"});
})
app.post('/upload',async(req,res)=>{
    //console.log("here bro");
    var data=req.body;
    //console.log(data);
    data.data.forEach((d)=>{
        let buffer=Buffer.from(d.filecontent.split(',')[1],'base64');
        fs.writeFileSync("./images/"+d.filename,buffer);
        var da={filename:d.filename,owner:d.owner,sharedusers:[]};
        file.add(da);
    }
    )
    res.send({msg:"OKAY"});
})

app.get('/download/:name',(req,res)=>{

    filepath='./images/'+req.params.name;
    res.download(filepath);
})
app.post("/getMyFiles",async(req,res)=>{
    var name=req.body.name;
    var snapshot=await file.where('owner','==',name).get();
    var list=snapshot.docs.map((doc)=>({id:doc.id,...doc.data()}));
    res.send(list);
})
app.post('/getFiles',async(req,res)=>{
    var name=req.body.name;
    var snapshot=await file.where('sharedusers','array-contains',name).get();
    var list=snapshot.docs.map((doc)=>({id:doc.id,...doc.data()}));
    res.send(list);
})
app.post('/addUser',async(req,res)=>{
    var data=req.body;
    var sharedusers;
    await file.doc(data.id).get().then(q=>{
        console.log(q.data().sharedusers);
        sharedusers=q.data().sharedusers;
        sharedusers.push(data.username);
    })
    console.log(sharedusers);
    var doc=await file.doc(data.id).update({sharedusers:sharedusers})
    res.send("done");
})
app.get('/getfile',async(req,res)=>{
    console.log("here");
    var snapshot=await file.get();
    console.log(snapshot.docs);
    var list=snapshot.docs.map((doc)=>({id:doc.id,...doc.data()}));

    //console.log(data);
    res.send(list);
    //res.send("HELLO");
})