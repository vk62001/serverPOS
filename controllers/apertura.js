
const { axiosUpdateApertura, getInfo, axiosInsertApertura } = require("../utils/axiosfn");

const apertura = async (req, res) => {
  const { code, id } = req.body;
  console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo(id);
    console.log(objData, "-");

    setTimeout(() => {
      axiosInsertApertura(objData[0], id);
    }, 200);
  }, 500);

  res.status(200).send({ ok: true });
};


const updateApertura = async (req, res) => {
  const { id } = req.body;
  console.log(id)
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  };
  setTimeout(async () => {
    const objData = await getInfo(id);
    console.log(objData, "-");

    setTimeout(() => {
      axiosUpdateApertura(id, objData[0]);
    }, 200);
  }, 500);

  res.status(200).send({ ok: true });
};

module.exports = {
  apertura,
  updateApertura,
};
