const {
  getInfo,
  socketUpdateData,
  socketInsertData,
} = require("../utils/axiosfn");

const cajas = async (req, res) => {
  const { code, id, uuid } = req.body;
  // console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Cajas", id);
    // console.log(objData, "-");

    setTimeout(() => {
      socketInsertData("Cajas", objData[0], id, uuid);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

const updateCajas = async (req, res) => {
  const { id, uuid } = req.body;
  // console.log(id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Cajas", id);
    // console.log(objData, "-");

    setTimeout(() => {
      socketUpdateData("Cajas", id, objData[0], uuid);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

module.exports = {
  cajas,
  updateCajas,
};
