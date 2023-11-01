const {
  devolucionVenta,
  updateDevolucionVenta,
} = require("../controllers/devolucionVenta");

const router = require("express").Router();

router.post("/", devolucionVenta);

router.put("/", updateDevolucionVenta);

module.exports = router;
