var express = require('express');
var router = express.Router();
const {check, validationResult} = require('express-validator/check');
var bdd = require('../db/db');
var verif = [];
//Validation des données
verif.push(check('p_nom').not().isEmpty().trim().escape().withMessage('Le nom est obligatoire'));
verif.push(check('p_nom', 'Le doit doit comporter au moins 2 cacarctères').not().isEmpty().trim().escape().isLength({min:2}));
verif.push(check('p_contact', 'Le numéro de téléphone est obligatoire').not().isEmpty().trim().escape());
//Router
router.post('/', verif ,(req, res, next)=> {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array()[0].msg);
    } else {
        let params = [req.body.p_nom, req.body.p_prenoms, req.body.p_diplome, 
            req.body.p_experience, req.body.p_contact ];
            const scriptAjout = `insert into sc_dev.t_dev(r_nom, r_prenoms, r_diplome, 
                            r_expérience, r_date_eng, r_contact) 
                            values ($1, $2, $3, $4, now(), $5)`;

            bdd.query(scriptAjout, params)
            .then(() => {
                res.json({status:1, msg: 'Développeur enregistré avec succès '});
            }).catch((err) => {
                res.json({status:0, msg: 'Oupss!!!, ' + err.message});
            });
    }

    
});
module.exports = router;