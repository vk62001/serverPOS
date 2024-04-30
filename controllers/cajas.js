const {
  getInfo,
  axiosInsertData,
  axiosUpdateData,
} = require("../utils/axiosfn");

const cajas = async (req, res) => {
  const { code, id } = req.body;
  // console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Cajas", id);
    // console.log(objData, "-");

    setTimeout(() => {
      axiosInsertData("Cajas", objData[0], id);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

const updateCajas = async (req, res) => {
  const { id } = req.body;
  // console.log(id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Cajas", id);
    // console.log(objData, "-");

    setTimeout(() => {
      axiosUpdateData("Cajas", id, objData[0]);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

module.exports = {
  cajas,
  updateCajas,
};
