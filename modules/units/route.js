
var express = require('express'),
    router = express.Router(),
    Unit = require('./model');

router.get('/', function (req, res) {
    Unit.find({}, function(err, units) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.send(units);
        }
    })
});

router.get('/:id', function(req, res) {
    Unit.findById(req.params.id, function(err, unit) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.send(unit);
        }
    });
});

router.get('/:skip/:limit', function (req, res) {
    console.log(req.params.skip);
    Unit.find({}, function(err, Forms) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.send(Forms);
        }
    }).skip(parseInt(req.params.skip)).limit(parseInt(req.params.limit))
});

router.post('/', function(req, res) {
    var product = new Unit(req.body);
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
    Unit.update(query, req.body, function(err, form) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.json("ok");
        }
    });
});


router.delete('/:id', function(req, res) {
    Unit.remove({_id: req.params.id}, function(err, unit) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.end();
        }
    })
});

module.exports = router;