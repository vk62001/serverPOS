const { apertura, updateApertura } = require('../controllers/apertura');

const router = require('express').Router();

router.post('/', apertura);

router.put('/', updateApertura);

module.exports = router