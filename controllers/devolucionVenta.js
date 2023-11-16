const {
  getInfo,
  axiosInsertData,
  axiosUpdateData,
} = require("../utils/axiosfn");

const devolucionVenta = async (req, res) => {
  const { code, id } = req.body;
  // console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("DevolucionesVentas", id);
    // console.log(objData, "-");

    if (objData.length === 0) return;
    setTimeout(() => {
      axiosInsertData("DevolucionesVentas", objData[0], id);
    }, 200);
  }, 500);

  res.status(200).send({ ok: true });
};

const updateDevolucionVenta = async (req, res) => {
  const { id } = req.body;
  // console.log(id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("DevolucionesVentas", id);
    // console.log(objData, "-");

    if (objData.length === 0) return;
    setTimeout(() => {
      axiosUpdateData("DevolucionesVentas", id, objData[0]);
    }, 200);
  }, 500);

  res.status(200).send({ ok: true });
};

module.exports = {
  devolucionVenta,
  updateDevolucionVenta,
};
