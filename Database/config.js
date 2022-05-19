//conexion BD Mongo
const mongose = require('mongoose');


const dbconnection = async() =>{

    try {
        //devuelve una promesa conexion a la BD
        await mongose.connect(process.env.MOMGODB_CNN );

        console.log('Conectado A la Base De Datos')

    } catch (error) {
        console.log(error);
        throw new Error('Error Al Iniciar La Base De Datos');
    }

}



module.exports = {
    dbconnection
}