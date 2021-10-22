//jshint esversion:6

const http = require('http')
const express = require("express");
const app = express();
const axios = require('axios');
// app.use(express.json());
// app.use(express.urlencoded({
//   extended: true
// }));
app.use(express.text({
    limit:'200mb',
  }));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
 
var cors = require('cors');

app.use(cors()) ;
let arr=[0,0,0,0];
let brr=['','','',''];
let str='';
let str2='';
let ver=0;

app.get('/products',(req,res)=>{
    console.log(str);
    res.render('products',{arr,brr,aig:reqs,str,str2});
});

app.get('/verify/:number',(req,res)=>{
    let num=req.params.number;
    changeUrl(num);
    console.log(num,'requested number');
    res.redirect('http://localhost:3000/temp');
});
var reqs = undefined;
app.get('/temp',(req,res)=>{
    console.log(reqs);
    res.render('temp',{reqs});
    reqs = undefined;
});
app.get('/fetch',(req,res)=>{
    res.send(reqs);
    reqs = undefined;
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
      }
var bar = '9789311126128';
var obj = 'bottle';
var urlp = 'http://localhost:3000/products';
var orderId = 1;
function changeUrl(num){
    // update bar and object using database
    // bar = '';
    if(Dirto[arrpro.findIndex((argu)=>{return argu === objlist[num]})] == 1){
        bar='9789311126128';
        obj = 'book';
    }
    else{
        obj = objlist[num];
        bar = '';
    }
    orderId++;
    changeUrl2(num);
}

var arrpro = ['book', 'bottle', 'backpack', 'teddy'];
var arrprosrc = ['book.jpg', 'bottle.jfif', 'backpack.jpg', 'teddy.jpg'];
var Dirto = [1,0,0,0];
var verimage = [];
var objlist = [];
var objsrc = [];
var objver = [];
var objid = [];
var pers = [];
var ky=5001;
app.get('/productdata',(req,res)=>{
    var sending = {objlist,objsrc,objver,objid,verimage,pers};
    res.json(sending);
});

app.get('/neworder/:num',(req,res)=>{
    var numbe = req.params.num;
    numbe = parseInt(numbe);
    objlist.push(arrpro[numbe]);
    objsrc.push(arrprosrc[numbe]);
    objver.push(0);
    objid.push(ky);
    ky++;
    var se = {ky};
    res.json(se);
});


function changeUrl2(num){
    // let data={barcode:bar,object:obj,key:ky,redUrl:urlp,order:orderId};
    // axios.post('http://localhost:8080/api/', data)
    // .then((resp) => {
    //     console.log(resp,'\n1\n2\n3\n');
    //     reqs=resp.data;
    //     console.log('new',reqs);
    //     // res.redirect(ul);
    // }).catch((err) => {
    //     console.log(err);
    //     reqs ='failed';
    // });

var data = JSON.stringify({
  key : 1234567890,
  redUrl : 'http://localhost:3000/api',
  object : obj,
  order : objid[num],
  seller : '100-201',
  product : '213-4589',
  barcode : bar,
  sellerUrl : 'http://localhost:3000/products'
  })

const options = {
  host: 'localhost',
  port: '8080',
  method: 'POST',
  path: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

const req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
    reqs=d;
  })
})

req.on('error', error => {
  console.error(error)
})

req.write(data)
req.end()
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

app.get('/examplee.com',(req,res)=>{
    res.render('examplee.ejs');
})

app.listen(3000,()=>{
    console.log("Hello World");
});
app.post('/api',(req,res)=>{
    let obj = req.body.object;
    let id = req.body.orderId;
    let percent = req.body.percent;
    let time= req.body.time;
    let needish = req.body.ver;
    let index = objid.findIndex(function (element) {
        return element == id;});
    console.log(id,objid);
    console.log(req.body.image);
    console.log(needish);
    if (needish===1){
        console.log("needish done",index);
        objver[index]=1;
        verimage[index]=req.body.image;
        pers[index]=percent;
    }
    // if(req.body.ver==1){
    //     if(obj === '9189382142353'){
    //         arr[1]=1;
    //         str2 = req.body.image;
    //         console.log(str2,time);
    //     }
    //     else{
    //         arr[0]=1;
    //         brr[0]=percent;
    //         str=req.body.image;
    //     }
    // };
    console.log(obj,id);
})

app.use(express.static('public'));
