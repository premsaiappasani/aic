const express = require("express");

const app = express();

const Joi = require("joi");

const axios = require('axios');
const myParser = require("body-parser");

app.use(express.json());
app.use(myParser.text({ limit: '200mb' }));
app.use(myParser.json({limit: '200mb'}));

//express
//joi
//axios


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
     const collection = db.collection("API_INFORMATION");
     const company = await collection.findOne({username:user});
     console.log(company);
     if (pass==(company.password))
     {
         console.log("data exists");
         const ca = db.collection("API_INFORMATION");
         let call = await ca.findOne({username:user});
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
         res.status(400).send("Invalid username");

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

let stack = [],stk2 = [],stk3 = [],stk4 = [],stk5 = [];


app.set('view engine', 'ejs');

app.post("/api",(req,res)=>{
    let t;
    let data = req.body;
    let ky = data.key;
    let obj = data.object;
    let brcode = data.barcode;
    let urlp = data.redUrl;
    let oId = data.order;
    let url = 'undefined';
    do{
        t = Math.floor(Math.random()*10000);
    }while(stack.findIndex(function (element) {
        return element == t;})!=-1)
    if(stk5.findIndex(function (element) {
        return element == oId;})==-1){
        
        stk5.push(oId);
        stack.push(t);
        stk2.push({});
        stk4.push(urlp);
        const coll = db.collection("API_INFORMATION")
        coll.updateOne({"username":"BigBazaar"},
        {
            $push:{
            "barcode":{
                        "PRODUCT_ID":oId,
                        "ITEM":obj,
                        "CODE":brcode,
                        }
                    }
        })
        if(brcode != '') stk3.push(brcode);
        else stk3.push(obj);
        console.log(stk3);
        read("API_KEY",ky,t);
        console.log(t,'t is here');
        if(brcode != '') url = 'http://localhost:8080/verify/barcode/'+t;
        else url = 'http://localhost:8080/verify/obj/'+t
    }
    else{
        if(brcode != '') url = 'http://localhost:8080/verify/barcode/'+stack[stk5.findIndex(function (element) {
        return element == oId;})];
        else url = 'http://localhost:8080/verify/obj/'+stack[stk5.findIndex(function (element) {
        return element == oId;})];
    }
    res.send(url);
});

app.get("/verify/obj/:random",(req,res)=>{
    let tid = req.params.random;
    console.log(tid,'verifyhere');
    res.render('objectdtct',{tid});

})
app.get("/verify/barcode/:random",(req,res)=>{
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
    let tid = req.params.tidd;    console.log(tid);
    let hell = stack.findIndex( (eleme)=> { return eleme == tid;});
    let ado = stk3[hell];
    console.log(hell);
    console.log(stk3);
    console.log(ado);
    let pre = stk4[hell];
    console.log(pre,'preishere');
    var passObj = {ado,pre};
    res.json(passObj);
});

app.post('/notverified/:stat',(req,res)=>{
    let state  = req.params.stat;
    console.log(req.body);
    let urlpr = stk4[stack.findIndex(function (element) {
        return element == state;})];
    sendOk(state);
    let a = urlpr;
    res.render("redirect",{a});

})

app.post('/status/:sta',(req,res)=>{
    console.log(req.body);
    let time=req.body.t;
    let accuracy=req.body.h;
    let image = req.body.img;
    console.log(time,accuracy);
    let ge   = req.params.sta;
    let urlpr = stk4[stack.findIndex(function (element) {
        return element == ge;})];
    sendOk(ge);
    let a = urlpr;
    res.render("redirect",{a});
})
function sendOk(ge){
    let obt1 = stk3[stack.findIndex(function (element) {
        return element == ge;})];
    let oid1 = stk5[stack.findIndex(function (element) {
        return element == ge;})];
    console.log(oid1,'returning to companh about status');
    let data={object: obt1,orderId:oid1};
    axios.post('http://localhost:3000/api/', data)
    .then((resp) => {       
        reqs=resp.data;
        console.log('new',reqs);
        // res.redirect(ul);
    }).catch((err) => {
        console.log(err);
        reqs ='failed';
    });
    dele(ge);
}


app.get('/home',(req,res)=>{
    res.render("home");
});

app.get('/signup',(req,res)=>{
    res.render('signup');
});


app.post("/signup", async (req, res)=>{
    try{
    const user = req.body.companyname;   
    const pass = req.body.password;
    const price = req.body.pricing;
    const mail = req.body.email;
    const collection = await db.collection("API_INFORMATION");
    const company = await collection.findOne({username:user});
    if(company!=null){
         res.status(400).send("username exists.. try another<a href=`http://localhost:8080/login`></a>");
    }
    else{
        collection.insertOne({
            "username":user,
            "password":pass,
            "pricing":price,
            "mail":mail,
            "barcode":[],
           });
           res.redirect('http://localhost:8080/login');
        }
    }
    catch(e){
        console.log(e);
        res.status(500).send("something went wrong. It's not you. It's us.");
    }
});


function dele(ge){
    var del = stack.findIndex(function (element) {
        return element == ge;});
    stack.slice(del,1);
    stk5.slice(del,1)
    stk4.slice(del,1)
    stk3.slice(del,1)
    stk2.slice(del,1)
    
}
app.listen(8080,()=>{
    console.log("Listening");
});

