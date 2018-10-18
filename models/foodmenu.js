/**
 * Created by paradigmcreatives on 8/1/16.
 */


//var mongoose = require('mongoose');

module.exports = function (mongoose) {

    console.log('in upload model');
    var Schema  = mongoose.Schema;

    var foodmenuSchema = new Schema({

        menucategory:String,
        menu:{
            menuType:String,
            name:String,
            description: String,
            price:String,
            foodType:String,
            status:String
        }
    });

    var foodmenu = mongoose.model('foodmenu', foodmenuSchema);

    return foodmenu;

}
