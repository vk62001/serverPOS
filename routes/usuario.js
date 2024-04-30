const { usuario, updateUsuario } = require("../controllers/usuario");

const router = require("express").Router();

router.post("/", usuario);

router.put("/", updateUsuario);

module.exports = router;
