2/**
 * Created by iOSSatish on 29/09/16.
 */

var mongoose = require('mongoose');
var randomstringmodule = require('randomstring');

var staff = mongoose.model('staff');

module.exports = {

    createstafflogin:function (req,res) {

        var staffobject = new staff(req.body);

        staffobject.save(function (err,result) {

            if(err){
                return res.status(500).send(err);
            }
            else{
                var passwordstring = randomstringmodule.generate(6);
                var newstaffobject = new staff(result);
                newstaffobject.password = passwordstring;
                staff.findOneAndUpdate({_id: newstaffobject._id}, newstaffobject, function (err,staffresponse) {
                    if(err){
                        console.log(err);
                        res.status(500).send(err);
                    }else{
                        console.log(staffresponse);
                        res.status(200).send({password: passwordstring, msg: "successfully created the login"});
                    }
                });
            }
        });
    },

    fetchstafflogins: function (req, res) {
        staff.find({},function (err,result) {
            if(err){
                res.status(500).send(err);
            }
            else{
                res.status(200).send(result);
            }
        });
    },

    deletestafflogin: function (req, res) {
        staff.remove({_id:req.body._id}, function (err, result) {
            if(err){
                return res.status(500).send(err);
            }
            return res.status(200).send({msg:"successfully removed the login"});
        });
    },

    login : function(req,res){

        if (!req.body.email) {
            return res.status(400).send({error: "email is required"});
        }
        if (!req.body.password) {
            return res.status(400).send({error: "Password is required"});
        }

        staff.findOne({email:req.body.email},function(err,result){

            if(result === null){
                return res.status(401).send({type: false, data: "Incorrect email/password"});
            }
            if(result){

                    if(result.password === req.body.password){
                        var resultResponse = {result:result,msg:"logged in successfully"};
                        return res.status(200).send(resultResponse);
                    }
                    else{
                        return res.status(401).send({type: false, data: "Incorrect email/password"});
                    }
            }
            else {
                res.status(500).send({type: false, data: err});
            }
        });
    }

};







