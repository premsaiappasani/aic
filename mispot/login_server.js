var express = require("express");
var app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs');

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

app.listen(4500,()=>{
    console.log("Listening");
});
