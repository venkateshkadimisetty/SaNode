var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs'),
    SALT_WORK_FACTOR = 10;

module.exports = function (mongoose1) {

    var Schema = mongoose.Schema;

    var registartionSchema = new Schema({

        /*platform can be ios/android/web etc this is used for pushnotifications*/

        username: {type: String, required: true},
        email: {type:String,unique:true},
        phone: {type: String, unique: true},
        password: String,
        role: {type: String, required: true},
        dateofbirth: String,
        dateofanniversary: String,
        guesttoken: String,
        checkindate: {type: String, default: Date.now},
        checkoutdate: String,
        checkintime: String,
        platform: {type: String, required: true},
        roomnumber: String
    });

    registartionSchema.pre('save', function (next) {
        var user = this;
        console.log('pre save');
        console.log(user.password);

        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) return next();

        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) return next(err);

            // hash the password using our new salt
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);

                // override the cleartext password with the hashed one
                user.password = hash;
                console.log('hash');
                console.log(user.password);
                next();
            });
        });
    });

    registartionSchema.methods.comparePassword = function (candidatePassword, cb) {
        console.log('this password');
        console.log(this.password);
        console.log(candidatePassword);

        bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    };

    var User = mongoose.model('user', registartionSchema);

    return User;
}

