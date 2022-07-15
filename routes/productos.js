const {Router} = require('express');
const { check, } = require('express-validator');
const { CrearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeProducto } = require('../helpers/db-helpers');
const { existeCategoria } = require('../helpers/db-helpers');
const { validarcampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT');
const { route } = require('./auth');



const router = Router();

//crar un producto
router.post('/', [
    validarJWT,
check('nombre' , 'El Nombre Es Obligatorio' ).notEmpty() ,
check('categoria' , 'No es un id de mongo' ).isMongoId() ,
check('categoria').custom( existeCategoria),
validarcampos
], //recordar que el jwt viene el header
    CrearProducto
)

//todos los productos
router.get('/' ,
obtenerProductos
)


//producto por id
router.get('/:id' ,[
    check('id' , ' el id no es valida').isMongoId(),
    check('id').custom(existeProducto),
    validarJWT,
    validarcampos

],
obtenerProducto
)

router.put('/:id', [
    check('id' , ' el id no es valida').isMongoId(),
    check('id').custom(existeProducto),
    validarJWT,
    validarcampos],
    actualizarProducto)

router.delete('/:id' , [
    check('id' , ' el id no es valida').isMongoId(),
    check('id').custom(existeProducto),
    validarJWT,
    validarcampos
], borrarProducto)






module.exports = router;