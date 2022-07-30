const {Router} = require('express');
const { check } = require('express-validator');
const { cargarArchivo, mostrarImagen, actualizarimagenCloudinary } = require('../controllers/oupload');
const { coleccionesPermitidas } = require('../helpers/db-helpers');
const { validarcampos } = require('../middlewares/validar-campos');
const {validarArchivo} = require('../middlewares')
const router = Router();


router.post('/' , validarArchivo ,cargarArchivo)

router.put('/:coleccion/:id', [
    validarArchivo,
    check('id', 'el id debe ser de mongo').isMongoId(),
    // c es la coleccion
    check('coleccion').custom(c => coleccionesPermitidas( c, ['usuarios', 'productos'])),
    validarcampos 
] , //actualizarimagen 
actualizarimagenCloudinary)

router.get('/:coleccion/:id' , [
    check('id', 'el id debe ser de mongo').isMongoId(),
    // c es la coleccion
    check('coleccion').custom(c => coleccionesPermitidas( c, ['usuarios', 'productos'])),
    validarcampos 
], mostrarImagen
)


module.exports = router;