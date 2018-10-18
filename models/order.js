/**
 * Created by iOSSatish on 03/10/16.
 */

module.exports = function (mongoose) {

    var Schema  = mongoose.Schema;

    var orderschema = new Schema({

        quantity:String,
        itemId:String,
        price:String,
        foodType:String,
        status:String,
        roomnumber: String
    });

    var order = mongoose.model('order', orderschema);

    return order;

}
