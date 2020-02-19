const express = require('express')

const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const path = require('path')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'client', 'build')))


const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })


const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB databse connection established successfully")
})

const scoreboardRouter = require("./routes/scoreboard")

app.use('/scoreboard', scoreboardRouter)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(port, () => {
    console.log(`Server is running on port:  ${port}`)
})