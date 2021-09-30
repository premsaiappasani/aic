//jshint esversion:6

const express = require("express");
const app = express();
const axios = require('axios');
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

let arr=[0,0,0,0];
let brr=['','','',''];
let str='';
let ver=0;

app.get('/products',(req,res)=>{
    console.log(str);
    res.render('products',{arr,brr,aig:reqs,str});
});

app.get('/verify/:number',(req,res)=>{
    let num=req.params.number;
    console.log('pst request came');
    changeUrl(num);
    console.log(reqs);
    console.log("ended");
    res.redirect('http://localhost:3000/temp');
});
var reqs = undefined;
app.get('/temp',(req,res)=>{
    console.log(reqs);
    res.render('temp',{reqs});
});
app.get('/fetch',(req,res)=>{
    res.send(reqs);
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
      }
var bar = '6456461645';
var ky = '123456';
var obj = 'bottle';
var urlp = 'http://localhost:3000/products';
var orderId = '44725373';
function changeUrl(num){
    // update bar and object using database
    // bar = '';
    if(num==0){
        bar='';
    }
    else{
        bar='6456461645';
    }
    changeUrl2();
}

function changeUrl2(){
    let data={barcode:bar,object:obj,key:ky,redUrl:urlp,order:orderId};
    axios.post('http://localhost:8080/api/', data)
    .then((resp) => {
        console.log(resp,'\n1\n2\n3\n');
        reqs=resp.data;
        console.log('new',reqs);
        // res.redirect(ul);
    }).catch((err) => {
        console.log(err);
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

app.post('/api',(req,res)=>{
    let obj = req.body.object;
    let id = req.body.orderId;
    str=req.body.image;
    console.log(req.body);
    if(req.body.ver==1){
        arr[0]=1;
    };
    console.log(obj,id);
})

app.use(express.static('public'));
