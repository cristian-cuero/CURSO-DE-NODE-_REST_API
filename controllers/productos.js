const { response, request } = require("express"); //lo del reques y el response
const { findById } = require("../models/producto");
const Producto = require("../models/producto");


//cre aun producto el suusario debe de estar validado
const CrearProducto  = async(req , res = response) => {
    //... el resto
    const nombre = req.body.nombre.toUpperCase()
    const {categoria, precio = 0  , descpripcion = "" , ...body} = req.body 

   
    const producto = await Producto.findOne({nombre})

    if(producto){
        return res.status(400).json({
            msg:`la categoria con nombre ${nombre}  ya existe`
        });
    }
    const data = {
        ...body,
        nombre,
        usuario: req.usuario._id,
        precio,
        categoria,
        descpripcion


    }
    const produ = new Producto(data);
    await produ.save()
    res.json({
        produ
    });

};

//obtener Todos Los productos
const obtenerProductos = async(req = request , res = response ) => {

    const {limite = 5, desde = 0 } = req.query //query es ?los de la rutas

    const [productos, total] = await Promise.all([
        Producto.find({estado:true})
        .populate({
            path: "usuario",
            select:"nombre"
        })
        .populate({
            path: "categoria",
            select:"nombre"
        })
        .skip(Number(desde)) //salte desde 
        .limit(Number(limite)), //maximo numero de resgistro que viene pa paginar
        Producto.countDocuments({estado:true})

    ]);


    res.json({
        productos,
        total
    })


} 


//obtener un de Los productos
const obtenerProducto = async(req,  res = response ) => {

    const {id } = req.params //query es ?los de la rutas

    const productos = await Producto.findById(id).populate({
        path: "usuario",
        select:"nombre"
    })
    .populate({
        path: "categoria",
        select:"nombre"
    })


    res.json({
        productos
    })



        


}

//actualiza producto
const actualizarProducto = async (req , res = response) => {

    const id = req.params.id
    const {estado, usuario , ...body} = req.body 

    if(body.nombre){
      body.nombre = body.nombre.toUpperCase();      
    }
    body.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id , body , {new:true}); // que regrese el nuevo registro
    res.json({
        producto
    })

} 

//borar producto
const  borrarProducto = async(req ,res = response) =>{

    const id = req.params.id

 const producto = await Producto.findByIdAndUpdate(id , {estado: false} , {new:true});

    res.json({
        producto
    });
} 



module.exports = {
    CrearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}