//tener varios middleware y exportarlos enm uno

//hemper que valida los roles

const  validarcampos  = require('../middlewares/validar-campos');
const  roles = require('../middlewares/validar-roles');
//const { esAdminRole } = require('../middlewares/validar-roles');
const  validarJWT = require('../middlewares/validarJWT');
const validarArchivo = require("./validarArchivo")
//exporta todo lo que venga de ahi
module.exports = {
   ...validarcampos,
   ...roles,
   ...validarJWT,
   ...validarArchivo
   
}