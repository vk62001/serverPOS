const {
  getInfo,
  socketInsertData,
  socketUpdateData,
} = require("../utils/axiosfn");

const inventario = async (req, res) => {
  // console.log("post");
  const { code, id, uuid } = req.body;
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
      socketInsertData("Inventarios", objData[0], id, uuid);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

const updateInventario = async (req, res) => {
  // console.log("put");
  const { id, uuid } = req.body;
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
      socketUpdateData("Inventarios", id, objData[0], uuid);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

module.exports = {
  inventario,
  updateInventario,
};
