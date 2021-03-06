const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

var corsOption = {
  origin:true,
  methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials:true,
  exposedHeaders:['x-auth-token']
};

// parse application/json
app.use(bodyParser.json());

app.use(cors(corsOption));
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'sagar',
  password: 'sagar',
  database:'restful_db'
});

//connect to database
conn.connect((err) =>{
  if(!err)
  console.log('Mysql Connected...');
  else{
    console.log('Connection failed');
    console.log(err);
  }

});
//
//show all products
app.get('/api/products',(req, res) => {
  debugger;
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//show single product
app.get('/api/products/:id',(req, res) => {
  let sql = "SELECT * FROM product WHERE product_id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//add new product
app.post('/api/products',(req, res) => {
  let data = {product_name: req.body.product_name, product_price: req.body.product_price};
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//update product
app.put('/api/products/:id',(req, res) => {
  let sql = "UPDATE product SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//Delete product
app.delete('/api/products/:id',(req, res) => {
  let sql = "DELETE FROM product WHERE product_id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});
