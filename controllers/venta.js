const {
  getInfo,
  socketInsertData,
  socketUpdateData,
} = require("../utils/axiosfn");
const { eliminarPropiedadesVacias } = require("../utils/utils");

const ventas = async (req, res) => {
  const { code, id, uuid } = req.body;
  // console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Ventas", id);
    if (objData?.length === 0) return;
    // console.log(objData, "-");
    const objTemp = eliminarPropiedadesVacias(objData[0]);
    // console.log("objTemp", objTemp);
    setTimeout(() => {
      socketInsertData("Ventas", objTemp, id, uuid);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

const updateVentas = async (req, res) => {
  const { id, uuid } = req.body;
  // console.log(id, uuid);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Ventas", id);
    // console.log(objData, "-");
    const objTemp = eliminarPropiedadesVacias(objData[0]);
    setTimeout(() => {
      socketUpdateData("Ventas", id, objData[0], uuid);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

module.exports = {
  ventas,
  updateVentas,
};
