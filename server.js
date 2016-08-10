
var database = require('./config/database'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    http = require('http').Server(app),
    io = require('socket.io').listen(http),
    cors = require('cors'),
    path = require('path'),
    jwt = require('jwt-simple');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

var api = {};
api.users = require('./modules/users/route');
api.products = require('./modules/products/route');
api.validation = require('./modules/validation/route');


app.use(cors());
app.use('/users', api.users);
app.use('/products', api.products);
app.use('/', api.validation);
app.use(express.static(path.join(__dirname, './client')));


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

