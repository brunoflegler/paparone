
var express = require('express'),
    router = express.Router(),
    Estimate = require('./model');

router.get('/', function (req, res) {
    Estimate.find({}, function(err, estimates) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.send(estimates);
        }
    })
});

router.get('/:id', function(req, res) {
    Estimate.findById(req.params.id, function(err, estimate) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.send(estimate);
        }
    });
});

router.get('/:skip/:limit', function (req, res) {
    console.log(req.params.skip);
    Estimate.find({}, function(err, estimates) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.send(estimates);
        }
    }).skip(parseInt(req.params.skip)).limit(parseInt(req.params.limit))
});

router.post('/', function(req, res) {
    var estimate = new Estimate(req.body);
    estimate.save(function (err) {
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
    Estimate.update(query, req.body, function(err, estimate) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.json("ok");
        }
    });
});


router.delete('/:id', function(req, res) {
    Estimate.remove({_id: req.params.id}, function(err, estimate) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.end();
        }
    })
});

module.exports = router;