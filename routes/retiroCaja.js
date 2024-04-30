const { retiroCaja, updateRetiroCaja } = require("../controllers/retiroCaja");

const router = require("express").Router();

router.post("/", retiroCaja);

router.put("/", updateRetiroCaja);

module.exports = router;
