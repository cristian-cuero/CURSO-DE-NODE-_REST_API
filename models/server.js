
const express = require('express')
var cors = require('cors')
const { dbconnection} = require('../Database/config')

class Server {
    //inicio mi servidor
    constructor(){
        this.app = express()
        this.PORT = process.env.PORT
        // donde esta configurado mis rutas
        this.usuarioRoute = '/api/usuarios'

        //conexion BD
        this.ConetarDB();

        //middlewares funciones añadidas al servicio
        this,this.middleware();
         //inicia las rutas
        this.routes()
        //levanta mi servidor
    }

    routes(){
        //middleware para rutas la ruta que se usa ahora
      this.app.use(this.usuarioRoute, require('../routes/user'))
    }

    listen(){
        this.app.listen( this.PORT, () =>{
            console.log('Ejecutando en el puerto '  + this.PORT)
        })
    }

    //middleware
    middleware(){

        //cors 
        this.app.use(cors());

        //lectura y parseo de body  recibe informacion en formato json
        //todo lo que venhg en bopdy
        this.app.use(express.json())

        //directorio publico siempre llama el index para el get / solo 
        this.app.use(express.static('public'))
    }


    //DB
    async ConetarDB( ){

        dbconnection();
    }

}

module.exports = Server;