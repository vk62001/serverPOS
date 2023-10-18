const {
  getInfo,
  axiosInsertData,
  axiosUpdateData,
} = require("../utils/axiosfn");

const apertura = async (req, res) => {
  console.log('post')
  const { code, id } = req.body;
  console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("AperturasTiendas", id);
    console.log(objData,objData.length, "-", 18);

    if(objData.length===0)
      return;
    setTimeout(() => {
      axiosInsertData("AperturasTiendas", objData[0], id);
    }, 200);
  }, 500);

  res.status(200).send({ ok: true });
};

const updateApertura = async (req, res) => {
  console.log('put')
  const { id } = req.body;
  console.log(id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("AperturasTiendas", id);
    
    console.log(objData, "- 37");
    if(objData.length===0)
      return;
    setTimeout(() => {
      axiosUpdateData("AperturasTiendas", id, objData[0]);
    }, 200);
  }, 500);

  res.status(200).send({ ok: true });
};

module.exports = {
  apertura,
  updateApertura,
};
