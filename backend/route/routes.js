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

//GET - READ -> Product by ID
router.get('/products/:id', (req, res) => {
    let id = req.params.id;
    Product.findById(id, function(err, product){
        if(err){
            res.json(err);
        }
        else {
            res.json(product);
        }
    });
});

//POST - CREATE -> Product
router.post('/product', (req, res) => {
    let newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        image: req.body.image
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
router.put('/products/:id', (req, res) => {
    Product.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then(product => {
            res.send(product);           
        })
        .catch(err => {
            res.json(err);
        });
});

//DELETE - DELETE
router.delete('/products/:id', (req, res) => {
    Product.remove({_id: req.params.id}, function(err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});

module.exports = router;