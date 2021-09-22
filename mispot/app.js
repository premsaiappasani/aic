const {
  MongoClient
} = require('mongodb');
const assert = require('assert');
const uri = "mongodb+srv://database:accenture25k@cluster0.lqmlj.mongodb.net/companyApis?retryWrites=true&w=majority";
const dbName = 'Cluster0';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

function Add(id,name,apiKey,pricing,apiCalls,barcode){
  client.connect(err => {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const collection = client.db("Cluster0").collection("API_INFORMATION");
    const db = client.db(dbName);
    insertDocument(db, function() {
      client.close();
    });
  });
  var insertDocument = function(db, callback) {
    var collection = db.collection('API_INFORMATION');
    collection.insertOne({
      _id : id,
      COMPANY : name,
      API_KEY:apiKey,
      PRICING:pricing,
      API_CALLS:apiCalls,
      BARCODE:[]
    }, function(err, result) {
      assert.equal(err, null);
      console.log("Insertion successful");
      callback(result);
    });
  }
}

function read(attr,val){
  client.connect(err => {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const collection = client.db("Cluster0").collection("API_INFORMATION");
    const db = client.db(dbName);
    findDocuments(db, function() {
      client.close();
    });
  });
  const findDocuments = function(db, callback) {
    const collection = db.collection('API_INFORMATION');
    collection.find({
      [attr]:val
    }).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs);
      callback(docs);
    });
  }
}

function updateVal(attr1,attr2,val1,val2){
  client.connect(err => {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const collection = client.db("Cluster0").collection("API_INFORMATION");
    const db = client.db(dbName);
    updateDocument(db, function() {
      client.close();
    });
  });
  const updateDocument = function(db, callback) {
    const collection = db.collection('API_INFORMATION');
    collection.updateOne({
      [attr1]: val1
    }, {
      $inc:{
        [attr2]: 1
      }
    }, function(err, result) {
      assert.equal(err, null);
      console.log("Updated the document with the provided requirements");
      callback(result);
    });
  }
}

function barCodeUpdate(attr1,attr2,val1,val2){
  client.connect(err => {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const collection = client.db("Cluster0").collection("API_INFORMATION");
    const db = client.db(dbName);
    updateDocument(db, function() {
      client.close();
    });
  });
  const updateDocument = function(db, callback) {
    const collection = db.collection('API_INFORMATION');
    collection.updateOne({
      [attr1]: val1
    }, {
      $push:{
        [attr2]: val2
      }
    }, function(err, result) {
      assert.equal(err, null);
      console.log("Updated the document with the provided requirements");
      callback(result);
    });
  }
}

function DeleteVal(attr,val){
  client.connect(err => {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const collection = client.db("Cluster0").collection("API_INFORMATION");
    const db = client.db(dbName);
    removeDocument(db, function() {
      client.close();
    });
  });
  const removeDocument = function(db, callback) {
    const collection = db.collection('API_INFORMATION');
    collection.deleteOne({
      [attr]:val
    }, function(err, result) {
      assert.equal(err, null);
      console.log("Removed the document with the provided requirements");
      callback(result);
    });
  }
}
// Add(5,"ECOMMERCE","123BG",300,0,0);
// read("COMPANY","ECOMMERCE");
// updateVal("COMPANY","API_CALLS","SNAP",4);
// DeleteVal("COMPANY","ECOMMERCE");
// barCodeUpdate("COMPANY","BARCODE","ECOMMERCE",{PRODUCT_NAME:"BOTTLE",BARCODE_NUMBER:1234567});
