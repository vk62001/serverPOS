const { cierre} = require('../controllers/cierre');

const router = require('express').Router();
router.post('/', cierre);

module.exports = router