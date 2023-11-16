const {
  getInfo,
  axiosInsertData,
  axiosUpdateData,
} = require("../utils/axiosfn");

const kardex = async (req, res) => {
  const { code, id } = req.body;
  // console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Kardex", id);
    // console.log(objData, "-");

    if(objData.length===0)
      return;
    setTimeout(() => {
      axiosInsertData("Kardex", objData[0], id);
    }, 200);
  }, 500);

  res.status(200).send({ ok: true });
};

const updateKardex = async (req, res) => {
  const { id } = req.body;
  // console.log(id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Kardex", id);
    // console.log(objData, "-");

    if(objData.length===0)
      return;
    setTimeout(() => {
      axiosUpdateData("Kardex", id, objData[0]);
    }, 200);
  }, 500);

  res.status(200).send({ ok: true });
};

module.exports = {
  kardex,
  updateKardex,
};
