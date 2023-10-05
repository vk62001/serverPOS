const { compras} = require('../controllers/compras');

const router = require('express').Router();
router.post('/', compras);

module.exports = router