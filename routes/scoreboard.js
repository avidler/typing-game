const router = require('express').Router()
let Scoreboard = require('../models/scoreboard.model')

router.route('/').get((req, res) => {
    Scoreboard.find().sort({ score: -1}).limit(10)
    .then(scores => res.json(scores))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const username = req.body.username
    const score = req.body.score

    const newScore = new Scoreboard({username, score})

    newScore.save()
    .then(() => res.json('Score added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})




module.exports = router