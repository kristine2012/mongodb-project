const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const config = require('./config.json');
const product = require('./Products.json');


const port = 3000;
//connect to db
// const mongodbURI = 'mongodb+srv://kristine2012:<password>@cluster0-vd6vt.mongodb.net/test?retryWrites=true&w=majority'
 const mongodbURI = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_CLUSTER_NAME}-vd6vt.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(mongodbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log('DB connected!'))
.catch(err =>{
  console.log(`DB connection error: ${err.message}`);
});

//Test the connectivity
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('We are connected to Mongo DB');
});

app.use ((req,res, next)=>{
  console.log(`${req.method} request for ${req.url}`);
  next();//includes this to go to the next middleware
});


//
app.get('/', (req, res) => res.send('Hello World!'))
//
app.get('/allProducts', (req,res)=>{
  res.json(product);

});

app.get('/products/p=:id', (req,res)=>{
  const idParam = req.params.id;

  for (let i = 0; i < product.length; i++){

    if (idParam.toString() === product[i].id.toString()) {
       res.json(product[i]);
    }
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
