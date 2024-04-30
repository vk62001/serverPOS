const { password, updatePassword } = require("../controllers/password");

const router = require("express").Router();

router.post("/", password);

router.put("/", updatePassword);

module.exports = router;
