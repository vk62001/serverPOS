const { passwords, updatePasswords } = require("../controllers/passwords");

const router = require("express").Router();

router.post("/", passwords);

router.put("/", updatePasswords);

module.exports = router;
