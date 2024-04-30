const { kardex, updateKardex } = require("../controllers/kardex");

const router = require("express").Router();

router.post("/", kardex);

router.put("/", updateKardex);

module.exports = router;
