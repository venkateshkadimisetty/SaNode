/**
 * Created by iOSSatish on 29/09/16.
 */

var mongoose = require('mongoose');

var escalation = mongoose.model('escalation');

module.exports = {

    createescalation:function (req,res) {
        var escalationobject = new escalation(req.body);

        escalationobject.save(function (err,result) {

            if(err){
                res.status(500).send(err);
            }
            else{
                res.status(200).send({msg: "successfully created escalation"});
            }
        });
    },

    fetchescalations: function (req, res) {
        escalation.find({},function (err,result) {
            if(err){
                res.status(500).send(err);
            }
            else{
                res.status(200).send(result);
            }
        });
    },

    deleteescalation: function (req, res) {
        escalation.remove({_id:req.body._id}, function (err, result) {
            if(err){
                return res.status(500).send(err);
            }
            return res.status(200).send({msg:"successfully removed the login"});
        });
    }
};
