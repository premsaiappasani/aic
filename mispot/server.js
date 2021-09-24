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

let stack = [],stk2 = [];


app.set('view engine', 'ejs');

app.post("/api",(req,res)=>{
    let t;
    let data=req.body;
    console.log(data);
    let ky = data.key;
    let brcode = data.barcode;
    do{
        t = Math.floor(Math.random()*10000);
    }while(stack.findIndex(function (element) {
        return element == t;})!=-1)
    stack.push(t);
    stk2.push({});
    read("API_KEY",ky,t);
    let url = 'http://localhost:8080/verify/'+t;
    res.send(url);
});


app.get("/verify/:random",(req,res)=>{
    res.render('barcode');
});


app.get("/success",(req,res)=>{
    console.log("Verification Success");
    res.sendFile(__dirname+"#");
});

app.use(express.static('public'));


app.listen(8080,()=>{
    console.log("Listening");
});