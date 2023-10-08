// const { validationResult } = require('express-validator');
import { validationResult } from "express-validator"

export const validaciones = (req, res, next) => {

    // console.log("DATOS EN LA CABECERA: ",req.body)
    const error = validationResult(req)
    if (!error.isEmpty()) {
        console.log('no pasa validaciones', error, req.body)
        return res.json({ msg: 'campos Inválidos, Escriba correctamente los campos', ok:false })
    }
    return next()
}
// module.exports = { validaciones }