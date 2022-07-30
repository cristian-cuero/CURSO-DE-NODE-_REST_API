const { response, json } = require("express");
const { subirArchivo } = require("../helpers/subir-archivos");
//const producto = require("../models/producto");
//const usuario = require("../models/usuario");
//por que ya tengo el indixe
const { Usuario , Producto }  = require("../models")
const path = require("path")
//manejo de archivos
const fs = require("fs")

//para usar claudinary
const cloudinary = require('cloudinary').v2
//configurar usuario viene de la variable de entorno
cloudinary.config(process.env.CLOUDINARY_URL)

//subir archivos
const cargarArchivo = async (req , res = response) =>{

 if (!req.files || Object.keys(req.files).length === 0) {
    return  res.status(400).json({
        msg:'no hay archivos en el servidor'
    })
    
    }

    if (!req.files.archivo ) {
        return res.status(400).json({
        msg:'no hay archivos en el servidor'
        })
       
    }

    //esto es por el reject para que no revienbte la app


    try {
        //texto en carpeta , texto
    //const pathArchivo = await subirArchivo(req.files, ['txt', 'md'], 'texto' )
    const pathArchivo = await subirArchivo(req.files, undefined, 'img' )
    //devuelvo lo que regrese subir archivo
    res.json({
        nombre: pathArchivo
    })
        
    } catch (msg) {
        res.status(400).json({
            msg
        })
    }

    
    

    
  
}


//actualizar la imagen de un usario en local

/* const  actualizarimagen = async(req, res = response) => {


    
      
    const {coleccion, id} = req.params

    //que cambia o se usa en uan funcion
    let modelo;

    //valido si es un usario o un producto
    switch (coleccion) {
        case 'usuarios':
            modelo = await  Usuario.findById(id)
            if(!modelo){
                res.status(400).json({
                    msg: 'No existe el usuario con id ' + id
                })
            }
            break;
            case 'productos':
                modelo = await  Producto.findById(id)
                if(!modelo){
                    res.status(400).json({
                        msg: 'No existe el producto con id ' + id
                    })
                }
                break;    
    
        default:
        return res.status(500).json({
            msg: 'se me olvido validar esta coleccion ' + coleccion
        })
    }

    //limpia imagenes previas

    try {
        //valido si la im existe __dirname es donde estoy ubicado
        if(modelo.img){
            const pathImagen = path.join(__dirname , '../uploads' , coleccion , modelo.img)
            //pregunta si exixte la carpeta y lo remuve fs es de node para usar archivo
            if(fs.existsSync(pathImagen)){
                fs.unlinkSync(pathImagen)
            }
        }
        
    } catch (msg) {
        res.status(400).json({
            msg
        })
    }

    // si es una promesa debo manejar el try y el catch  para manejar en caso de que no funciones
    try {
        //se agrga la imagen a la coleccion
    const nombre =  await subirArchivo(req.files, undefined, coleccion )
    modelo.img = nombre

    await modelo.save()

    res.json({
        modelo
    })
        
    } catch (msg) {
        res.status(400).json({
            msg
        })
    }

    
} */


//guardar imagen de manera en cloudinary  
const  actualizarimagenCloudinary = async(req, res = response) => {


    
      
    const {coleccion, id} = req.params

    //que cambia o se usa en uan funcion
    let modelo;

    //valido si es un usario o un producto
    switch (coleccion) {
        case 'usuarios':
            modelo = await  Usuario.findById(id)
            if(!modelo){
                res.status(400).json({
                    msg: 'No existe el usuario con id ' + id
                })
            }
            break;
            case 'productos':
                modelo = await  Producto.findById(id)
                if(!modelo){
                    res.status(400).json({
                        msg: 'No existe el producto con id ' + id
                    })
                }
                break;    
    
        default:
        return res.status(500).json({
            msg: 'se me olvido validar esta coleccion ' + coleccion
        })
    }

    //limpia imagenes previas

    try {
        //eliminar imagen de la nube debo traer el id
        if(modelo.img){
          const nombreArr = modelo.img.split('/'); 
          const nombre = nombreArr[nombreArr.length - 1];
          const [publicID] = nombre.split('.');
          console.log(publicID);
          //pa que no espere lo vaya haciuendo mientras hace lo demas
          cloudinary.uploader.destroy(publicID);

        }
        
    } catch (msg) {
        res.status(400).json({
            msg
        })
    }

    // si es una promesa debo manejar el try y el catch  para manejar en caso de que no funciones
    try {
        //se agrga la imagen a la coleccion

        //subiir a claudinary  usamos el tenporal del file
        const  {tempFilePath} = req.files.archivo
      const {secure_url}= await  cloudinary.uploader.upload(  tempFilePath);
        // const nombre =  await subirArchivo(req.files, undefined, coleccion )
    modelo.img = secure_url

    await modelo.save()
  

     res.json({
        modelo
    }) 
        
    } catch (msg) {
        res.status(400).json({
            msg
        })
    }

    
}
//mostar imagen o servirla por un get

const mostrarImagen = async(req, res = response) => {
    
    const {coleccion, id} = req.params

   //que cambia o se usa en uan funcion
   let modelo;

   //valido si es un usario o un producto
    switch (coleccion) {
        case 'usuarios':
            modelo = await  Usuario.findById(id)
            if(!modelo){
                res.status(400).json({
                    msg: 'No existe el usuario con id ' + id
                })
            }
            break;
            case 'productos':
                modelo = await  Producto.findById(id)
                if(!modelo){
                    res.status(400).json({
                        msg: 'No existe el producto con id ' + id
                    })
                }
                break;    
    
        default:
        return res.status(500).json({
            msg: 'se me olvido validar esta coleccion ' + coleccion
        })
    }

  


          //valido si la im existe __dirname es donde estoy ubicado
          if(modelo.img){
            const pathImagen = path.join(__dirname , '../uploads' , coleccion , modelo.img)
            //pregunta si exixte la carpeta y lo remuve fs es de node para usar archivo
            if(fs.existsSync(pathImagen)){
                //respondo la imagen envio la imagen
                return res.sendFile(pathImagen)
            }
        }
        
   
        
    const pathnofound = path.join(__dirname , '../assets' , '14.1 no-image.jpg')    
    res.sendFile(pathnofound);
    
      
        
   


}



module.exports = {
    cargarArchivo,
    //actualizarimagen,
    mostrarImagen,
    actualizarimagenCloudinary
}