import express from "express"
const router = express.Router()

// POST /user/sign-up
router.post("/sign-up", (req, res) => {
  console.log(req.body)
  res.status(200).send({})
})

export default router
