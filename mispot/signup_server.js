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


app.get("/signup",(req,res)=>{
    console.log("sign up")
    res.render("signup");
})
 
app.post("/signup", (req, res)=>{
    try{
     const user = req.body.companyname;   
     const pass = req.body.password;
     const price = req.body.pricing;
     const mail = req.body.email;
     const collection = db.collection("API_INFORMATION");
     console.log(pass);
     collection.insertOne({
         "username":user,
         "password":pass,
         "pricing":price,
         "mail":mail,
         "barcode":[],
        });
  
     }
     catch(error){
         res.status(400).send("Invalid email");

    }
})

app.listen(4500,()=>{
    console.log("Listening");
});
