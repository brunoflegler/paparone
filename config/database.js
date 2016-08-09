/**
 * Created by brunorossini on 12/4/15.
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://bruno.dalcol:213590@ds139705.mlab.com:39705/paparone')

var database = mongoose.connection;

database.on('error', function (err) {
    console.log('Erro de conexao.', err);
});

database.on('open', function () {
    console.log('Conexão aberta.')
});

database.on('connected', function (err) {
    console.log('Conectado')
});

database.on('disconnected', function (err) {
    console.log('Desconectado')
});

database.on('error', function (err) {
    console.log('Erro de padrão de conexão do Mongoose: ' + err);
});

process.on('SIGINT', function () {
    db.close(function () {
        console.log('conexão Mongoose desconectada através de término do node CRTL + C');
        process.exit(0);
    });
});

module.exports = database;