
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UnitSchema = new Schema({
    name : {type: String, required: true},
    initials : {type: String, required: true}
});


module.exports = mongoose.model('Unit', UnitSchema);