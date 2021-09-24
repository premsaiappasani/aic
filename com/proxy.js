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
    res.render('products',{arr,brr,aig:reqs});
});

app.get('/verify/:number',(req,res)=>{
    console.log('pst request came');
    changeUrl();
    console.log(reqs);
    console.log("ended");
    res.render('temp',{reqs});
});
var reqs = undefined;

app.get('/fetch',(req,res)=>{
    res.send(reqs);
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
      }


function changeUrl(){
    let data={barcode:'6456461645',key:'123456'};
    axios.post('http://localhost:8080/api/', data)
    .then((resp) => {
        // console.log(resp,'\n1\n2\n3\n');
        reqs=resp.body;
        console.log('new',reqs);
        // res.redirect(ul);
    }).catch((err) => {
        // console.log(err);
        reqs ='failed';
    });
}
app.get('/newUrl/',(req,res)=>{
    if(reqs=='failed'){
        res.send('error');
    }
    else if(reqs!=undefined){
        res.send(reqs);
    }
    else{
        res.send(1);
    }
})


app.set('view engine', 'ejs');


app.listen(3000,()=>{
    console.log("Hello World");
});