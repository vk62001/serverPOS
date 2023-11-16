const {
  getInfo,
  axiosInsertData,
  axiosUpdateData,
} = require("../utils/axiosfn");

const retiroCaja = async (req, res) => {
  const { code, id } = req.body;
  // console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("RetirosCaja", id);
    // console.log(objData, "-");

    setTimeout(() => {
      axiosInsertData("RetirosCaja", objData[0], id);
    }, 200);
  }, 500);

  res.status(200).send({ ok: true });
};

const updateRetiroCaja = async (req, res) => {
  const { id } = req.body;
  // console.log(id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("RetirosCaja", id);
    // console.log(objData, "-", id);

    setTimeout(() => {
      axiosUpdateData("RetirosCaja", id, objData[0]);
    }, 200);
  }, 500);

  res.status(200).send({ ok: true });
};

module.exports = {
  retiroCaja,
  updateRetiroCaja,
};
