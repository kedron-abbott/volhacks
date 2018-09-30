import mongoose from "mongoose"
import bcrypt from "bcrypt"
import config from "config"

// Create authenticated Authy and Twilio API clients
import Authy from "authy"
import twilio from "twilio"

const authy = Authy(config.authyKey)
const twilioClient = twilio(config.accountSid, config.authToken)

// Used to generate password hash
const SALT_WORK_FACTOR = 10

// Define user model schema
const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  countryCode: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  authyId: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

// Middleware executed before save - hash the user's password
UserSchema.pre("save", function(next) {
  const self = this

  // only hash the password if it has been modified (or is new)
  if (!self.isModified("password")) return next()

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err)

    // hash the password using our new salt
    bcrypt.hash(self.password, salt, function(err, hash) {
      if (err) return next(err)

      // override the cleartext password with the hashed one
      self.password = hash
      next()
    })
  })
})

// Test candidate password
UserSchema.methods.comparePassword = function(candidatePassword) {
  return new Promise(resolve => {
    const self = this
    bcrypt.compare(candidatePassword, self.password, function(err, isMatch) {
      if (err) return resolve(false)
      resolve(isMatch)
    })
  })
}

// Send a verification token to this user
UserSchema.methods.sendAuthyToken = function() {
  return new Promise((resolve, reject) => {
    let self = this

    if (!self.authyId) {
      // Register this user if it's a new user
      authy.register_user(self.email, self.phone, self.countryCode, function(
        err,
        response,
      ) {
        if (err || !response.user) return reject(err)
        self.authyId = response.user.id
        self.save(function(err, doc) {
          if (err || !doc) return reject(err)
          self = doc
          sendToken(self.authyId)
        })
      })
    } else {
      // Otherwise send token to a known user
      sendToken(self.authyId)
    }

    // With a valid Authy ID, send the 2FA token for this user
    function sendToken(authyId) {
      authy.request_sms(authyId, true, function(err, response) {
        if (err) reject(err)
        resolve()
      })
    }
  })
}

// Test a 2FA token
UserSchema.methods.verifyAuthyToken = function(otp) {
  return new Promise((resolve, reject) => {
    const self = this
    authy.verify(self.authyId, otp, function(error, response) {
      if (error) reject(error)
      resolve(response)
    })
  })
}

// Send a text message via twilio to this user
UserSchema.methods.sendMessage = async function(message) {
  const self = this
  const toNumber = `+${self.countryCode}${self.phone}`

  await twilioClient.messages.create({
    to: toNumber,
    from: config.twilioNumber,
    body: message,
  })
}

// Export user model
module.exports = mongoose.model("User", UserSchema)
