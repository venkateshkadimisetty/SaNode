

var usercode = function (req, res) {

    var usercode  = underScoreModule.random(100000,999999);

    var userObject = new User(req.body);
    userObject.save(function(error,result){
        if(error){
            if(error.code == 11000){


                user.findone(userObject, function (err, reslt) {
                    if(err){
                        return res.status(200).send(err);
                    }
                    if(!reslt){

                    }
                });
                // var errorResponse = {};
                // errorResponse.response = error;
                // errorResponse.errorcode = 1100;
                // errorResponse.message = "user already registered";
                // // return res.status(500).send(errorResponse);

                return res.status(200).send();
            } else {
                return res.status(500).send(error);
            }
        }
        else{
            return res.status(200).send({message:"Successfully Registered", usercode:usercode});
        }
    });

}

module.exports = function(mongoose){

var Schema =  mongoose.Schema;

var reservationSchema = new Schema({
    name:String,
    email:{type:String, require:false},
    phone:{type:String, require:true},
    checkindate: {type:Date, default:Date.now},
    checkoutDate: {type:Date,require:true},
    roomnumber: {type:String, require:true},
    address: String,
    city:String,
    state:String,
    guesttoken: String
});



var reservation = mongoose.model('reservation',reservationSchema);

return reservation;

}