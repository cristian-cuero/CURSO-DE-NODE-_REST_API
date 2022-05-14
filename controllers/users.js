//desetructurando para usar response y request para obtener los parametros de 
//la ruta
const {response, request} = require('express')

//controladores de la ruta usuarios

const UsuarioGet = (req = request, res = response) => {
    //estrar parametros del queryget
    const  {q , nombre = 'No Hay', apikey, page, limit} = req.query;
    res.json({
    
        nombre2: 'get - Controllador',
        q,
        nombre,
        apikey,
        page,
        limit

    })
}

const UsuarioPost = (req, res = response) => {
    //desetructuras
    const {nombre , edad} = req.body;
    res.json({
        
        //leyendo lo que viene el body
        
        msg: 'post - Controllador',
        nombre,
        edad

    })
}
const UsuarioPut = (req, res = response) => {
    //parametro que viene por el segemto
    const id  = req.params.id;
    res.json({
     
        nombre: 'Put - Controllador',
        id: id

    })
}
const UsuarioDelete = (req, res = response) => {
    res.json({
    
        nombre: 'Delete - Controllador'

    })
}



module.exports = {
    UsuarioGet,
    UsuarioPost,
    UsuarioPut,
    UsuarioDelete

}