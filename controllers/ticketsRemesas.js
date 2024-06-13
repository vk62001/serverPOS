const {
  getInfo,
  socketInsertData,
  socketUpdateData,
} = require("../utils/axiosfn");

const ticketsRemesas = async (req, res) => {
  const { code, id, uuid } = req.body;
  // console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("TicketsRemesas", id);
    // console.log(objData, "-");

    setTimeout(() => {
      socketInsertData("TicketsRemesas", objData[0], id, uuid);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

const updateTicketsRemesas = async (req, res) => {
  const { id, uuid } = req.body;
  // console.log(id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("TicketsRemesas", id);
    // console.log(objData, "-");

    setTimeout(() => {
      socketUpdateData("TicketsRemesas", id, objData[0], uuid);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

module.exports = {
  ticketsRemesas,
  updateTicketsRemesas,
};
