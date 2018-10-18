/**
 * Created by paradigmcreatives on 8/18/16.
 */


module.exports = function(mongoose){

    var Schema = mongoose.Schema;

    var offersSchema = new Schema({

        offername:String,
        offerstartdate:Date,
        offerenddate:Date,
        offerusertype:String,
        offerimageurl:String,
        offerdescription:String

    });

    return mongoose.model('offer',offersSchema);

}


