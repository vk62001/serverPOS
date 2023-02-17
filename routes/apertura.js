const { apertura } = require('../controllers/apertura');

const router = require('express').Router();


router.get('/', (req, res)=>{
    res.send('hola mundo')
});

router.post('/', apertura);

router.put('/', (req, res)=>{
    res.send({resp:'update'});
});

router.delete('/', (req, res)=>{
    res.send({resp:'delete'});
});


module.exports = router