const {
  facturasAjusteInventario,
  updateFacturasAjusteInventario,
} = require("../controllers/facturasAjusteInventario");

const router = require("express").Router();

router.post("/", facturasAjusteInventario);

router.put("/", updateFacturasAjusteInventario);

module.exports = router;
