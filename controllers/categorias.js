const { response, request } = require("express");


const Categoria = require("../models/categoria");


const CrearCategoria = async(req , res = response) =>{

    const nombre = req.body.nombre.toUpperCase();

    try {

        const CategoriaBD = await Categoria.findOne({nombre}) //por que el bombre concuerda con la categoria

        if(CategoriaBD){
                res.status(400).json({
                    msg: `la categoria ${ CategoriaBD.nombre}  ya existe`
                })
        }
    
        //geberar la data para guardarla
        const data = {
            nombre,
            usuario : req.usuario._id
        }
        
        //guardar Usario
        const categoria = new Categoria(data);
 
        await categoria.save();
        

        //201 cuando se crea
        res.status(201).json({
            categoria
        })
        
    } catch (error) {
        console.log(error);
    }


}
  //obtenerCategorias - paginado - total -populate(es propio de moongose para traer el usuario que tiene el id de relacion)
const obtenerCategorias = async(req = request , res = response) => {

    //limte de paginado
    const {limite =  5 , desde = 0} = req.query

     const [categorias, total ] = await Promise.all([
        Categoria.find({estado : true}) //where
        .skip(Number(desde)) //salte desdde
        .limit(Number(limite))
        .populate({
            path: "usuario",
            select: "nombre" //, se parado por espacio si quisera mas datoss
        }), //campo de la relacion, //cuento cuanros
        Categoria.countDocuments({estado : true})
    ]);  
 
     
   // const categorias = await Categoria.find({estado : true});



    res.json({
        categorias,
        total,
        limite
    });
        
};


//obtenerCategoria - populate {id de la categoria}

const obtenerCategoria = async(req , res = response) => {

    //viene en el / la direcion
    const id = req.params.id
    const categoria = await Categoria.findById(id)
    .populate({
        path: "usuario",
        select: "nombre" //, se parado por espacio si quisera mas datoss
    }) //campo de la relacion
    res.json({
        categoria
    })

}

//actualizarCategoria

const actualizarCategoria = async ( req , res = response) => {

    const id = req.params.id
    const nombre  = req.body.nombre.toUpperCase()
    const categorias = await Categoria.findOne({nombre})
    if(categorias){
    
        return  res.status(400).json({
            msg : `La ctaegoria ${ nombre} ya existe`
           })
     
      
    }
    const usuario = req.usuario._id
    const data = {
        nombre,
        usuario
    }
   const  categoria2 = await Categoria.findByIdAndUpdate(id, data)


    res.json({
        categoria2,
        id
    })
}


//borrarCategoria
const borrarCategoria= async(req ,res = response) =>{

    const id = req.params.id

 const categoria = await Categoria.findByIdAndUpdate(id , {estado: false});

    res.json({
        categoria
    });
} 


module.exports = {
    CrearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}