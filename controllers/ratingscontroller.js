/**
 * Created by paradigmcreatives on 8/22/16.
 */

var mongoose = require('mongoose');

var ratings = mongoose.model('rating');
var user = mongoose.model('user');

module.exports = {

    rateuser:function (req,res) {

        if (!req.body) {
            return res.status(400).send({error: "Body should not be empty"});
        }

        var guesttype = 'guest';

        if(req.body.email){

            user.findOne({email:req.body.email},function (err,userresult) {

                if(err){
                    return res.status(500).send(err);
                }
                if(userresult && userresult.guesttoken){
                    guesttype = 'reserved';
                    req.body.customertype = guesttype;
                    req.body.date = Date.now();
                    var ratingobject = new ratings(req.body);
                    ratingobject.save(function (err, result) {

                        if (err) {
                           return res.status(500).send(err);
                        }
                        return res.status(200).send({response: 'Submitted successfully'});
                    });
                }
                else{
                    req.body.customertype = guesttype;
                    req.body.date = Date.now();
                    var ratingobject = new ratings(req.body);
                    ratingobject.save(function (err, result) {

                        if (err) {
                            return res.status(500).send(err);
                        }
                        return res.status(200).send({response: 'Submitted successfully'});
                    });
                }
            })
        }

        else {
            req.body.customertype = guesttype;
            req.body.date = Date.now();
            var ratingobject = new ratings(req.body);
            ratingobject.save(function (err, result) {

                if (err) {
                   return res.status(500).send(err);
                }
                return res.status(200).send({response: 'Submitted successfully'});
            });
        }
    },
    
    ratingsandreviews: function (req, res) {
        ratings.find({},function (err,result) {
            if(err){
                res.status(500).send(err);
            }else{
                res.status(200).send(result);
            }
        });
    }
};
