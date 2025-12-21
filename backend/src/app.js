const express = require("express")
const cors = require("cors")
require("dotenv").config()
const connectDB = require("./config/db");
connectDB();

const app = express()
app.use(cors())
app.use(express.json())

const authRoutes = require("./routes/auth.routes")
app.use("/auth", authRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}`)
})
