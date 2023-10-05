const { log} = require('../controllers/log');

const router = require('express').Router();
router.post('/', log);

module.exports = router