const { pedido, updatePedido } = require("../controllers/pedido");

const router = require("express").Router();

router.post("/", pedido);

router.put("/", updatePedido);

module.exports = router;
