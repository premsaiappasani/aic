//jshint esversion:6
const express = require("express");

const app = express();

const Joi = require("joi");

app.use(express.json());

// let gi=0;
function newKey(){
    let ky=Math.random();
    for(let i=0;i<10;i++){
        ky*=10;
        ky+=Math.random();
    }
    if(key>10000000000){
        ky/=10;
    }
    else if(key<1000000000){
        ky*=10;
    }
    return Math.floor(ky);
}

app.use(express.urlencoded({
  extended: true
}));

let array=[];


const {
    MongoClient
  } = require('mongodb');
  const assert = require('assert');
  const uri = "mongodb+srv://database:accenture25k@cluster0.lqmlj.mongodb.net/companyApis?retryWrites=true&w=majority";
  const dbName = 'Cluster0';
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  function read(attr,val){
    client.connect(err => {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      const collection = client.db("Cluster0").collection("API_INFORMATION");
      const db = client.db(dbName);
      findDocuments(db, function() {
        client.close();
      });
    });
    const findDocuments = function(db, callback) {
      const collection = db.collection('API_INFORMATION');
      collection.find({
        [attr]:val
      }).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        array=docs;
        callback(docs);
      });
    }
  }





























let arr=[0,0,0,0];
let brr=['bottle','book','teddy bear','backpack'];
let crr=[-1,-1,-1,-1];
app.set('view engine', 'ejs');


app.get("/home",(req,res)=>{
    res.render('profile');
});


app.get("/products",(req,res)=>{
    console.log("req recieved");
    let obj={arr,brr,gi};
    res.render("products",obj);
});

/*
app.post("/verify/:tagid",(req,res)=>{
    let id=req.params.tagid;
    arr[id]=1;
    let score=parseInt(req.body.score);
    brr[id]=score;
    crr[id]=1;
    gi=crr[0]+crr[1]+crr[2]+crr[3];
    gi*=5;
    gi/=4;
    gi+=5;
    res.redirect('http://localhost:8080/products/');
});

*/

app.post("/verify",(req,res)=>{
    let data=req.body;
    console.log(data);
    let key = data.key;
    read("API_KEY",key);
    console.log(array);
    if(array.length===0) {
        console.log("Nope");
        //res.status(404).send("Invalid Key");
        //return;
    }
    console.log(array);
    let url=`http://localhost:8080/verify/`;
    res.send(url);
});


app.get("/verify/:tagid",(req,res)=>{
    let id=req.params.tagid;
    let id2=parseInt(id);
    let str=brr[id2];
    crr[id2]=0;
    gi=crr[0]+crr[1]+crr[2]+crr[3];
    gi*=5;
    gi/=4;
    gi+=5;
    let obj={id,str,gi};
    res.render('barcode',obj);
});


app.get("/success",(req,res)=>{
    console.log("Verification Success");
    res.sendFile(__dirname+"#");
});

app.get("/",(req,res)=>{
    res.send(`Code: ${newKey()}${newKey()}`);
})


app.use(express.static('public'));


app.listen(8080,()=>{
    console.log("Listening");
});