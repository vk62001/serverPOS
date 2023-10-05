const { ventas} = require('../controllers/ventas');

const router = require('express').Router();
router.post('/', ventas);

module.exports = router