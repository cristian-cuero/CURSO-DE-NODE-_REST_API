//revisa si hay errores del check que esta en la vista
const { validationResult } = require('express-validator');

//middleware
//next es la funcion si todo funciona
const validarcampos  = ( req , res, next) => {

      //si hay errores los muestro vienden de la ruta
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() })
      }

      //si todo funciona sigue con el siguiente middleware o controlador
      next();
}


module.exports = {
    validarcampos
}