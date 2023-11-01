const {
  pedidoProveedor,
  updatePedidoProveedor,
} = require("../controllers/pedidoProveedor");

const router = require("express").Router();

router.post("/", pedidoProveedor);

router.put("/", updatePedidoProveedor);

module.exports = router;
