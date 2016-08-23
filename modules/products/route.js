
var express = require('express'),
    router = express.Router(),
    Product = require('./model');

router.get('/', function (req, res) {
    Product.find({}, function(err, users) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.send(users);
        }
    })
});

router.get('/:id', function(req, res) {
    Product.findById(req.params.id, function(err, user) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.send(user);
        }
    });
});

router.get('/:skip/:limit', function (req, res) {
    console.log(req.params.skip);
    Product.find({}, function(err, Forms) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.send(Forms);
        }
    }).skip(parseInt(req.params.skip)).limit(parseInt(req.params.limit))
});

router.post('/', function(req, res) {
    var product = new Product(req.body);
    product.save(function (err) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.status(201);
            res.end();
        }
    });
});


router.put('/', function(req, res) {
    var query ={_id: req.body._id};
    Product.update(query, req.body, function(err, form) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.json("ok");
        }
    });
});


router.delete('/:id', function(req, res) {
    Product.remove({_id: req.params.id}, function(err, user) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.end();
        }
    })
});

module.exports = router;