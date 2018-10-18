/**
 * Created by paradigmcreatives on 9/27/16.
 */

var schedule = require('node-schedule');
var mongoose = require('mongoose');
var complaints = mongoose.model('issue');
var json2xls = require('json2xls');
var fs = require('fs');
var mailsmtp = require('../plugins/mailtransport');

module.exports = {

    scheduleTask:
    function () {
        console.log('outside scheduleTask!');

        //schedule.scheduleJob('0 0 1 * *', function(){

        schedule.scheduleJob('10 * * * * *', function(){

            console.log('scheduleJob!');
            complaints.find({},{guesttoken:1,_id:0,issuestatus:1,issuetype:1,message:1,requestedtime:1},function (err,result) {

               var JsonString =JSON.stringify(result);
                var xls = json2xls(JSON.parse(JsonString));
                fs.writeFileSync('data.xlsx', xls, 'binary');


                fs.readFile("./data.xlsx", function (err, data) {

                 var mailOptions = {
                        sender: 'sarovarmail@gmail.com',
                            to: 'sarovar@mailinator.com',
                        subject: 'Attachment!',
                        body: 'mail content...',
                        attachments: [{'filename': 'data.xlsx', 'content': data}]
                    };

                    mailsmtp.sendmail(mailOptions,function (err,sentmailstatus) {

                    });



                });




            });
            console.log('Your scheduled job at beginning of month');

        });




    }

}

