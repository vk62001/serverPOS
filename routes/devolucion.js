const { devolucion, updateDevolucion } = require("../controllers/devolucion");

const router = require("express").Router();

router.post("/", devolucion);

router.put("/", updateDevolucion);

module.exports = router;
