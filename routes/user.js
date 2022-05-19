//destructuracion de expres
const {Router} = require('express');
const { check, } = require('express-validator');
const { UsuarioGet, UsuarioPost, UsuarioPut, UsuarioDelete } = require('../controllers/users');
const { emailexiste } = require('../helpers/db-helpers');
const { existeUsuarioID } = require('../helpers/db-helpers');
//hemper que valida los roles
const { esRolValido } = require('../helpers/db-helpers');
const { validarcampos } = require('../middlewares/validar-campos');
const router = Router();

//lamar rutas  se usa la ruta que se uso en el midlleware
//lo ideal es que lo que esta en la ruta este en controllers


router.get('/' , UsuarioGet)

//para leerr segemton /ejepmo  ya es una varriable del requ
//a la fuerza tenga que mandar algo
router.put('/:id',[
    check('id' , ' no es un id valido').isMongoId(),
    check('id').custom(existeUsuarioID),
    check('rol').custom( esRolValido ),
    validarcampos
], UsuarioPut)
   
//usando middleware de expres validator si son varios por arregli []
//se dispara antes de ir al meotodo de la ruta check express validate 
router.post('/', [
    check('nombre', "El Nomnre Es Obligatorio").notEmpty() ,//no tiene que se vacio
    check('correo' , 'El correo no es valido').isEmail(),
    check('password' , 'La Contraseña Debe Tener mas de 6 caracteres').isLength( {min: 6}),
    //check('rol' , 'no es un rol valido').isIn(['ADMIN_ROLE' , 'USER_ROLE']),
    //validar rol contra base de datos
    //rol = '' esrolvalido(rol) pero se puede omitir 
    check('rol').custom( esRolValido ),
    //validael email del helper
    check('correo').custom(emailexiste),
    //isIn existe en 
    //si estas validacione pasa ejecuta el controlador 
    validarcampos 
    
    ], UsuarioPost)
router.delete('/:id', [
    check('id' , ' no es un id valido').isMongoId(),
    check('id').custom(existeUsuarioID),
    validarcampos

], UsuarioDelete)



module.exports = router;