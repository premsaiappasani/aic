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

app.post('/verify/:number',(req,res)=>{
    console.log('pst request came');
    changeUrl();
    reqs = undefined;
    console.log("ended");
    res.send('redirecting....<%=aig%><script> setInterval(,100);\
        function fst(){\
        console.log("rinaog");\
        var ag = document.getElementById('pagereq').innerHTML;\
        if(ag == 'failed') console.log("fiale");\
        else if(ag != 'undefined') {\
          location.replace(ag);\
        }\
      }</script>')
});
var reqs = undefined;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
      }

function changeUrl(){
    let data={barcode:'6456461645',key:'123456'};
    axios.post('http://localhost:8080/api/', data)
    .then((resp) => {
        // console.log(resp,'\n1\n2\n3\n');
        reqs=resp.body;
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