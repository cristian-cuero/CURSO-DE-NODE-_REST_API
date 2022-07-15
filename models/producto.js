//modelo de usuario BD
const { Schema , model }  = require('mongoose')


const ProductoSchema = Schema ({

    nombre: {
        type: String,
        required: [true , 'El Nombre Es Obligatorio']
    },
    estado:{
        type:Boolean,
        default: true,
        required:true
    },
    //una relacion con el otro objecto
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario', //tal y como esta el esquema de la relacion
        required: true  
    },
    precio:{
        type:Number,
        default: 0,

    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true,
    },
    descpripcion:{
        type: String
    },
    disponible:{
        type:Boolean,
        default:true
    }


});


//funcion normal por que ña flecha mantiene el this y esta lo modifica
//sacnao la __v y el estado 
ProductoSchema.methods.toJSON = function(){

    const { __v,estado ,... data} = this.toObject()
    //remplazando el _id de la BD Por UID
    
    return data
}


module.exports = model('Producto' , ProductoSchema);