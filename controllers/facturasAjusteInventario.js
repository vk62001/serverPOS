const {
  getInfo,
  axiosInsertData,
  axiosUpdateData,
} = require("../utils/axiosfn");

const facturasAjusteInventario = async (req, res) => {
  const { code, id } = req.body;
  console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("FacturasAjustesInventarios", id);
    console.log(objData, "-");

    setTimeout(() => {
      axiosInsertData("FacturasAjustesInventarios", objData[0], id);
    }, 200);
  }, 500);

  res.status(200).send({ ok: true });
};

const updateFacturasAjusteInventario = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("FacturasAjustesInventarios", id);
    console.log(objData, "-");

    setTimeout(() => {
      axiosUpdateData("FacturasAjustesInventarios", id, objData[0]);
    }, 200);
  }, 500);

  res.status(200).send({ ok: true });
};

module.exports = {
  facturasAjusteInventario,
  updateFacturasAjusteInventario,
};
