const {Router} = require('express');
const { check, } = require('express-validator');
const {login, googleSigning} = require('../controllers/auth');
const {validarcampos} = require('../middlewares/validar-campos')
const router = Router();

// ruta de auntenticar login no necesidad de poner el resto ya que esta en el servidor
router.post('/login',[
    check('correo' , 'el correo es valido').isEmail(),
    check('contraseña' , 'la contraseña debe ser obligatoria ').notEmpty(),
    validarcampos
] , login)

//ruta que recibe de google
router.post('/google',[
    check('id_token' , 'el  token es valido').notEmpty(),
    validarcampos
] , googleSigning)

module.exports = router