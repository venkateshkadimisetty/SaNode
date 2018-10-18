/**
 * Created by iOSSatish on 17/10/16.
 */

var express = require('express');
var router = express.Router();
var gcm = require('node-gcm');

var message = new gcm.Message();
// router.post('/', function(req, res) {
//     message.addData('message', req.body.messages);
//     var regTokens = [req.body.regid];
//     var sender = new gcm.Sender("AIzaSyD9v6Hscisbxa_6hurX134dEWoBNMhIFDs");
//     sender.send(message, { registrationTokens: regTokens }, function (err, response) {
//         if(err){
//             console.log(err);
//             res.render('index', { title: 'Failed to sent notification  '+err });
//         }
//         else{
//             console.log(response);
//             res.render('index', { title: 'Notification sent.' });
//         }
//     });
// });
// module.exports = router;


module.exports = {
    sendnotifications: function (devicetokens, obj) {


        message.addData("message", obj);
        var regTokens = devicetokens;
        var sender = new gcm.Sender("AIzaSyD9v6Hscisbxa_6hurX134dEWoBNMhIFDs");
        sender.send(message, { registrationTokens: regTokens }, function (err, response) {
            if(err){
                console.log(err);
                // res.render('index', { title: 'Failed to sent notification  '+err });
                // res.send('index', { title: 'Failed to sent notification  '+err });
            }
            else{
                console.log("notification sent");
                console.log(response);
                // res.render('index', { title: 'Notification sent.' });
                // res.send('index', { title: 'Notification sent.' });
            }
        });
    }
};



