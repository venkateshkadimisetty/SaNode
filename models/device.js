/**
 * Created by paradigmcreatives on 8/8/16.
 */


module.exports = function(mongoose) {

var Schema = mongoose.Schema;

    var deviceSchema =  new Schema({

        deviceplatform:String,
        deviceid:{type:String,unique:true},
        devicename:String,
        isloggedin:{type:Boolean,value:false}
    });

 var device = mongoose.model('device',deviceSchema);

    return device;

};

