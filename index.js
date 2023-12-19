const express = require("express")
const dotenv = require("dotenv")
const {sequelize, connectDb} = require('./config/db');
const userRouter = require("./routes/user")

const app = express()

dotenv.config()

app.use(express.json())

sequelize.sync().then(() => {
    console.log('Database synced');
  })

// getCurrentTemperature()

app.use("/api/user", userRouter )

// app.use("/api/customer", customerRouter )

// app.use("/api/genre", genreRouter )

// app.use("/api/movie", movieRouter )


app.listen(process.env.PORT, () => {
    console.log(`Server listening to port ${process.env.PORT}`)
})