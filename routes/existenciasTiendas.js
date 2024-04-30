const {
  existenciasTiendas,
  updateExistenciasTiendas,
} = require("../controllers/existenciasTiendas");

const router = require("express").Router();

router.post("/", existenciasTiendas);

router.put("/", updateExistenciasTiendas);

module.exports = router;
