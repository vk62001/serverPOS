const {
  getInfo,
  axiosInsertData,
  axiosUpdateData,
} = require("../utils/axiosfn");

const usuario = async (req, res) => {
  const { code, id } = req.body;
  // console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Usuarios", id);
    // console.log(objData, "-");

    setTimeout(() => {
      axiosInsertData("Usuarios", objData[0], id);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

const updateUsuario = async (req, res) => {
  const { id } = req.body;
  // console.log(id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Usuarios", id);
    // console.log(objData, "-");

    setTimeout(() => {
      axiosUpdateData("Usuarios", id, objData[0]);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

module.exports = {
  usuario,
  updateUsuario,
};
