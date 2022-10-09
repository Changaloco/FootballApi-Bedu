const router = require('express').Router();

const players = require('./players')
const tournaments = require('./tournaments')
const usuarios = require('./usuarios');
const teams = require('./teams');
 
router.get('/', (req, res) => {
    res.json({'info': 'Welcome to football API!'})
});


router.use('/players', players);
router.use('/tournaments', tournaments);
router.use('/usuarios', usuarios);
router.use('/teams', teams);


module.exports = router;