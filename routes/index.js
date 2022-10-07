const router = require('express').Router();

const players = require('./players')
 
router.get('/', (req, res) => {
    res.json({'info': 'Welcome to football API!'})
});


router.use('/players', players)

module.exports = router;