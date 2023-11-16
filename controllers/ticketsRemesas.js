const {
  getInfo,
  axiosInsertData,
  axiosUpdateData,
} = require("../utils/axiosfn");

const ticketsRemesas = async (req, res) => {
  const { code, id } = req.body;
  // console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("TicketsRemesas", id);
    // console.log(objData, "-");

    setTimeout(() => {
      //axiosInsertTicketsRemesas(objData[0], id); //
      axiosInsertData("TicketsRemesas", objData[0], id); //
    }, 200);
  }, 500);

  res.status(200).send({ ok: true });
};

const updateTicketsRemesas = async (req, res) => {
  const { id } = req.body;
  // console.log(id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("TicketsRemesas", id);
    // console.log(objData, "-");

    setTimeout(() => {
      //axiosUpdateTicketsRemesas(id, objData[0]);
      axiosUpdateData("TicketsRemesas", id, objData[0]);
    }, 200);
  }, 500);

  res.status(200).send({ ok: true });
};

module.exports = {
  ticketsRemesas,
  updateTicketsRemesas,
};
