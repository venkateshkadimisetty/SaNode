/**
 * Created by paradigmcreatives on 8/18/16.
 */

var mongoose = require('mongoose');
var _ = require('underscore');
var offers = mongoose.model('offer');
var user = mongoose.model('user');
var pushNotification = require('../plugins/pushnotifications');
var androidpushnotification = require('../plugins/androidpushnotifications');
var devices = mongoose.model('device');



function iosdevices(cb) {
    devices.find({deviceplatform: "IOS"}, function (err, result) {
        if(err){
            cb(err);
        }
        else{
            var deviceidslist = [];

            _.each(result, function (device) {
                deviceidslist.push(device.deviceid);

            })
            cb(null,deviceidslist);
        }
    });
};


function androiddevices(cb) {
    devices.find({deviceplatform: "android"}, function (err, result) {
        if(err){
            cb(err);
        }
        else{
            var deviceidslist = [];

            _.each(result, function (device) {
                deviceidslist.push(device.deviceid);

            })
            cb(null,deviceidslist);
        }
    });
}




module.exports = {

    createoffers: function (req, res) {


        if (!req.body) {
            return res.status(400).send({error: "Body should not be empty"});
        }
        if (!req.body.offerstartdate || !req.body.offerenddate) {

            return res.status(400).send({error: "offer start date or end date should not be empty"});
        }

        var offerobject = new offers(req.body);
        offerobject.save(function (err, offerresult) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                 res.status(200).send({msg: "created offer", result: offerresult});

                iosdevices(function (err1, deviceslist) {
                    if(err1){
                        console.log(err1);
                    }
                    else {
                        pushNotification.sendApns(deviceslist, req.body.offerdescription, req.body.offername, "offers");
                    }
                });

                androiddevices(function (err1, deviceslist) {
                    if(err1){
                        console.log(err1);
                    }
                    else {
                        var obj = {offerdescription: req.body.offerdescription, offername: req.body.offername, moduelname: "offers"};
                        androidpushnotification.sendnotifications(deviceslist, JSON.stringify(obj));
                    }
                });
            }
        });
    },

    fetchOffers: function (req, res) {
        if (!req.body) {
            return res.status(400).send({error: "Body should not be empty"});
        }


        user.findOne({email: req.body.email}, function (err, result) {

            if (result) {
                if (!result.guesttoken) {
                    // offers.find({offerusertype:'guest'},function (err,result) {
                    offers.find({}, function (err, result) {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.status(200).send(result);
                        }

                    });
                } else {
                    // offers.find({Offerusertype:'reserved'},function (err,result) {
                    offers.find({}, function (err, result) {

                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.status(200).send(result);
                        }
                    });
                }

            } else {

                // offers.find({offerusertype:'guest'},function (err,result) {
                offers.find({}, function (err, result) {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).send(result);
                    }

                });
            }
        })
    },


    updateOffer: function (req, res) {
        offers.update({_id:req.body._id}, req.body, function (err,result) {
            if(err){
                return res.status(500).send(err);
            }else{
                return res.status(200).send({msg:"updated successfully"});
            }
        });
    },

    deleteOffer: function (req, res) {
        offers.remove({_id:req.body._id}, function (err, result) {
            if(err){
                return res.status(500).send(err);
            }
            return res.status(200).send({msg:"successfully removed"});
        });
    }
};

