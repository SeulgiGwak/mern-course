const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require ('morgan');
const mongoose = require('mongoose');
require('dotenv/config');


//Middleware
app.use(express.json());
app.use(morgan('tiny'));


// Environment Variables
const api = process.env.API_URL;


// ✅ Define Mongoose Schema and Model
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: Number,
});


const product = mongoose.model('Product', productSchema);


// ✅ GET Route
app.get(`${api}/products`, (req, res) => {
    const product ={
        id: 1,
        name: 'Hair Dresser',
        image: 'some_url',
    };
    res.send(product);
});


// ✅ POST Route
app.post(`${api}/products`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock,
    });

    product.save()
    .then((createdProduct)=> {
        res.status(201).json(createdProduct);
    })
    .catch((err)=> {
        req.status(500).json ({
            error: err,
            success: false,
        });
    });
});


// ✅ Connect to MongoDB and Start Server
mongoose.connect(process.env.CONNECTION_STRING, {
   dbName: 'SeulgiGwak',
})
.then(() => {
        console.log('✅ Database connection ready...');
        app.listen(3000, () => {
            console.log('🚀 Server is running at http://localhost:3000');
        });
    })
    .catch((err) => {
        console.log('❌ DB connection error:', err);
    });