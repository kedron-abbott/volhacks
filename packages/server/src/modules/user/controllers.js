import jwt from "jsonwebtoken"
import to from "await-to-js"
import config from "config"
import User from "./model"

export async function signIn(req, res) {
  let error,
    user

    // Get user
  ;[error, user] = await to(User.findOne({ email: req.body.email }))
  if (error || !user) return userNotFound(res)

  const isMatch = await user.comparePassword(req.body.password)
  if (!isMatch) return res.status(401).send({ message: "Unathorized." })
  else return res.status(200).send(createAuthPayload(user))
}

// Create a new user based on the form submission
export async function signUp(req, res) {
  let error
  const params = req.body

  // Create a new user based on form parameters
  const user = new User({
    fullName: params.fullName,
    email: params.email,
    phone: params.phone,
    countryCode: params.countryCode,
    password: params.password,
  })

  let newUser
  ;[error, newUser] = await to(user.save())
  if (error)
    return res.status(400).send({ message: "User already exists." })
    // If the user is created successfully, send them an account
    // verification token
  ;[error] = await to(user.sendAuthyToken())
  if (error) return cannotSendMessage(res)
  res.status(200).send({ user: newUser })
}

// Resend a code if it was not received
export async function resend(req, res) {
  let error,
    user

    // Get user
  ;[error, user] = await to(User.findById(req.params.id))
  if (error || !user)
    return userNotFound(res)

    // If we find the user, let's send them a new code
  ;[error] = await to(user.sendAuthyToken())
  if (error) return cannotSendMessage(res)

  res.sendStatus(200)
}

// Handle submission of verification token
export async function verify(req, res) {
  let error,
    user

    // Get user
  ;[error, user] = await to(User.findById(req.body.id))
  if (error || !user)
    return userNotFound(res)

    // If we find the user, let's send them a new code
  ;[error] = await to(user.verifyAuthyToken(req.body.code))
  if (error) return res.status(400).send({ message: "Cannot verify user." })

  user.verified = true
  let savedUser
  ;[error, savedUser] = await to(user.save())
  if (error) return serverError(res)

  const message = "You did it! Signup complete :)"
  ;[error] = await to(user.sendMessage(message))
  if (error) return cannotSendMessage(res)

  res.status(200).send(createAuthPayload(savedUser))
}

// Get user data
export async function get(req, res) {
  let error, user
  ;[error, user] = await to(User.findById(req.params.id))
  if (error || !user) return userNotFound(res)

  res.status(200).send({ user })
}

function userNotFound(res) {
  res.status(404).send({ message: "User not found." })
}

function cannotSendMessage(res) {
  res.status(503).send({ message: "Cannot send message. Our bad :(" })
}

function serverError(res) {
  res.sendStatus(500)
}

function createAuthPayload(user) {
  return {
    token: jwt.sign({ userId: user.id }, config.jwtSecret),
    user,
  }
}
