var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    //ProductShema = require('../products/model');

var UserSchema = new Schema({
    name : {type: String, required: true, index:{unique: true} },
    ingredients:[{
        product : {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        quantity : {type: String, required:true}
    }],
    complements : [{
        complement : {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
        quantity : {type: String, required:true}
    }]

});


module.exports = mongoose.model('Recipe', UserSchema);