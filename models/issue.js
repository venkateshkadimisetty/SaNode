/**
 * Created by iOSSatish on 23/09/16.
 */

module.exports = function(mongoose) {

    var Schema = mongoose.Schema;

    var issueschema =  new Schema({
        issuestatus: String,
        guesttoken: String,
        message: String,
        issuetype: String,
        comments: Array,
        assignee: String,
        assignedby: String,
        department: String,
        requestedtime: String,
        estimatedtime: String
    });

    var issue = mongoose.model('issue',issueschema);

    return issue;
};
