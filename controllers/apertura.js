const { default: axios } = require('axios');


const URICentral =  process.env.URi_central;
const URILocal = process.env.URi_local;

const apertura = async (req, res) => {

    const {code, id} = req.body
    console.log(code, id)
    if(id === undefined){
      res.status(200).send({ok:true});
      return;
    }
    //consultar base local
    

    //post
    const config = {
      method: 'post',
      url: `${URICentral}api/v1/AperturasTiendas/`,
      headers: { 
        'Authorization': 'Basic ZnRwc2FwOkluaWNpbzAx', 
        'Content-Type': 'application/json'
      },
    };
        setTimeout(()=>{
          axios(config)
          .then(function (response) {
          console.log(JSON.stringify(response.data, '--'));
            console.log('log salvado')
          })
          .catch(function (error) {
          console.log(error.data, 'errado');
          res.status(500)
      });
    }, 100);
    res.status(200).send({data:true});
};


const updateApertura = async  (req, res) => {
  const {code, id} = req.body;

  if(id === undefined){
    res.status(200).send({ok:true});
    return;
  };

  const objData =  await axios.get(`${URILocal}api/v1/AperturasTiendas/${id}`)
                      .then(res=>{
                        return res.data.datas
                      })
                      .catch(err=>console.log(err));
  const config = {
    method: 'put',
    url: `${URICentral}api/v1/AperturasTiendas/${id}`,
    headers: { 
      'Authorization': 'Basic ZnRwc2FwOkluaWNpbzAx', 
      'Content-Type': 'application/json'
    },
    data:objData[0]
  };

  setTimeout(()=>{
      axios(config)
      .then(function (response) {
          console.log(JSON.stringify(response.data, '--'));
          console.log('log salvado');
          
      })
      .catch(function (error) {
          console.log(error, 'errado');
          // res.status(200).send({ok:true})
      });
  }, 200);

  res.status(200).send({ok:true});
};

module.exports = {
    apertura,
    updateApertura
}