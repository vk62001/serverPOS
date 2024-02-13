const {
  getInfo,
  axiosInsertData,
  axiosUpdateData,
} = require("../utils/axiosfn");

const deposito = async (req, res) => {
  // console.log('post')
  const { code, id } = req.body;
  // console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Depositos", id);
    // console.log(objData, "-", 16);

    if(objData.length===0)
      return;
    setTimeout(() => {
      axiosInsertData("Depositos", objData[0], id);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

const updateDeposito = async (req, res) => {
  // console.log('put')
  const { id } = req.body;
  // console.log(id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Depositos", id);
    
    // console.log(objData, "- 37");
     if(objData.length===0)
      return;
    setTimeout(() => {
      axiosUpdateData("Depositos", id, objData[0]);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

module.exports = {
  deposito,
  updateDeposito,
};
