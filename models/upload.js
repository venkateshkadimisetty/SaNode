/**
 * Created by paradigmcreatives on 8/1/16.
 */


//var mongoose = require('mongoose');

module.exports = function (mongoose) {

    console.log('in upload model');
    var Schema  = mongoose.Schema;

    var uploadSchema = new Schema({

        filetype:String,
        srctype:String,
        org_filename:String,
        location:String,
        filename:String
    });

    var upload = mongoose.model('upload', uploadSchema);

    return upload;

}