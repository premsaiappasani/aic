//jshint esversion:6

const express = require("express");
const app = express();
const axios = require('axios');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.get('/products',(req,res)=>{
    let arr=[0,0,0,0];
    let brr=['','','',''];
    res.render('products',{arr,brr});
});


app.get('/verify/0',(req,res)=>{
    data={teja:"goodboi"};
    let obj={url:'http://localhost:3000/products'};
    axios.post('http://localhost:8080/verify/', data)
    .then(resp => {
        obj.url=resp.data;
        res.render('redirect',obj);
    }).catch((err) => {
        console.log("FAILED");
    });
});











app.set('view engine', 'ejs');


app.listen(3000,()=>{
    console.log("Hello World");
});