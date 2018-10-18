/**
 * Created by iOSSatish on 12/09/16.
 */


module.exports = function(mongoose){

    var Schema = mongoose.Schema;

    var serviceSchema = new Schema({
        servicesList: Array,
        phoneNumber: String
    });

    return mongoose.model('servicelist',serviceSchema);
}
