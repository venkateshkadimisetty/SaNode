var mongoose = require('mongoose');
var User = mongoose.model('user');
var device = mongoose.model('device');
var mailsmtp = require('../plugins/mailtransport');
var pushNotification = require('../plugins/pushnotifications');
var underScoreModule = require('underscore');
var randomstringmodule = require('randomstring');
var min = 100000;
var max = 999999;

module.exports = {
	register: function(req, res){
		var reqBody = req.body;
		if(!req.body) {
			return res.status(400).send({error: "Body should not be empty"}); }
 		if (!reqBody.phone) {
            return res.status(400).send({error: "phone is required"});
        }
        if (!reqBody.email) {
            return res.status(400).send({error: "email is required"});
        }
        if (!reqBody.password) {
            return res.status(400).send({error: "Password is required"});
        }
        if (!reqBody.username) {
            return res.status(400).send({error: "username is required"});
        }
        if (!reqBody.dateofbirth){
             return res.status(400).send({error: "date of birth is required"});
        }
        if (!reqBody.role) {
            return res.status(400).send({error: "role is required"});
        }
        if (!reqBody.platform) {
            return res.status(400).send({error: "platform is required"});
        }

        var userObject = new User(reqBody);
        userObject.save(function(error,result){
        	if(error){
                if(error.code == 11000){

                    var errorResponse = {};
                    errorResponse.response = error;
                    errorResponse.errorcode = 1100;
                    errorResponse.message = "user already registered";
                  res.status(500).send(errorResponse);  
                } else {
        		return res.status(500).send(error);
            }
        	}
        	if(!error){
                return res.status(200).send({message:"Successfully Registered",response:result});
        	}

        });
	},

	login : function(req,res){


        if (!req.body.email) {
            return res.status(400).send({error: "email is required"});
        }
        if (!req.body.password) {
            return res.status(400).send({error: "Password is required"});
        }

        User.findOne({email:req.body.email},function(err,result){

        	if(result){
               // var userObject = new User(req.body);
        		result.comparePassword(req.body.password, function(err, isMatch){
        			if(isMatch){
        				result.password = undefined;
                        var resultResponse = {result:result,msg:"logged in successfully"};
        				return res.status(200).send(resultResponse);
        			} else{
        		        return res.status(401).send({type: false, data: "Incorrect email/password"});
        			}
        		});

        	}else {
                res.status(500).send({type: false, data: "Error occured: " + err,data:"user not registered"});
            }

        });


	},

	listUsers: function (req, res) {
        User.find({}, function (err, users) {
            if (err) {
                return res.status(500).send({type: false, data: "Error occured: " + err});
            } else {
                res.status(200).send(users);
            }
        });
    },

    forgotPassword: function(req,res){

        User.findOne({email:req.body.email},function(err,user){

            if(user){

                var genPassword = underScoreModule.random(min,max);
                user.password = genPassword;

                var mailOptions = {
                    from: 'sarovarmail@gmail.com', // sender address
                    to: user.email, // list of receivers
                    subject: 'Forgot Password', // Subject line
                    text: 'Generated new password', // plaintext body
                    html: '<b>'+genPassword+'</b>' // html body
                };

                mailsmtp.sendmail(mailOptions,function (err,sentmailstatus) {

                });
                user.save(function (err,saved) {

                    if(!err){
                        return res.status(200).send(user);
                    }
                });

            }else{
                res.status(500).send({error:'User not registered'});
            }

        });

    },

    changePassword:function (req,res) {


        if (!req.body.email) {
            return res.status(400).send({error: "email is required"});
        }
        if (!req.body.password) {
            return res.status(400).send({error: "Password is required"});
        }
        if (!req.body.newpassword) {
            return res.status(400).send({error: "Password is required"});
        }

        User.findOne({email:req.body.email},function(err,result){
            if(result){
                // var userObject = new User(req.body);
                result.comparePassword(req.body.password, function(err, isMatch){
                    if(isMatch){
                        result.password = req.body.newpassword;
                        result.save(function (err,savedUser) {
                            if(savedUser){
                                console.log(savedUser);
                            } else{
                                console.log(err);
                            }

                        })
                        var resultResponse = {result:result,msg:"password changed successfully"};
                        return res.status(200).send(resultResponse);
                    } else{
                        return res.status(500).send({type: false, data: "Incorrect email/password"});
                    }
                });

            }else {
                res.status(500).send({type: false, data: "Error occured: " + err});
            }


        });
    },

    updateUserProfile:function (req, res) {
        var reqBody = req.body;
        if(!req.body) {
            return res.status(400).send({error: "Body should not be empty"}); }
        if (!reqBody.email) {
            return res.status(400).send({error: "email is required"});
        }
        if(!reqBody.oldemail){
            return res.status(400).send({error: "oldemail is required"});
        }
        if (!reqBody.username) {
            return res.status(400).send({error: "username is required"});
        }
        if (!reqBody.dateofbirth) {
            return res.status(400).send({error: "dateofbirth is required"});
        }
        if (!reqBody.phone) {
            return res.status(400).send({error: "phone is required"});
        }
        if(!reqBody.platform){
            return res.status(400).send({error: "platform is required"});
        }
        User.findOne({email:reqBody.email},function(err,result){
                if(result) {
                    if(reqBody.email != reqBody.oldemail){
                        return res.status(400).send({error: "email is already registered"});
                    }
                }
                User.findOne({email:reqBody.oldemail},function(err,result) {

                    if(err){
                        return res.status(500).send(err);
                    }
                    if(result === null){
                        return res.status(500).send({error: "user not registered"});
                    }
                    var userObject = result;
                    userObject.email = reqBody.email;
                    userObject.username = reqBody.username;
                    userObject.dateofbirth = reqBody.dateofbirth;
                    userObject.dateofanniversary = reqBody.dateofanniversary;
                    userObject.phone = reqBody.phone;
                    userObject.platform = reqBody.platform;
                    userObject.save(function (error, result) {
                        if (error) {
                            return res.status(500).send({error: "Error occured in updating the profile"});
                        }
                        else {
                            var resultResponse = {result: result, msg: "profile updated successfully"};
                            res.status(200).send(resultResponse);
                        }
                    });
                });
        });
    },

    sendNotifications: function (req, res) {
        pushNotification.sendApns();
        res.send({'msg':'haiiiii'});
    },

    registerdevicetoken:function (req,res) {

        var reqBody = req.body;
        if(!req.body) {
            return res.status(400).send({error: "Body should not be empty"}); }
        if (!reqBody.deviceid) {
            return res.status(400).send({error: "Deviceid is required"});
        }

        var deviceobj = new device(reqBody);
        deviceobj.save(function (err,result) {

            if (err) {
                if(err.code == 11000) {
                    return res.status(500).send({message: "Already registered device"});
                }
                else {
                    return res.status(500).send(err);
                }
            }
            else {
                var resultResponse = {result: result, msg: "device inserted successfully"};
                return res.status(200).send(resultResponse);
            }
        });
    },

    checkout:function (req, res) {
        if(!req.body) {
            return res.status(400).send({error: "Body should not be empty"});
        }
        if (!req.body.guesttoken) {
            return res.status(400).send({error: "usercode is required"});
        }
        if (!req.body.roomnumber) {
            return res.status(400).send({error: "usercode is required"});
        }
        if (!req.body.checkoutdate) {
            return res.status(400).send({error: "usercode is required"});
        }
        User.findOneAndUpdate({guesttoken:req.body.guesttoken}, {guesttoken :"", roomnumber:"", checkoutdate: req.body.checkoutdate, role : "guest"}, function (err, result) {
            if(err){
                res.status(500).send(err);
            }
            else{
                res.status(200).send({message: "check out successful"});
            }
        });
    },

    checkin:function (req, res) {

        if(!req.body.guesttoken){
            return res.status(400).send({error: "usercode is required"});
        }
        User.findOne({guesttoken:req.body.guesttoken},function(err,result) {
            if(err){
                return res.status(500).send(err);
            }
            if(result === null){
                return res.status(404).send({error: "Invalid usercode"});
            }
            return res.status(200).send(result);
            });
    },

    bookaroom: function (req, res) {
        if(!req.body) {
            return res.status(400).send({error: "Body should not be empty"});
        }
        if(!req.body.phonenumber){
            return res.status(400).send({error: "phonenumber is required"});
        }
        return res.status(200).send({msg:"Thanks for choosing Sarovar. You will get a call from our receptionist soon"});
        var phonenum = req.body.phonenumber;
    },

    registeraroom: function (req, res) {

        var reqBody = req.body;
        if(!req.body) {
            return res.status(400).send({error: "Body should not be empty"});
        }
        if (!reqBody.phone) {
            return res.status(400).send({error: "phone is required"});
        }
        if (!reqBody.email) {
            return res.status(400).send({error: "email is required"});
        }
        if (!reqBody.username) {
            return res.status(400).send({error: "username is required"});
        }

        reqBody.role = "reserved";
        reqBody.platform = "web";
        var userObject = new User(reqBody);
        userObject.save(function(error, result){
            var usercode  = underScoreModule.random(100000,999999);

            if(error){
                if(error.code == 11000){

                    User.findOneAndUpdate({email: userObject.email},
                                 {
                                     guesttoken: usercode,
                                     role: "reserved",
                                     checkindate:reqBody.checkindate,
                                     checkoutdate: reqBody.checkoutdate,
                                     username: reqBody.username,
                                     phone: reqBody.phone,
                                     roomnumber: reqBody.roomnumber
                                 },
                        function (erroo, userresult) {
                        if(erroo){
                            return res.status(500).send(erroo);
                        }
                        else{
                                return res.status(200).send({message:"Already Registered User",response:userresult, usercode:usercode});
                            }
                        });
                }
                else {
                    return res.status(500).send(error);
                }
            }
            else{
                User.findOneAndUpdate({email:reqBody.email}, {guesttoken: usercode}, function (erroo, userresult) {
                    if(erroo){
                        return res.status(500).send(erroo);
                    }
                    else{
                         // res.status(200).send({message:"Successfully registered",response:userresult, usercode:usercode});

                        ///////

                        User.findOne({email:req.body.email},function(err,user){

                            if(user){
                                var passwordstring = randomstringmodule.generate(6);
                                var mailOptions = {
                                    from: 'sarovarmail@gmail.com', // sender address
                                    to: user.email, // list of receivers
                                    subject: 'Your password for sarovar login', // Subject line
                                    text: 'Generated new password', // plaintext body
                                    html: '<b>'+passwordstring+'</b>' // html body
                                };

                                mailsmtp.sendmail(mailOptions,function (err,sentmailstatus) {

                                });
                                user.save(function (err,saved) {

                                    if(!err){

                                        return res.status(200).send({message:"Successfully registered",response:user, usercode:usercode});

                                        // return res.status(200).send(user);
                                    }
                                    else{
                                        return res.status(500).send(err);
                                    }
                                });
                            }
                            else{
                                res.status(500).send({error:'User not registered'});
                            }
                        });

                        ////
                    }
                });
            }
        });
    },

    extendcheckout: function (req, res) {
        if(!req.body) {
            return res.status(400).send({error: "Body should not be empty"});
        }
        if (!req.body.guesttoken) {
            return res.status(400).send({error: "usercode is required"});
        }
        if(!req.body.checkoutdate){
            return res.status(400).send({error: "checkout date is required"});
        }
        User.findOneAndUpdate({guesttoken:req.body.guesttoken}, {checkoutdate: req.body.checkoutdate}, function (err, result) {
            if(err){
                res.status(500).send(err);
            }
            else{
                res.status(200).send({message: "updated the checkoutdate successfully"});
            }
        });
    }
};
