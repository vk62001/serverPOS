const { usuarios, updateUsuarios } = require("../controllers/usuarios");

const router = require("express").Router();

router.post("/", usuarios);

router.put("/", updateUsuarios);

module.exports = router;
