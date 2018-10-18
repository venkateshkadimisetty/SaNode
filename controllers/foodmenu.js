/**
 * Created by paradigmcreatives on 8/1/16.
 */

var mongoose = require('mongoose');

var foodmenu = mongoose.model('foodmenu');
var order = mongoose.model('order');

module.exports = {

    save: function (req, res) {
        for (var i = 0; i < req.body.length; i++) {
            var errArray = new Array();
            var menuObject = new foodmenu(req.body[i]);
            menuObject.save(function (err, result) {
                if (err) {
                    errArray.push(i);
                }
            })
         }
        if(errArray.length === req.body.length){
            return res.status(500).send({
              error: "failed to save the menu"
            });
        }
        res.status(200).send({msg:"Success", error:errArray});
    },
    fetch: function (req, res) {
        foodmenu.find({}, function (err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(result);
            }
        })
    },

    update: function (req, res) {
        foodmenu.update({_id:req.body._id}, req.body, function (err,result) {
            if(err){
               return res.status(500).send(err);
            }else{
               return res.status(200).send({msg:"updated successfully"});
            }
        });
    },

    delete: function (req, res) {
        foodmenu.remove({_id:req.body._id}, function (err, result) {
            if(err){
                return res.status(500).send(err);
            }
            return res.status(200).send({msg:"successfully removed"});
        });
    },

    placeorder:function (req, res) {

        if(!req.body){
            return res.status(500).send("order should not be empty");
        }
        var orderArray = new Array();
        for (var i = 0; i < req.body.length; i++) {
            var orderobject = new order(req.body[i]);
            orderArray.push(orderobject);
        }
        res.status(200).send({msg:"Order placed successfully"});
    }
}
