const { response } = require("express")



const validarArchivo = (req , res = response , next) => {

    
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

    next();

}




module.exports = {
    validarArchivo
}