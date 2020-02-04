const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// build the basic model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

// before populating the user data in films, remove the password
userSchema
  .set('toJSON', {
    transform(doc, json) {
      delete json.password
      return json
    }
  })

// validate password method for login
// compare the string password with the hash password in the db
userSchema
  .methods
  .validatePassword = function validatePassword(password) {
    return bcrypt.compareSync(password, this.password)
  }

// set the virtual field for passwordConfirmation
userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

// check, before normal validate:
// if password is created or changed
// if passwords are the same
// invalidate if not (first argument: the field to invalidate, second argument: the error message)
// else go to next and save password
userSchema
  .pre('validate', function checkPassword(next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'does not match')
    }
    next()
  })

// hash the password before saving
// check if the password is created/changed
// use bcrypt and save hashed password
userSchema
  .pre('save', function hashPassword(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
    }
    next()
  })

module.exports = mongoose.model('User', userSchema)