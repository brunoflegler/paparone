
var express = require('express'),
    router = express.Router(),
    Recipe = require('./model');

//router.get('/', function (req, res) {
//    Recipe.find({}, function(err, recipes) {
//        if(err) {
//            res.status(400);
//            res.json(err.message);
//        } else {
//            res.send(recipes);
//        }
//    })
//        .populate('ingredients.product')
//        .populate('complements.complement')
//        .populate('complements.complement.ingredients.product');
//});

router.get('/', function (req, res) {
    Recipe.find()
        .deepPopulate('packing ' +
        'ingredients.product ' +
        'ingredients.product.unit ' +
        'complements.complement ' +
        'complements.complement.ingredients.product ' +
        'complements.complement.complements.complement ' +
        'complements.complement.complements.complement.ingredients.product ' +
        'complements.complement.produce.unit ' +
        'produce.unit')
        .exec(function (err, posts) {
            res.send(posts);
    });
});


router.get('/:id', function(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.send(recipe);
        }
    });
});

router.get('/:skip/:limit', function (req, res) {
    Recipe.find()
        .deepPopulate('packing ' +
        'ingredients.product ' +
        'ingredients.product.unit ' +
        'complements.complement ' +
        'complements.complement.ingredients.product ' +
        'complements.complement.complements.complement ' +
        'complements.complement.complements.complement.ingredients.product ' +
        'complements.complement.produce.unit ' +
        'produce.unit')
        .skip(parseInt(req.params.skip)).limit(parseInt(req.params.limit))
        .exec(function (err, posts) {
            res.send(posts);
        });
});

//router.get('/:skip/:limit', function (req, res) {
//    Recipe.find({}, function(err, Forms) {
//        if(err) {
//            res.status(400);
//            res.json(err.message);
//        } else {
//            res.send(Forms);
//        }
//    }).skip(parseInt(req.params.skip)).limit(parseInt(req.params.limit))
//        .populate('ingredients.product')
//        .populate('complements.complement');
//});

router.post('/', function(req, res) {
    var recipe = new Recipe(req.body);
    recipe.save(function (err) {
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
    Recipe.update(query, req.body, function(err, recipe) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.json("ok");
        }
    });
});


router.delete('/:id', function(req, res) {
    Recipe.remove({_id: req.params.id}, function(err, recipe) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.end();
        }
    })
});

module.exports = router;