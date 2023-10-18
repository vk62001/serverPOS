const { ajuste, updateAjuste } = require("../controllers/ajuste");

const router = require("express").Router();

router.post("/", ajuste);

router.put("/", updateAjuste);

module.exports = router;
