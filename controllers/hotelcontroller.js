/**
 * Created by paradigmcreatives on 8/1/16.
 */

var mongoose = require('mongoose');


var hotel = mongoose.model('hotel');

module.exports = {

    createhotel:function (req,res) {

        var hotelobject = new hotel(req.body);

                hotelobject.save(function (err,hotel) {
                    if(err){
                        res.status(500).send(err);
                    }else{
                        res.status(200).send('{msg:"Hotel is created"}');
                    }
                });
    },

    gethotel:function (req,res) {

        hotel.find({},function (err,result) {
            if(err){
                res.status(500).send(err);
            }else{
                res.status(200).send(result);
            }


        });
    },

    updatehotel:function (req,res) {
        // var hotelobject = new hotel(req.body);
        hotel.update({}, req.body, function (err,hotel) {
            if(err){
                res.status(500).send(err);
            }else{
                res.status(200).send('{msg:"updated hotel"}');
            }
        });
    }

}
