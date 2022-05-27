//tener varios middleware y exportarlos enm uno

//hemper que valida los roles

const  validarcampos  = require('../middlewares/validar-campos');
const  roles = require('../middlewares/validar-roles');
//const { esAdminRole } = require('../middlewares/validar-roles');
const  validarwjt = require('../middlewares/validarJWT');

//exporta todo lo que venga de ahi
module.exports = {
   ...validarcampos,
   ...roles,
   ...validarwjt
   
}