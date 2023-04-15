const { deposito, updateDeposito } = require("../controllers/deposito");

const router = require("express").Router();

router.post("/", deposito);

router.put("/", updateDeposito);

module.exports = router;
