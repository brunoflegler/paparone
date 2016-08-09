var express = require('express'),
    router = express.Router(),
    User = require('../users/model'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    bcrypt = require('bcryptjs'),
    SALT_WORK_FACTOR = 10,
    config = require('../../config/oauth');


function createJWT(user) {
    var playload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(30, 'm').unix()
    }

    var encode = jwt.encode(playload, config.TOKEN_SECRET);
    return encode;
}

router.get('/email', function(req, res) {
    User.find({'email':req.query.value}, function(err, user) {
        if(err) {
            res.status(400);
            res.json(err.message);
        }
        if(user.length == 0)
            res.send({isValid:true});
        else
            res.send({isValid:false});
    });
});

router.post('/crypto', function(req, res) {
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return res.send(err);
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            if (err) return res.send(err);
            res.send(hash);
        });
    });
});

router.get('/username', function(req, res) {
    console.log(req.query.value);
    User.find({'username':req.query.value}, function(err, user) {
        if(err) {
            res.status(400);
            res.json(err.message);
        }
        if(user.length == 0)
            res.send({isValid:true});
        else
            res.send({isValid:false});
    });
});

router.get('/api/me', ensureAuthenticated, function(req, res) {
    User.findById(req.user, function(err, user) {
        res.send(user);
    });
});


function ensureAuthenticated(req, res, next) {
    if (!req.header('Authorization')) {
        return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
    }
    var token = req.header('Authorization').split(' ')[1];

    var payload = null;
    try {
        payload = jwt.decode(token, config.TOKEN_SECRET);
    }
    catch (err) {
        return res.status(401).send({ message: err.message });
    }

    if (payload.exp <= moment().unix()) {
        return res.status(401).send({ message: 'Token has expired' });
    }
    req.user = payload.sub;
    next();
}


router.post('/auth/login', function(req, res) {
    User.findOne({username: req.body.username}, function(err, user){
        if(err) {
            res.status(404);
            res.json(err.message);
        } else
        if(user != null) {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (err || !isMatch) {
                    res.status(401);
                    res.send(err);
                } else {
                    res.send({token: createJWT(user)});
                }
            });
        }else{
            res.status(401);
            res.json("error");
        }
    });
});

router.post('/auth/google', function(req, res) {
    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
    var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: config.GOOGLE_SECRET,
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
    };

    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
        var accessToken = token.access_token;
        var headers = { Authorization: 'Bearer ' + accessToken };

        // Step 2. Retrieve profile information about the current user.
        request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
            if (profile.error) {
                return res.status(500).send({message: profile.error.message});
            }
            console.log(profile);
            // Step 3a. Link user accounts.
            if (req.header('Authorization')) {
                User.findOne({ google: profile.sub }, function(err, existingUser) {
                    if (existingUser) {
                        return res.status(409).send({ message: 'There is already a Google account that belongs to you' });
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, config.TOKEN_SECRET);
                    User.findById(payload.sub, function(err, user) {
                        if (!user) {
                            return res.status(400).send({ message: 'User not found' });
                        }
                        user.google = profile.sub;
                        user.picture = user.picture || profile.picture.replace('sz=50', 'sz=200');
                        user.displayName = user.displayName || profile.name;
                        user.save(function() {
                            var token = createJWT(user);
                            res.send({ token: token });
                        });
                    });
                });
            } else {
                // Step 3b. Create a new user account or return an existing one.
                User.findOne({ google: profile.sub }, function(err, existingUser) {
                    if (existingUser) {
                        return res.send({ token: createJWT(existingUser) });
                    }
                    var user = new User();
                    user.google = profile.sub;
                    user.picture = profile.picture.replace('sz=50', 'sz=200');
                    user.displayName = profile.name;
                    user.save(function(err) {
                        var token = createJWT(user);
                        res.send({ token: token });
                    });
                });
            }
        });
    });
});

module.exports = router;