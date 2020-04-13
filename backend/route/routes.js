var express = require('express');
var router = express.Router();

const Product = require('../model/product');

//GET - READ -> Product
router.get('/products', (req, res, next) => {
    Product.find(function (err, products) {
        if(err){
            res.json(err);
        }
        else {
            res.json(products);
        }
    })
});

//POST - CREATE -> Product
router.post('/product', (req, res, next) => {
    let newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    });
    newProduct.save((err, product) => {
        if(err){
            res.json(err);
        }
        else {
            res.json({msg: 'Product was succesfully added.'});
        }
    });
});

//PUT - UPDATE
router.put('/product/:id', (req, res, next) => {
    Product.findOneAndUpdate({_id: req.params._id},{
        $set:{
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        }
    }, function(err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});

//DELETE - DELETE
router.delete('/product/:id', (req, res, next) => {
    Product.remove({_id: req.params._id}, function(err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});

module.exports = router;