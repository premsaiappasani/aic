const express = require("express");

const app = express();

const Joi = require("joi");

const axios = require('axios');
var cors = require('cors');
var path = require('path');
app.use(cors())
let NewOID=""
let BARcodE=""
let NEWobj=""
let newBarcodeByDynamosoft=[]
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

    return Math.floor(ky) + "" ;
}
// app.use(express.urlencoded({
//   extended: true,
// }));

app.use(express.text({
    limit:'200mb',
  }));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
  
let ver=0;

const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://database:accenture25k@cluster0.lqmlj.mongodb.net/Cluster0?retryWrites=true&w=majority";
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

app.get('/wasm', function(req, res){
    var options = {
        root: path.join(__dirname)
    };
    console.log(options);
    var fileName = 'datasymbol-sdk.wasm';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});






app.post("/login", async(req, res)=>{
    try{
     const user = req.body.companyname;   
     const pass = req.body.password;
     const collection = db.collection("API_INFORMATION");
     const company = await collection.findOne({company:user});
     console.log(company);
     if (pass==(company.password))
     {
         console.log("data exists");
         const ca = db.collection("API_INFORMATION");
         let call = await ca.findOne({company:user});
         let calls = call.api_calls;
         let pricing = call.pricing;
         let key = call.api_key;
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

let stack = [],stk2 = [],stk3 = [],stk4 = [],stk5 = [],stk6 = [],stk7 = [];


app.set('view engine', 'ejs');

app.post("/api",async(req,res)=>{
    ver=0;
    let t;
    let data = req.body;
    let ky = data.key;
    let obj = data.object;
    let brcode = data.barcode;
    BARcodE=brcode
    let urlp = data.redUrl;
    console.log(urlp,"urlp");
    let oId = data.order;
    let notV = data.notVerified;
    NewOID=oId;
    NEWobj=obj
    let urlofprod = data.sellerUrl;
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
        stk4.push(urlofprod);
        stk6.push(urlp);
        stk7.push(notV);
        console.log("stk6",stk6);
        const coll = await db.collection("API_INFORMATION");
        const up = coll.updateOne({company:"amazon"},
        {
            $push:{
            barcode:{
                        "PRODUCT_ID":oId,
                        "ITEM":obj,
                        "CODE":brcode,
                        }
                    }
        })
        console.log(up);
        console.log("barcode");
        if(brcode != '') {stk3.push(brcode);
            newBarcodeByDynamosoft.push(brcode);}
        else stk3.push(obj);
        console.log(stk3,"stk3");
        console.log(newBarcodeByDynamosoft);
        read("API_KEY",ky,t);
        console.log(t,'t is here');
        if(brcode != '') url = 'https://mismatchesspotted.el.r.appspot.com/verify/barcode/'+t;
        else url = 'https://mismatchesspotted.el.r.appspot.com/verify/obj/'+t
    }
    else{
        if(brcode != '') url = 'https://mismatchesspotted.el.r.appspot.com/verify/barcode/'+stack[stk5.findIndex(function (element) {
        return element == oId;})];
        else url = 'https://mismatchesspotted.el.r.appspot.com/verify/obj/'+stack[stk5.findIndex(function (element) {
        return element == oId;})];
    }
    res.send(url);
});


app.get("/verify/obj/:random",async (req,res)=>{
    let tid = req.params.random;
    console.log(tid,'verifyhere');
    coll = await db.collection("API_INFORMATION");
    coll.updateOne({"company":"amazon"},
        {
            $inc:{
                    "api_calls":1
                }
        })
    res.render('objectdtct',{tid});

})
app.get("/verify/barcode/:random",(req,res)=>{
    let tid = req.params.random;
    console.log(tid);
    console.log("abv");
    console.log(newBarcodeByDynamosoft);
    let passingbarcodeNum=newBarcodeByDynamosoft.slice(-1)[0];
    res.render('barcode',{tid,passingbarcodeNum});
});


app.get("/success",(req,res)=>{
    console.log("Verification Success");
    res.sendFile(__dirname+"#");
});

app.get("/pricing",(req,res)=>{
    res.render("pricing");
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

app.post('/notverified/:stat',async(req,res)=>{
    ver=0;
    let state  = req.params.stat;
    console.log(req.body);
    let urlpr = stk4[stack.findIndex(function (element) {
        return element == state;})];

    let nov = 0;
    let non = 0;
    sendOk(0,state,req.body.img,0,0,nov,non);
    let a = urlpr;
    coll = await db.collection("API_INFORMATION");
    coll.updateOne({"company":"amazon"},
        {
            $push:{
                "product_information":{
                            "PRODUCT_ID":NewOID,
                            "ITEM":NEWobj,
                            "img":image,
                             "status":"Not Verified"
                            }
                        }
        })

    res.send(a);
})


app.post('/status/:sta',async (req,res)=>{
    console.log("called ..........");
    ver=1;
    let datt=JSON.parse(req.body);
    let time=datt.t;
    let accuracy=datt.h;
    let image = datt.img;
    console.log(time,accuracy);
    let ge   = req.params.sta;
    const coll = await db.collection("API_INFORMATION");
    const up = coll.updateOne({"company":"amazon"},
    {
        $push:{
        "product_information":{
                    "PRODUCT_ID":NewOID,
                    "ITEM":NEWobj,
                    "img":image,
                     "status":"Verified"
                    }
                }
    })
    let urlpr = stk4[stack.findIndex(function (element) {
        return element == ge;})];
    let nov = 0;
    let non = 0;
    const vp = await coll.aggregate([{$match:{company:"amazon"}},{$unwind:"$product_information"},{$match:{"product_information.status":"Verified"}},{$count:"total"}])
    const nvp = await coll.aggregate([{$match:{company:"amazon"}},{$unwind:"$product_information"},{$match:{"product_information.status":"Not Verified"}},{$count:"total"}]);
    let nov = 0;
    let non = 0;
    for await (const doc of vp) {
        nov = doc.total;
    }
    for await (const docx of nvp) {
        non = docx.total;
    }
    console.log(nov,non);
    sendOk(1,ge,image,time,accuracy,nov,non);
    let a = urlpr;
    res.send(a);
})

app.post('/statu/:sta',async (req,res)=>{
    ver=1;
    let datt2=JSON.parse(req.body);
    console.log(datt2);
    let image = datt2.img;
    let time= datt2.time;
    let ge   = req.params.sta;
    console.log('ge',ge);
    const coll = await db.collection("API_INFORMATION");
    const up = coll.updateOne({"company":"amazon"},
    {
        $push:{
        "product_information":{
                    "PRODUCT_ID":NewOID,
                    "ITEM":NEWobj,
                    "barcode":BARcodE,
                    "img":image,
                    "status":"Verified"
                    }
                }
    })
    let urlpr = stk4[stack.findIndex(function (element) {
        return element == ge;})];
    const vp = await coll.aggregate([{$match:{company:"amazon"}},{$unwind:"$product_information"},{$match:{"product_information.status":"Verified"}},{$count:"total"}])
    const nvp = await coll.aggregate([{$match:{company:"amazon"}},{$unwind:"$product_information"},{$match:{"product_information.status":"Not Verified"}},{$count:"total"}]);
    let nov = 0;
    let non = 0;
    for await (const doc of vp) {
        nov = doc.total;
    }
    for await (const docx of nvp) {
        non = docx.total;
    }
    console.log(nov,non);
    // console.log(nov,non);
    sendOk(1,ge,image,time,100,nov,non);
    let a = urlpr;
    res.send(a);
})

function sendOk(ve,ge,image,time,p,nov,non){
    let obt1 = stk3[stack.findIndex(function (element) {
        return element == ge;})];
    let oid1 = stk5[stack.findIndex(function (element) {
        return element == ge;})];
    let reUrl =stk6[stack.findIndex(function (element) {
        return element == ge;})];
    console.log('reurl',reUrl);
    let ret = stk7[stack.findIndex(function (element) {
        return element == ge;})];
    let gi = 0.5*nov+0.2*non-0.6*ret;
    if(gi<0) gi = 0;
    gi = gi/(20+0.5*ret);
    gi = -gi;
    gi = Math.exp(gi) * 20 - 10;
    gi = gi.toFixed(2);
    console.log(oid1,'returning to company about status');
    ver = ve;
    let data={object: obt1,orderId:oid1,time,image,ver,percent:p,genuinity_seller:gi};
    axios.post(reUrl, data)
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


app.get('/start',(req,res)=>{
    res.render('start');
});

app.get('/signup',(req,res)=>{
    res.render('pricing')
});

app.get('/signup/:pln',(req,res)=>{
    let plnn=req.params.pln;
    let pln=0;
    if(plnn==1){
        pln=0;
    }
    else if(plnn==2){
        pln=1000;
    }
    else if(plnn==3){
        pln=10000;
    }
    res.render('signup',{pln});
});


app.post("/signup/:pln", async (req, res)=>{
    try{
        let plnn=req.params.pln;
        let pln=0;
        if(plnn==1){
            pln=0;
        }
        else if(plnn==2){
            pln=1000;
        }
        else if(plnn==3){
            pln=10000;
        }
    const user = req.body.companyname;   
    const pass = req.body.password;
    const mail = req.body.email;
    let keyy= newKey();
    console.log(keyy);
    const collection = await db.collection("API_INFORMATION");
    const company = await collection.findOne({company:user});
    const sg=await collection.countDocuments();
    console.log(sg);
    if(company!=null){
         res.status(400).send("username exists.. try another<a href=`https://mismatchesspotted.el.r.appspot.com/login`></a>");
    }
    else{
        collection.insertOne({
            "company":user,
            "password":pass,
            "pricing":pln,
            "mail":mail,
            "api_key": keyy,
            "api_calls":0,
            "product_information":[]
           });
           res.redirect('https://mismatchesspotted.el.r.appspot.com/login');
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
app.listen(process.env.PORT || 8080,()=>{
    console.log("Listening");
});

