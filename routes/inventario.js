const { inventario, updateInventario } = require("../controllers/inventario");

const router = require("express").Router();

router.post("/", inventario);

router.put("/", updateInventario);

module.exports = router;
