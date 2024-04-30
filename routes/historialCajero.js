const {
  historialCajero,
  updateHistorialCajero,
} = require("../controllers/historialCajero");

const router = require("express").Router();

router.post("/", historialCajero);

router.put("/", updateHistorialCajero);

module.exports = router;
