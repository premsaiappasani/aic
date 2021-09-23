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


app.get('/verify/:number',(req,res)=>{
    data={barcode:'6456461645',key:'123456'};
    axios.post('http://localhost:8080/api/', data)
    .then((resp) => {
        console.log(resp,'\n1\n2\n3\n');
        let ul=resp.body;
        res.redirect(ul);
    }).catch((err) => {
        console.log(err);
        res.send("Failed");
    });
});











app.set('view engine', 'ejs');


app.listen(3000,()=>{
    console.log("Hello World");
});