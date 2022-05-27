// geberar JWT

const jwt = require('jsonwebtoken');
//uid identificador unico del usuario 
const generarJWT = (uid = '') => {
    //como es promesa
    return new Promise((resolve , reject) =>{

        const payload = {uid };
        //SECRETOPRIVATEKEY es mi firma 
        jwt.sign( payload , process.env.SECRETOPRIVATEKEY ,{
            expiresIn: '4H'
        }, (err , token) => {
           if(err){
            console.log(err);
            reject('no se pudo hacer el JWT');
           } else {
               resolve(token)
           }
        })

    })




}

module.exports = {
    generarJWT
}