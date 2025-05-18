const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require ('morgan');
const mongoose = require('mongoose');

//Middleware
app.use(express.json());
app.use(morgan('tiny'));

require('dotenv/config');


const api = process.env.API_URL;


app.get(`${api}/products`, (req, res) => {
    const product ={
        id: 1,
        name: 'hair dresser',
        image: 'some_url',
    }
    res.send(product);
})

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})

.then(()=>{
    console.log('Database Connection is ready...!')
})
.catch((err)=>{
    console.log(err);
})

app.post(`${api}/products`, (req, res) => {
    const newProduct = req.body;
    console.log(newProduct);   
    res.send(newProduct);
})

app.listen(3000, ()=>{
    console.log('Server is running http://localhost:3000');
})
