const router = require('express').Router()
let Scoreboard = require('../models/scoreboard.model')

router.route('/').get((req, res) => {
    Scoreboard.find()
    .then(scores => res.json(scores))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const username = req.body.username
    const score = req.body.score

    const newScore = new Exercise({username, score})

    newScore.save()
    .then(() => res.json('Score added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    Scoreboard.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Scoreboard.findByIdAndDelete(req.params.id)
    .then(() => res.json('Score deleted.'))
    .catch(err => res.status(400).json('Error: ' + err))
})


module.exports = router