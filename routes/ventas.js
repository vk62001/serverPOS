const { ventas, updateVentas } = require("../controllers/ventas");

const router = require("express").Router();

router.post("/", ventas);

router.put("/", updateVentas);

module.exports = router;
