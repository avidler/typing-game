const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scoreboardSchema = new Schema({
    username: { type: String, required: true },
    score: { type: Number, required: true },
    
   
},{
        timestamps: true,
   
})

const Scoreboard = mongoose.model('Scoreboard', scoreboardSchema)

module.exports = Scoreboard