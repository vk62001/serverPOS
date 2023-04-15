const {
  getInfo,
  axiosInsertData,
  axiosUpdateData,
} = require("../utils/axiosfn");

const deposito = async (req, res) => {
  const { code, id } = req.body;
  console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Depositos", id);
    console.log(objData, "-");

    setTimeout(() => {
      axiosInsertData("Depositos", objData[0], id);
    }, 200);
  }, 500);

  res.status(200).send({ ok: true });
};

const updateDeposito = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Depositos", id);

    setTimeout(() => {
      axiosUpdateData("Depositos", id, objData[0]);
    }, 200);
  }, 500);

  res.status(200).send({ ok: true });
};

module.exports = {
  deposito,
  updateDeposito,
};
