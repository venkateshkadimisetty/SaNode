/**
 * Created by iOSSatish on 18/10/16.
 */

module.exports = function(mongoose) {

    var Schema = mongoose.Schema;

    var departmentSchema =  new Schema({

        departmentname:String,
        HOD: String,
        email: String
    });

    var department = mongoose.model('department',departmentSchema);

    return department;

};

