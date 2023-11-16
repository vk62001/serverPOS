const {
  getInfo,
  axiosInsertData,
  axiosUpdateData,
} = require("../utils/axiosfn");

const remesas = async (req, res) => {
  const { code, id } = req.body;
  // console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Remesas", id);
    // console.log(objData, "-", 22);

    setTimeout(() => {
      axiosInsertData("Remesas", objData[0], id);
    }, 200);
  }, 500);

  res.status(200).send({ ok: true });
};

const updateRemesas = async (req, res) => {
  const { id } = req.body;
  // console.log(id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Remesas", id);
    // console.log(objData, "-");

    setTimeout(() => {
      axiosUpdateData("Remesas", id, objData[0]);
    }, 200);
  }, 500);

  res.status(200).send({ ok: true });
};

module.exports = {
  remesas,
  updateRemesas,
};
