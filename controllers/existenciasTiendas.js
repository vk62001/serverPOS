const {
  getInfo,
  socketInsertData,
  socketUpdateData,
} = require("../utils/axiosfn");

const existenciasTiendas = async (req, res) => {
  const { code, id, uuid } = req.body;
  // console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("ExistenciasTiendas", id);
    // console.log(objData, "-");

    if (objData.length === 0) return;
    setTimeout(() => {
      socketInsertData("ExistenciasTiendas", objData[0], id, uuid);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

const updateExistenciasTiendas = async (req, res) => {
  const { id, uuid } = req.body;
  // console.log(id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("ExistenciasTiendas", id);
    // console.log(objData, "-");

    if (objData.length === 0) return;
    setTimeout(() => {
      socketUpdateData("ExistenciasTiendas", id, objData[0], uuid);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

module.exports = {
  existenciasTiendas,
  updateExistenciasTiendas,
};
