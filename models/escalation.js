/**
 * Created by iOSSatish on 29/09/16.
 */

module.exports = function(mongoose){

    var Schema = mongoose.Schema;

    var escalationSchema = new Schema({
        nameofhod : String,
        email:String,
        deptname : String,
        issue:String,
        staffname: String,
        dateofescalation: String
    });

    return mongoose.model('escalation',escalationSchema);
}
