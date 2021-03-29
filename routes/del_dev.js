var express = require('express');
var router = express.Router();
var bdd = require('../db/db');
/* GET users listing. */
router.delete('/', (req, res, next)=> {
  let id_dev = [];
  id_dev.push(req.body.p_id);
  if( id_dev.length !== 1 || id_dev[0] === 0 ) {
    res.send('Erreur veueillez contacter l\'administrateur');
    return;
  }

  console.log(req.body.p_id)
  bdd.query('delete from sc_dev.t_dev where r_i = $1', id_dev)
  .then(() => {
    res.json({status:1, msg: 'Supression effectuée avec succès'});
  }).catch((err) => {
    res.json({status:0, msg: err.message});
  });

});

module.exports = router;
