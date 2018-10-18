/**
 * Created by iOSSatish on 13/09/16.
 */

module.exports = function(mongoose) {

    var Schema = mongoose.Schema;

    var serviceschema =  new Schema({
        servicestatus: String,
        serviceschanges: Array,
        roomnumber: String,
        guesttoken: String,
        message: String,
        servicetype: String,
        comments: Array,
        assignee: String,
        assignedby: String,
        department: String,
        acceptedby: String,
        requestedtime: String,
        estimatedtime: String,
        closedby: String,
        deviceid: String,
        devicetype: String,
        customername: String
    });

    var service = mongoose.model('service',serviceschema);

    return service;
};
