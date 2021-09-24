const express = require("express");

const app = express();

const Joi = require("joi");

app.use(express.json());

function newKey(){
    let ky=Math.random();
    for(let i=0;i<10;i++){
        ky*=10;
        ky+=Math.random();
    }
    if(ky>10000000000){
        ky/=10;
    }
    else if(ky<1000000000){
        ky*=10;
    }
    return Math.floor(ky);
}
app.use(express.urlencoded({
  extended: true
}));

const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://database:accenture25k@cluster0.lqmlj.mongodb.net/companyApis?retryWrites=true&w=majority";
const dbName = 'Cluster0';
const assert = require('assert');
const client = new MongoClient(uri);
const db = client.db(dbName);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
    }

client.connect(err=>{
    assert.equal(null, err);
    console.log("Connected successfully to the server")});

async function delayedGreeting() {
    console.log("Connecting to server");
    await sleep(1);
  }
delayedGreeting();

app.get("/login",(req,res)=>{
    console.log("login page")
    res.render("login");
})
 
app.post("/login", async(req, res)=>{
    try{
     const user = req.body.username;   
     const pass = req.body.password;
     const collection = db.collection("PROFILES");
     const company = await collection.findOne({username:user});
     console.log(company);
     if (pass==(company.password))
     {
         console.log("data exists");
         const ca = db.collection("API_INFORMATION");
         let call = await ca.findOne({COMPANY:"AMAZON"});
         let calls = call.API_CALLS;
         let pricing = call.PRICING;
         let key = call.API_KEY;
         res.render("dashboard",{calls,pricing,key});
     }
     else
     {
         console.log('incorrect');
         res.send("INCORRECT PASSWORD");
     }
     }
     catch(error){
         res.status(400).send("Invalid email");

    }
})
function read(attr,val,inde)
 {
     const findDocuments = function(db){
         const collection = db.collection("API_INFORMATION")
         collection.find({
             [attr]:val
           }).toArray(function(err, docs) {
             assert.equal(err, null);
             console.log("Found the following records");
             console.log(docs);
             stk2[stack.findIndex(function (element) {
        return element == inde;})]=docs;
           })
     }
     findDocuments(db);
 }

let stack = [],stk2 = [],stk3 = [];


app.set('view engine', 'ejs');

app.post("/api",(req,res)=>{
    let t;
    let data=req.body;
    let ky = data.key;
    let brcode = data.barcode;
    do{
        t = Math.floor(Math.random()*10000);
    }while(stack.findIndex(function (element) {
        return element == t;})!=-1)
    stack.push(t);
    stk2.push({});
    stk3.push(brcode);
    read("API_KEY",ky,t);
    let url = 'http://localhost:8080/verify/'+t;
    res.send(url);
});


app.get("/verify/:random",(req,res)=>{
    let tid = req.params.random;
    console.log(tid);
    console.log("abv");
    res.render('barcode',{tid});
});


app.get("/success",(req,res)=>{
    console.log("Verification Success");
    res.sendFile(__dirname+"#");
});

app.use(express.static('public'));
app.get("/barcodedata/:tidd",(req,res)=>{
    let tid = req.params.tidd;
    let hell = stack.findIndex( (eleme)=> { return eleme == tid;});
    let ado = stk3[hell];
    res.json({ado});
});

app.listen(8080,()=>{
    console.log("Listening");
});