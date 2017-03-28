// app/models/FitUser.js
var mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
var Schema = mongoose.Schema;

var FitUserSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    facebook: String,
    twitter: String,
    google: String,
    tokens: Array,

    profile: {
        name: { type: Number, max: 100 },
        gender: String,
        height: Number,
        weight: Number,
        paid: Boolean,
        picture: String
    }
}, { timestamps: true });

/**
 * Password hash middleware.
 */
FitUserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
FitUserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

// /**
//  * Helper method for getting user's gravatar.
//  */
// FitUserSchema.methods.gravatar = function gravatar(size) {
//   if (!size) {
//     size = 200;
//   }
//   if (!this.email) {
//     return `https://gravatar.com/avatar/?s=${size}&d=retro`;
//   }
//   const md5 = crypto.createHash('md5').update(this.email).digest('hex');
//   return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
// };

module.exports = mongoose.model('FitUSer', FitUserSchema);
// module.exports = FitUSer;