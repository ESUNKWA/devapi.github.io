var express = require('express');
var router = express.Router();
var bdd = require('../db/db');
/* GET home page. */
router.get('/', function(req, res, next) {
  
  bdd.query('select * from sc_dev.t_dev order by r_i asc')
      .then((result) => {
        res.json({status:1, msg: result.rows});
      }).catch((err) => {
        res.json({status:0, msg: err.message});
      });
});

module.exports = router;
