const {Router} = require('express');
const { check, } = require('express-validator');
const { CrearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-helpers');
const {validarJWT} = require('../middlewares');
const { validarcampos } = require('../middlewares/validar-campos');

const router = Router();

// rutas de la categoria
/* {
    {{url}}/api/categorias
} */

//obtener Todas las categorias es publico
router.get('/',
    obtenerCategorias
)

//obtner una categoria por iD ES PUBLICO middleware para verificar el id
router.get('/:id',[
    //valido que el id sea un id de moongose
    check('id', 'id no valido').isMongoId(),
    //vallidaID
    check('id').custom( existeCategoria), //valida la categoria por el id
    validarcampos
    ],
    obtenerCategoria
 
)

//crear categoria cualquier persona logeafda [] validaciones
router.post('/', [
    validarJWT,
    check('nombre', 'el nombre es onligatorio').notEmpty(),
    validarcampos
] 
,CrearCategoria)


//actualizar cualquier persona logeafda
router.put('/:id',[
    validarJWT,
    check("id", "El id no es valido").isMongoId(),
    check('id').custom( existeCategoria),
    
],
actualizarCategoria

)

//eliminar solo si es admin
router.delete('/:id', [
    validarJWT,
    check("id", "El id no es valido").isMongoId(),
    check('id').custom( existeCategoria),
],
borrarCategoria
)











module.exports = router