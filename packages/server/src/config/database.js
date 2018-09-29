import mongoose from "mongoose"
import config from "./index"

async function connectDatabase() {
  try {
    mongoose.set("useCreateIndex", true)
    await mongoose.connect(
      config.databaseUrl,
      {
        useNewUrlParser: true,
      },
    )

    console.log("Database connected")
  } catch (error) {
    console.error(`Database connection error: ${error}`)
  }
}

connectDatabase()
