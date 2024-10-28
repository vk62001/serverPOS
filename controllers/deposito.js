const {
  getInfo,
  socketInsertData,
  socketUpdateData,
} = require("../utils/axiosfn");

const deposito = async (req, res) => {
  // console.log('post')
  const { code, id, uuid } = req.body;
  // console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Depositos", id);
    // console.log(objData, "-", 16);

    if (objData.length === 0) return;
    setTimeout(() => {
      socketInsertData("Depositos", objData[0], id, uuid);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

const updateDeposito = async (req, res) => {
  // console.log('put')
  const { id, uuid } = req.body;
  // console.log(id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Depositos", id);

    // console.log(objData, "- 37");
    if (objData.length === 0) return;
    setTimeout(() => {
      socketUpdateData("Depositos", id, objData[0], uuid);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

module.exports = {
  deposito,
  updateDeposito,
};
