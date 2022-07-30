//crear un id unico
const { v4: uuidv4 } = require('uuid');
//para moverse sobre y unir rutas de ubicacion
const path = require('path')

//carpeta donde quiero poner el archivo, esta funcion esta hecha para subir una archivos
const subirArchivo = (files , extensionesValidad = ['PNG', 'jpg' , 'gif'], carpeta = '') =>{

//PROMESA

return new Promise(( resolve , reject) => {

    
//es el archivo que viene en el post peticion
    const {archivo} = files

    //que extension tiene el archivo 
    const nombreCortado = archivo.name.split('.');
    const  extension = nombreCortado[ nombreCortado.length -  1]
    //validar extension
    //const extensionesValidad = extensiones
    if(!extensionesValidad.includes(extension)){
      
        //reject que es cuando algo slae mal
        return reject(`la extension ${extension} no es una extension valida`);
    }
    //nombre temprarlñ del archivo por si se repite
    const nombreTemp = uuidv4() + '.' + extension

    //donde guardar la imagen, firname siempre apunta en la capreta que estoy(genera un apth)
    const uploadPath =  path.join( __dirname , '../uploads/' , carpeta ,  nombreTemp);
    //mv mover er archivo donde se quiere guardar tiene un callback que pasamos a funcion de flecha
    archivo.mv(uploadPath,  (err) => {
    if (err) {
        reject(err)
    }

    resolve(nombreTemp);
    });

    
});



}


module.exports = {
    subirArchivo
}