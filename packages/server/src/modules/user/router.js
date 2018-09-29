import express from "express"
import * as controllers from "./controllers"
const router = express.Router()

// POST /user/sign-in
router.post("/sign-in", controllers.signIn)

// POST /user/sign-up
router.post("/sign-up", controllers.signUp)

// POST /user/verify
router.post("/verify", controllers.verify)

export default router
