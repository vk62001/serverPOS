const { cajas, updateCajas } = require("../controllers/cajas");

const router = require("express").Router();

router.post("/", cajas);

router.put("/", updateCajas);

module.exports = router;
