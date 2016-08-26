
var database = require('./config/database'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    http = require('http').Server(app),
    cors = require('cors'),
    path = require('path'),
    jwt = require('jwt-simple');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 443,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

var api = {};
api.users = require('./modules/users/route');
api.products = require('./modules/products/route');
api.recipes = require('./modules/recipes/route');
api.estimates = require('./modules/estimates/route');
api.validation = require('./modules/validation/route');
api.units = require('./modules/units/route');


app.use(cors());
app.use('/paparone/users', api.users);
app.use('/paparone/products', api.products);
app.use('/paparone/recipes', api.recipes);
app.use('/paparone/estimates', api.estimates);
app.use('/paparone/units', api.units);
app.use('/paparone/', api.validation);
app.use('/paparone', express.static(path.join(__dirname, './client')));


app.get('/ping', function (req, res) {
    res.send('Servidor Executando');
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});


app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

