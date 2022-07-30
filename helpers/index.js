const dbhelpers     = require('./db-helpers');
const generarJWT    = require('./generar-jwt');
const googleverify  = require('./google-verify');
const subirarchivo  = require('./subir-archivos');


//los puntos para que exporte todo ñp que traiga las funciones que tiene la clase
module.exports = {
 ...dbhelpers,
 ...generarJWT,
 ...googleverify,
 ...subirarchivo
}