/**
 * Created by paradigmcreatives on 8/1/16.
 */

var mongoose = require('mongoose');

var upload = mongoose.model('upload');

module.exports = {

    save: function (req, res) {
        if (req.body.length > 5) {
            res.status(500).send({msg:"Exceeded the maximum length"});
        }
        else {
            for (var i = 0; i < req.body.length; i++) {
                var imageobject = new upload(req.body[i]);
                imageobject.save(function (err, result) {
                    if (err) {
                        console.log(err);

                    } else {
                        console.log('success');
                    }

                })

            }
            res.status(200).send({msg:"upload success"});
        }
    },
    fetch: function (req, res) {
        upload.find({}, function (err, result) {
            if (err) {
                return res.status(500).send(err);
            } else {
                res.status(200).send(result);
            }
        })
    },
    deleteimage:function (req, res) {
        upload.remove({_id:req.body._id}, function (err, result) {
            if(err){
                return res.status(500).send(err);
            }
            return res.status(200).send({msg:"successfully removed"});
        });
    }
}
