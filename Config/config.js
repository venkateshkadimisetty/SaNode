
module.exports = {
    MONGO_SERVER_URL:'mongodb://sarovar:sarovar123@ds215822.mlab.com:15822/sarovar',

    //local DB URL
     // MONGO_SERVER_URL:'mongodb://localhost:27017/localDb',

    //production DB URL
    //   MONGO_SERVER_URL:'mongodb://herokuuser1:herokuaccess@23.23.80.76:27017/heroku_3chp5lzr',

    s3aws : function(){
        return {
            // AWS_ACCESS_KEY : 'AKIAIJ5S7ZASSSIGB43A',
            // AWS_SECRET_KEY : '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',
            // S3_BUCKET : 'sarovar-hotel',
            // AWS_REGION: 'ap-south-1'
            AWS_ACCESS_KEY : '',
            AWS_SECRET_KEY : '',
            S3_BUCKET : '',
            AWS_REGION: ''
        }
    }
};
