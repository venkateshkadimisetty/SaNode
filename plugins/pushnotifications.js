/**
 * Created by paradigmcreatives on 8/8/16.
 */

var mongoose = require('mongoose');

var apn = require('apn');
var fs = require('fs');
var device = mongoose.model('device');

    module.exports = {

    sendApns: function (devicetokens, notificationmsg, notificationtitle, modulename) {


        var certPem = fs.readFileSync(__dirname + '/certificates/cert.pem');
        var keyPem = fs.readFileSync(__dirname + '/certificates/key.pem');
        var options = {
            cert: certPem,
            key: keyPem,
            //passphrase: "pass1234"
            production: false

        };
        var apnConnection = new apn.Connection(options);

        apnConnection.on("completed", function () {
            console.log("Completed!")
        });
        apnConnection.on('disconnected', function (arguments) {
            console.log("Disconnected", arguments);
        });
        apnConnection.on('error', function (err) {
            console.log("Standard error", err);
        });
        apnConnection.on('socketError', function (err) {
            console.log("Socket error", err.message);
        });
        apnConnection.on('timeout', function () {
            console.log("Timeout");
        });
        apnConnection.on('transmissionError', function (err) {
            console.log("Transmission Error", err);
        });


        for(var i=0; i < devicetokens.length; i++){
            var deviceid = devicetokens[i];
            console.log("devicedeedede", deviceid);
            var myDevice = new apn.Device(deviceid);
            var note = new apn.Notification();

            note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
            note.badge = 0;
            note.alert = {
                title: notificationtitle,
                body: notificationmsg,
                module: modulename
            };
            // note.payload = {
            //     "data":"haiiiii"
            // };
            apnConnection.pushNotification(note, myDevice);
        }


    }
};