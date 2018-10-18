/**
 * Created by paradigmcreatives on 8/1/16.
 */


//var mongoose = require('mongoose');

module.exports = function (mongoose) {

    console.log('in hotel class');
    var Schema  = mongoose.Schema;

    var hotelSchema = new Schema({
        hotelname:String,
        address:String,
        phonenumber:String,
        contactdetails:String,
        contactemail:String,
        latlong:String,
        rating:String
    });

    console.log('in hotel class end');

    var hotel = mongoose.model('hotel', hotelSchema);

    return hotel;

}