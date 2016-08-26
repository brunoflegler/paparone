
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name : {type: String, required: true, index:{unique: true} },
    vlr_unit : {type: Number, required: true},
    unit : {type: mongoose.Schema.Types.ObjectId, ref: 'Unit'},
    quantity : {type: Number, required: true},
    type : {type: Number, required: true}
});


module.exports = mongoose.model('Product', ProductSchema);