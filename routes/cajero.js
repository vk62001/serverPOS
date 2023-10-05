const { cajero} = require('../controllers/cajero');

const router = require('express').Router();
router.post('/', cajero);

module.exports = router