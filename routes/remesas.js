const { remesas, updateRemesas } = require("../controllers/remesas");

const router = require("express").Router();

router.post("/", remesas);

router.put("/", updateRemesas);

module.exports = router;
