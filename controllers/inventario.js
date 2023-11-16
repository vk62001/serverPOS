const {
  getInfo,
  axiosInsertData,
  axiosUpdateData,
} = require("../utils/axiosfn");

const inventario = async (req, res) => {
  // console.log("post");
  const { code, id } = req.body;
  // console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Inventarios", id);
    // console.log(objData, objData.length, "-", 18);

    if (objData.length === 0) return;
    setTimeout(() => {
      axiosInsertData("Inventarios", objData[0], id);
    }, 200);
  }, 500);

  res.status(200).send({ ok: true });
};

const updateInventario = async (req, res) => {
  // console.log("put");
  const { id } = req.body;
  // console.log(id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Inventarios", id);

    // console.log(objData, "- 37");
    if (objData.length === 0) return;
    setTimeout(() => {
      axiosUpdateData("Inventarios", id, objData[0]);
    }, 200);
  }, 500);

  res.status(200).send({ ok: true });
};

module.exports = {
  inventario,
  updateInventario,
};
