
var express = require('express'),
    router = express.Router(),
    User = require('./model');

router.get('/', function (req, res) {
    User.find({}, function(err, users) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.send(users);
        }
    })
});

router.get('/:id', function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.send(user);
        }
    });
});

router.post('/', function(req, res) {
    var user = new User(req.body);
    user.password = '123Mudar';
    user.save(function (err) {
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
    User.update(query, req.body, function(err, form) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.json("ok");
        }
    });
});


//router.put('/:id', function(req, res) {
//    User.findById(req.params.id, function(err, user) {
//        if(err) {
//            res.status(400);
//            res.json(err.message);
//        } else {
//            user.username = req.body.username;
//            user.password = req.body.password;
//            user.fullname = req.body.fullname;
//            user.email = req.body.email;
//            user.save(function(err) {
//                if(err) {
//                    res.status(400);
//                    res.json(err.message);
//                } else {
//                    res.send(user);
//                }
//            });
//        }
//    });
//});

router.delete('/:id', function(req, res) {
    User.remove({_id: req.params.id}, function(err, user) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.end();
        }
    })
});

module.exports = router;