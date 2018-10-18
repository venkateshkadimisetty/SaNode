/**
 * Created by iOSSatish on 29/09/16.
 */

module.exports = function(mongoose){

    var Schema = mongoose.Schema;

    var staffSchema = new Schema({
        employeeName: String,
        email : String,
        deptName:String,
        password:String
    });

    return mongoose.model('staff',staffSchema);
}
