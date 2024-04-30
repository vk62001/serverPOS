const { cupones, updateCupones } = require("../controllers/cupones");

const router = require("express").Router();

router.post("/", cupones);

router.put("/", updateCupones);

module.exports = router;
