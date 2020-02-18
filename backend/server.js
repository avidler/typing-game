const express = require('express')

const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


const uri = process.env.ATLAS_URI

const config = require('../../config/mongo');
const env = process.env.NODE_ENV || 'development';
const localUrl = 'mongodb://${config[env].host}/${config[env].dbName}';
const prodUrl = config[env]['env-variable'];
const connectionUrl = prodUrl ? prodUrl : localUrl;
const connect = mongoose.connect(connectionUrl, {
useNewUrlParser: true
});
module.exports = connect;



//mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })


const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB databse connection established successfully")
})

const scoreboardRouter = require("./routes/scoreboard")

app.use('/scoreboard', scoreboardRouter)

app.listen(port, () => {
    console.log(`Server is running on port:  ${port}`)
})
