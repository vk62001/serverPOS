const {
  getInfo,
  socketInsertData,
  socketUpdateData,
} = require("../utils/axiosfn");

const devolucion = async (req, res) => {
  const { code, id, uuid } = req.body;
  // console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Devoluciones", id);
    // console.log(objData, "-");

    if (objData.length === 0) return;
    setTimeout(() => {
      socketInsertData("Devoluciones", objData[0], id, uuid);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

const updateDevolucion = async (req, res) => {
  const { id, uuid } = req.body;
  // console.log(id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Devoluciones", id);
    // console.log(objData, "-");

    if (objData.length === 0) return;
    setTimeout(() => {
      socketUpdateData("Devoluciones", objData[0], id, uuid);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

module.exports = {
  devolucion,
  updateDevolucion,
};
