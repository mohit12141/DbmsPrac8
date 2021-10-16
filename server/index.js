const express=require('express')
const cors=require('cors');
const file=require('./config');
const bodyp=require('body-parser');
const app=express();
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
//app.use(bodyp.json());
app.use(cors());
app.listen(4001,()=>console.log('4001'));

//post--ADD
//get---fetch
//put ---Update
//url/path


app.post('/uploadFile',upload.single('myimg'),async(req,res,next)=>{
    if(req.file)
    {
        const pathname=req.file.fieldname;
        res.send(pathname);
    }
})
app.post('/createFile',(req,res)=>{
    console.log(req.body);
    var data=req.body;
    console.log(data);
    file.add(data);
    res.send({msg:'done'});
});
app.get('/getFiles',async(req,res)=>{
    var name=req.body.name;
    var snapshot=await file.where('users','array-contains',name).get();
    var list=snapshot.docs.map((doc)=>({id:doc.id,...doc.data()}));
    res.send(list);
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