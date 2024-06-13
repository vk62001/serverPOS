const {
  getInfo,
  socketUpdateData,
  socketInsertData,
} = require("../utils/axiosfn");
const cupones = async (req, res) => {
  const { code, id, uuid } = req.body;
  // console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Cupones", id);
    // console.log(objData, "-");

    if (objData.length === 0) return;
    setTimeout(() => {
      socketInsertData("Cupones", objData[0], id, uuid);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

const updateCupones = async (req, res) => {
  const { id, uuid } = req.body;
  // console.log(id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Cupones", id);
    // console.log(objData, "-");

    if (objData.length === 0) return;
    setTimeout(() => {
      socketUpdateData("Cupones", id, objData[0], uuid);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

module.exports = {
  cupones,
  updateCupones,
};
