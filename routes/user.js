//destructuracion de expres
const {Router} = require('express');
const { UsuarioGet, UsuarioPost, UsuarioPut, UsuarioDelete } = require('../controllers/users');

const router = Router();

//lamar rutas  se usa la ruta que se uso en el midlleware
//lo ideal es que lo que esta en la ruta este en controllers


router.get('/' , UsuarioGet)

//para leerr segemton /ejepmo  ya es una varriable del requ
//a la fuerza tenga que mandar algo
router.put('/:id', UsuarioPut)
router.post('/', UsuarioPost)
router.delete('/', UsuarioDelete)



module.exports = router;