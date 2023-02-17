const router = require("express").Router();
const apertura = require('./apertura');

router.use('/apertura', apertura);


module.exports=router