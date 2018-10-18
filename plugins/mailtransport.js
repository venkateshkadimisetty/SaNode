/**
 * Created by paradigmcreatives on 7/28/16.
 */

var nodemailer = require('nodemailer');

module.exports={
    sendmail: function (mailobject,cb) {



// create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport('smtps://sarovarmail@gmail.com:Sarovar@123@smtp.gmail.com');
        var temp = process.cwd() + 'data.xlsx';
        console.log('temp path is ',temp);

// setup e-mail data with unicode symbols


// send mail with defined transport object
        transporter.sendMail(mailobject, function(error, info){
            if(error){
                return console.log(error);
            }

            cb(null,info);
            console.log('Message sent: ' + info.response);
        });
    }
};
