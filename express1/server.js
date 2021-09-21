//jshint esversion:6

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get("/",(req,res)=>{
    console.log("req recieved");
    res.sendFile(__dirname+"/index.html");
});


app.get("/coco", (req,res)=>{
    res.sendFile(__dirname+"/app.html");
});

app.get('/verify',(req,res)=>{
    res.sendFile(__dirname+"/index2.html");
});
/*
app.post("/", (req,res)=>{
    let n1= parseInt(req.body.n1);
    let n2= parseInt(req.body.n2);
    let n3=(n1/n2);
    n3/=n2;
    n3*=10000;
    n3=n3.toFixed(3);
    console.log(n3);
    res.send("BMI "+n3);
});
*/
app.listen(3000,()=>{
    console.log("Hello World")
});