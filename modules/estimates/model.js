var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EstimateSchema = new Schema({
    name : {type: String, required: true, index:{unique: true} }
});


module.exports = mongoose.model('Estimate', EstimateSchema);