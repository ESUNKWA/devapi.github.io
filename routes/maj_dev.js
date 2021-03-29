var express = require('express');
var router = express.Router();
var bdd = require('../db/db');
const {check, validationResult} = require('express-validator/check');
var verif = [];
verif.push(check('p_nom', 'Le nom est obigatoire').not().isEmpty().trim().escape());
verif.push(check('p_prenoms', 'Le prenom est obligatoire').not().isEmpty().trim().escape());

router.put('/', verif , (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array()[0].msg);
      } else {
        let params = [req.body.p_nom, req.body.p_prenoms, req.body.p_diplome, 
                req.body.p_experience, req.body.p_id];
    
        scriptMaj = ` update sc_dev.t_dev set r_nom = $1, r_prenoms = $2, 
                    r_diplome = $3, r_experience = $4, r_date_modif = now()
                    where r_i = $5`;
    
    
        bdd.query(scriptMaj, params)
            .then(() => {
                res.json({status:1, msg: 'Modification effectuée avec succès'});
            }).catch((err) => {
                res.json({status:0, msg: err.message});
            });
      }
});
module.exports = router;