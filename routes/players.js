const router = require('express').Router();

const { createPlayer} = require('../controllers/players')


router.post('/', createPlayer)

module.exports = router;