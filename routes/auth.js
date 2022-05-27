const {Router} = require('express');
const { check, } = require('express-validator');
const {login} = require('../controllers/auth');
const {validarcampos} = require('../middlewares/validar-campos')
const router = Router();

// ruta de auntenticar login no necesidad de poner el resto ya que esta en el servidor
router.post('/login',[
    check('correo' , 'el correo es valido').isEmail(),
    check('contraseña' , 'la contraseña debe ser obligatoria ').notEmpty(),
    validarcampos
] , login)


module.exports = router