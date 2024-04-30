const {
  getInfo,
  axiosInsertData,
  axiosUpdateData,
} = require("../utils/axiosfn");

const historialCajero = async (req, res) => {
  const { code, id } = req.body;
  // console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }

  setTimeout(async () => {
    const objData = await getInfo("HistorialesCajeros", id);
    // console.log(objData, "-");

    if(objData.length===0)
      return;
    setTimeout(() => {
      axiosInsertData("HistorialesCajeros", objData[0], id);
    }, 200);
  }, 1000);
  res.status(200).send({ ok: true });
};

const updateHistorialCajero = async (req, res) => {
  const { id } = req.body;
  // console.log(req.body, "- body");
  // console.log(id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("HistorialesCajeros", id);
    // console.log(objData, "-");

    if(objData.length===0)
      return;
    setTimeout(() => {
      axiosUpdateData("HistorialesCajeros", id, objData[0]);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

module.exports = {
  historialCajero,
  updateHistorialCajero,
};
