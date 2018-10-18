/**
 * Created by iOSSatish on 18/10/16.
 */

var mongoose = require('mongoose');

var department = mongoose.model('department');

module.exports = {

    createdepartment:function (req,res) {

        var departmentobject = new department(req.body);

        departmentobject.save(function (err,result) {

            if(err){
                res.status(500).send(err);
            }
            else{
                res.status(200).send({msg: "successfully created"});
            }
        });
    },

    fetchdepartment: function (req, res) {
        department.find({},function (err,result) {
            if(err){
                res.status(500).send(err);
            }
            else{
                res.status(200).send(result);
            }
        });
    },

    deletedepartment: function (req, res) {
        department.remove({_id:req.body._id}, function (err, result) {
            if(err){
                return res.status(500).send(err);
            }
            return res.status(200).send({msg:"successfully removed the login"});
        });
    }
};
