const router = require('express').Router();

const players = require('./players')
const tournaments = require('./tournaments')

 
router.get('/', (req, res) => {
    res.json({'info': 'Welcome to football API!'})
});


router.use('/players', players)
router.use('/tournaments', tournaments)


module.exports = router;