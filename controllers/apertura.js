const { default: axios } = require("axios");
const { axiosUpdateApertura, getInfo } = require("../utils/axiosfn");
const URICentral = process.env.URi_central;
const URILocal = process.env.URi_local;

const apertura = async (req, res) => {
  const { code, id } = req.body;
  console.log(code, id);
  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  }

  setTimeout(async () => {
    const objData = await axios
      .get(`${URILocal}api/v1/AperturasTiendas/${id}`)
      .then((res) => {
        return res.data.datas;
      })
      .catch((err) => console.log(err));

    console.log(objData, "-");
    const config = {
      method: "post",
      url: `${URICentral}api/v1/AperturasTiendas/`,
      headers: {
        Authorization: `Basic ${process.env.credentials}`,
        "Content-Type": "application/json",
      },
      data: objData[0],
    };

    setTimeout(() => {
      // axios(config)
      //   .then(function (response) {
      //     console.log(JSON.stringify(response.data, "--"));
      //     console.log("log salvado");
      //   })
      //   .catch(function (error) {
      //     console.log(error, "errado");
      //     // res.status(200).send({ok:true})
      //   });
      axiosUpdateApertura(objData[0]);
    }, 200);
  }, 500);

  res.status(200).send({ ok: true });
};

const updateApertura = async (req, res) => {
  const { id } = req.body;

  if (id === undefined) {
    res.status(200).send({ ok: true });
    return;
  };
  const objData = await getInfo(id);

  setTimeout(() => {
    axiosUpdateApertura(id, objData[0]);
  }, 200);

  res.status(200).send({ ok: true });
};

module.exports = {
  apertura,
  updateApertura,
};
