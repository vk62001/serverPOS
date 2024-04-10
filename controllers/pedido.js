const {
  getInfo,
  axiosInsertData,
  axiosUpdateData,
} = require("../utils/axiosfn");
const { validaPedido } = require("../utils/utils");

const pedido = async (req, res) => {
  const { code, id } = req.body;
  // console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Pedidos", id);
    // console.log(objData, "-");
    if (objData.length === 0) return;

    if (validaPedido(objData[0])) {
      setTimeout(() => {
        axiosInsertData("Pedidos", objData[0], id);
      }, 200);
    }
  }, 1000);

  res.status(200).send({ ok: true });
};

const updatePedido = async (req, res) => {
  console.log("update");
  const { id } = req.body;
  console.log(id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Pedidos", id);
    console.log(objData, "-");

    if (objData.length === 0) return;

    if (validaPedido(objData[0])) {
      setTimeout(() => {
        axiosUpdateData("Pedidos", id, objData[0]);
      }, 200);
    }
  }, 1000);

  res.status(200).send({ ok: true });
};

module.exports = {
  pedido,
  updatePedido,
};
