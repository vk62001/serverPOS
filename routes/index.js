const router = require("express").Router();
const deposito = require("./deposito");
const apertura = require("./apertura");
const historialCajero = require("./historialCajero");
const retiroCaja = require("./retiroCaja");
const remesas = require("./remesas");
const ticketsRemesas = require("./ticketsRemesas");
const kardex = require("./kardex");
const facturaAjusteInventario = require("./facturasAjusteInventario");
const existenciasTienda = require("./existenciasTiendas");
const cupones = require("./cupones");
const cajas = require("./cajas");
const usuarios = require("./usuarios");
const passwords = require("./passwords");

const ventas = require("./ventas");

router.use("/apertura", apertura);
router.use("/deposito", deposito);
router.use("/historialCajero", historialCajero);
router.use("/retiroCaja", retiroCaja);
router.use("/remesas", remesas);
router.use("/ticketsRemesas", ticketsRemesas);
router.use("/kardex", kardex);
router.use("/facturaAjusteInventario", facturaAjusteInventario);
router.use("/existenciasTienda", existenciasTienda);
router.use("/cupones", cupones);
router.use("/cajas", cajas);
router.use("/usuarios", usuarios);
router.use("/passwords", passwords);

router.use("/ventas", ventas);

module.exports = router;
