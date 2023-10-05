const { pedidos} = require('../controllers/pedidos');

const router = require('express').Router();
router.post('/', pedidos);

module.exports = router