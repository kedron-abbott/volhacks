// Config
import config from "config"
import "config/database"

import express from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
import cors from "cors"
import routes from "config/routes"

// App Setup
const app = express()
app.use(morgan("combined"))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: "*/*", limit: "200mb" }))
app.use("/", routes)

// Server Setup
const port = config.port
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
