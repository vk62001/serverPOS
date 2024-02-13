const {
  getInfo,
  axiosInsertData,
  axiosUpdateData,
} = require("../utils/axiosfn");
const { eliminarPropiedadesVacias } = require("../utils/utils");

const ventas = async (req, res) => {
  const { code, id } = req.body;
  // console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Ventas", id);
    //console.log(objData, "-");
    const objTemp = eliminarPropiedadesVacias(objData[0]);
    // console.log("objTemp", objTemp);
    setTimeout(() => {
      axiosInsertData("Ventas", objTemp, id);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

const updateVentas = async (req, res) => {
  const { id } = req.body;
  // console.log(id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Ventas", id);
    // console.log(objData, "-");
    const objTemp = eliminarPropiedadesVacias(objData[0]);
    setTimeout(() => {
      axiosUpdateData("Ventas", id, objTemp);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

module.exports = {
  ventas,
  updateVentas,
};
