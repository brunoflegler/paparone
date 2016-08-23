/**
 * Created by brunorossini on 12/4/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name : {type: String, required: true, index:{unique: true} },
    vlr_unit : {type: String, required: true}
});


module.exports = mongoose.model('Product', ProductSchema);