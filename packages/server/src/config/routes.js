import express from "express"
import userRouter from "modules/user/router"

const router = express.Router()

router.get("/ping", (req, res) => {
  res.status(200).send({})
})

router.use("/user", userRouter)

export default router
