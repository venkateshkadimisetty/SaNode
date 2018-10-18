/**
 * Created by iOSSatish on 12/09/16.
 */

var mongoose = require('mongoose');


var servicelist = mongoose.model('servicelist');

var service = mongoose.model('service');

var issue = mongoose.model('issue');

var pushNotification = require('../plugins/pushnotifications');
var androidpushnotification = require('../plugins/androidpushnotifications');

module.exports = {

    createservicelist:function (req,res) {
        var servicelistobject = new servicelist(req.body);

        servicelistobject.save(function (err,result) {

            if(err){
                res.status(500).send(err);
            }else{
                res.status(200).send('{msg:"Services list is created"}');
            }
        });
    },

    getservicelist:function (req,res) {

        servicelist.find({},function (err,result) {
            if(err){
                res.status(500).send(err);
            }else{
                res.status(200).send(result);
            }
        });
    },

    updateserviceslist:function (req,res) {

        // var serviceslistobject = new service(req.body);
        servicelist.update({}, req.body, function (err,result) {
            if(err){
                res.status(500).send(err);
            }else{
                res.status(200).send('{msg:"updated hotel"}');
        }
        });
    },

    createservicerequest:function (req, res) {

        req.body.requestedtime = Date.now();
        req.body.estimatedtime = "3600000";
        var serviceobject = new service(req.body);
        serviceobject.save(function (err, result) {
            if(err){
                res.status(500).send(err);
            }
            else{
                res.status(200).send({msg:"Your request has been placed successfully"});
            }
        });
    },

    getservicerequests: function (req, res) {
        service.find({},function (err,result) {
            if(err){
                res.status(500).send(err);
            }else{
                res.status(200).send(result);
            }
        });
    },

    raiseanissue:function (req, res) {

        req.body.requestedtime = Date.now();
        var issueobject = new issue(req.body);
        issueobject.save(function (err, result) {
            if(err){
                res.status(500).send(err);
            }
            else{
                res.status(200).send({msg:"Your request has been placed successfully"});
            }
        });
    },



    getservicestatus: function (req, res) {
        if(!req.body){
            return res.status(400).send("Request body is required");
        }
        if(!req.body.guesttoken){
            return res.status(400).send("Guest token is required");
        }
        service.find({guesttoken: req.body.guesttoken}, function (err, result) {
            if(err){
                res.status(500).send(err);
            }
            else{
                res.status(200).send(result);
            }
        })
    },

    changeAssignee: function (req, res) {
        service.findOne({_id: req.body._id}, function (err, result) {
            if(err){
                res.status(500).send(err);
                console.log(err);
            }
            else if(result === null){
                res.status(401).send("No service found with the given id");
            }
            else{

                var newservice = new service(result);
                var string = "Assignee changed to " + req.body.assignee + " Assigned by " + req.body.assignedby;
                newservice.serviceschanges.push(string);
                newservice.comments = req.body.comments;
                newservice.assignee = req.body.assignee;
                newservice.assignedby = req.body.assignedby;
                newservice.servicestatus = req.body.servicestatus;
                newservice.acceptedby = req.body.acceptedby;
                newservice.estimatedtime = req.body.estimatedtime;
                if(req.body.closedby){
                    newservice.closedby = req.body.closedby;
                }
                newservice.save(function (err1, saveresult) {
                   if(err1){
                       return res.status(500).send(err1);
                   }
                   else{
                       res.status(200).send({message: "Successfully changed the assignee", result: saveresult} );

                       if(saveresult.devicetype === "IOS"){
                           pushNotification.sendApns([saveresult.deviceid], string, "service status change", "services");
                       }
                       else if(saveresult.devicetype === "android"){
                           var obj = {offerdescription: string, offername: "service status change", moduelname: "services"};
                           androidpushnotification.sendnotifications([saveresult.deviceid], JSON.stringify(obj));
                       }
                       else{
                           console.log("Device type is not valid");
                       }
                   }
                });
            }
        });
    }

}
