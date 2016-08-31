var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    deepPopulate = require('mongoose-deep-populate')(mongoose);

var RecipeSchema = new Schema({
    name : {type: String, required: true, index:{unique: true} },
    packing : {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    quantity_pack : {type: Number, required:false},
    lost : {type: Number, required:true},
    produce: {
        quantity : {type: Number, required:true},
        unit : {type: mongoose.Schema.Types.ObjectId, ref: 'Unit'},
        vlr_unit : {type: Number, required:true}
    },
    ingredients:[{
        product : {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        quantity : {type: Number, required:true}
    }],
    complements : [{
        complement : {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
        quantity : {type: Number, required:true}
    }]

});
RecipeSchema.plugin(deepPopulate, {});


module.exports = mongoose.model('Recipe', RecipeSchema);