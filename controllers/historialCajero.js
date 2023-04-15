const {
  getInfo,
  axiosInsertData,
  axiosUpdateData,
} = require("../utils/axiosfn");

const historialCajero = async (req, res) => {
  const { code, id } = req.body;
  console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }

  setTimeout(async () => {
    const objData = await getInfo("HistorialesCajeros", id);
    console.log(objData, "-");

    setTimeout(() => {
      axiosInsertData("HistorialesCajeros", objData[0], id);
    }, 200);
  }, 500);
  res.status(200).send({ ok: true });
};

const updateHistorialCajero = async (req, res) => {
  const { id } = req.body;
  console.log(req.body, "- body");
  console.log(id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("HistorialesCajeros", id);
    console.log(objData, "-");

    setTimeout(() => {
      axiosUpdateData("HistorialesCajeros", id, objData[0]);
    }, 200);
  }, 500);

  res.status(200).send({ ok: true });
};

module.exports = {
  historialCajero,
  updateHistorialCajero,
};
