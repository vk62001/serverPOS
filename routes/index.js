const router = require("express").Router();
const apertura = require('./apertura');
const cajero = require('./cajero');
const cierre = require('./cierre');
const compras = require('./compras');
const pedidos = require('./pedidos');
const ventas = require('./ventas');
const log = require('./log');

router.use('/apertura', apertura);
router.use('/cajero', cajero);
router.use('/cierre', cierre);
router.use('/compras', compras);
router.use('/pedidos', pedidos);
router.use('/ventas', ventas);
router.use('/log', log);


module.exports=router