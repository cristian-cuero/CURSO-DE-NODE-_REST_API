//modelo de usuario BD
const { Schema , model }  = require('mongoose')

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true , 'El Nombre Es Obligatorio']
    },
    correo: {
        type: String,
        required: [true , 'El Correo Es Obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true , 'El password Es Obligatorio']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required:true,
        emun: ['ADMIN_ROLE' , 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default:true
    },
    google: {
        type: Boolean,
        default: false
    },
    
    
    
});

//funcion normal por que ña flecha mantiene el this y esta lo modifica
//sacando la contrasela
UsuarioSchema.methods.toJSON = function(){

    const { __v,  password, ... usuario} = this.toObject()
    return usuario
}

//exportando el schema  momgol lñe crea a la tabla un s al final
module.exports = model('Usuario' , UsuarioSchema )