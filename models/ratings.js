/**
 * Created by paradigmcreatives on 8/22/16.
 */


module.exports = function (mongoose) {

    var Schema  = mongoose.Schema;

    var ratingobject = new Schema({

        food:Number,
        cleaniness:Number,
        service:Number,
        sleepquality:Number,
        roomservice:Number,
        overallrating:Number,
        feedback:String,
        customertype:String,
        date:String,
        username: String

    });

    return mongoose.model('rating',ratingobject);

}
