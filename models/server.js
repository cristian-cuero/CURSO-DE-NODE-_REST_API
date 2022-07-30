
const express = require('express')
var cors = require('cors')
const { dbconnection} = require('../Database/config')
const fileUpload = require('express-fileupload')

class Server {
    //inicio mi servidor
    constructor(){
        this.app = express()
        this.PORT = process.env.PORT
        // donde esta configurado mis rutas
        //this.usuarioRoute = '/api/usuarios'
        //ruta auth
        //this.authPath = '/api/auth'
        //rutas de la categoria
       /*  this.categoria = '/api/categorias' */
       //oyta forma de usar varias rutas sin el this por cada uno+
       this.paths = {
        authPath : '/api/auth',
        usuarioRoute:'/api/usuarios',
        categorias : '/api/categorias',
        productos: '/api/productos',
        buscar:'/api/buscar',
        uploads: '/api/uploads'

       }
        //conexion BD
        this.ConetarDB();

        //middlewares funciones añadidas al servicio
        this.middleware();
         //inicia las rutas
        this.routes();
        //levanta mi servidor
        //this.listen();
    }

    routes(){
        //middleware para rutas la ruta que se usa ahora
        this.app.use(this.paths.authPath, require('../routes/auth'))
        this.app.use(this.paths.usuarioRoute, require('../routes/user'))
        this.app.use(this.paths.categorias , require('../routes/categorias'))
        this.app.use(this.paths.productos , require('../routes/productos'))
        this.app.use(this.paths.buscar , require('../routes/buscar'))
        this.app.use(this.paths.buscar , require('../routes/buscar'))
        this.app.use(this.paths.uploads , require('../routes/oupload'))

        
    }

    listen(){
        this.app.listen( this.PORT, () =>{
            console.log('Ejecutando en el puerto '  + this.PORT)
        })
    }

    //middleware se ejecutan antes de las rutas
    middleware(){

        //cors peticiones crusadas 
        this.app.use(cors());

        //lectura y parseo de body  recibe informacion en formato json
        //todo lo que venhg en bopdy
        this.app.use(express.json())

        //directorio publico siempre llama el index para el get / solo 
        this.app.use(express.static('public'))

        //acepta archiva desde peticiones rest es una configuracion
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true //mucho cuidado que esto crea carpeta donde sea 
        }));
    }


    //DB
    async ConetarDB( ){

        dbconnection();
    }

}

module.exports = Server;