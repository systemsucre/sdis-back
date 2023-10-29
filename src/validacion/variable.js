
import { check } from "express-validator"
import { validaciones } from "./headers.js"

export const insertar = [

    check('variable1')
        .matches(/^[()/a-zA-Z.@ Ññ0-9_-áéíóúÁÉÍÓÚ<>,-]{1,500}$/)
        .exists(),
    check('gestion')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('rol_')
        .exists()
        .matches(/^\d{1,10}$/),
    check('creado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),
    check('usuario')
        .exists()
        .isLength({ min: 1 }).isNumeric(),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const editar = [
    check('id').isLength({ min: 1 }).exists().isNumeric(),

    check('variable1')
        .matches(/^[()/a-zA-Z.@ Ññ0-9_-áéíóúÁÉÍÓÚ<>,-]{1,500}$/)
        .exists(),
    check('gestion')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('rol_')
        .exists()
        .matches(/^\d{1,10}$/),
    check('modificado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),
    check('usuario')
        .exists()
        .isLength({ min: 1 }).isNumeric(),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const buscar = [
    check('dato').isLength({ min: 1 }).exists(),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const id = [
    check('id').isLength({ min: 1 }).exists().isNumeric(),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const gestion = [
    check('gestion')
        .exists()
        .matches(/^\d{1,10}$/),
    check('ssector')
        .exists()
        .matches(/^\d{1,10}$/),
    check('rol_')
        .exists()
        .matches(/^\d{1,10}$/),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const eliminar = [
    check('id').isLength({ min: 1 }).exists().isNumeric(),
    check('gestion')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('rol_')
        .exists()
        .matches(/^\d{1,10}$/),
    check('modificado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),
    check('usuario')
        .exists()
        .isLength({ min: 1 }).isNumeric(),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]


//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
///////////////////////INDICADORES


export const insertarFila = [

    check('variable1')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('indicador')
        .matches(/^[()/a-zA-Z.@ Ññ0-9_-áéíóúÁÉÍÓÚ<>,-]{1,500}$/)
        .exists(),
    check('ini')
        .exists()
        .matches(/\d{4}[-]\d{2}[-]\d{2}/)
        .exists(),
    check('fin')
        .exists()
        .matches(/\d{4}[-]\d{2}[-]\d{2}/)
        .exists(),
    check('creado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),
    check('usuario')
        .exists()
        .isLength({ min: 1 }).isNumeric(),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const editarFila = [
    check('id')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('variable1')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('ini')
        .exists()
        .matches(/\d{4}[-]\d{2}[-]\d{2}/)
        .exists(),
    check('fin')
        .exists()
        .matches(/\d{4}[-]\d{2}[-]\d{2}/)
        .exists(),
    check('indicador')
        .matches(/^[()/a-zA-Z.@ Ññ0-9_-áéíóúÁÉÍÓÚ<>,-]{1,500}$/)
        .exists(),
    check('modificado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),
    check('usuario')
        .exists()
        .isLength({ min: 1 }).isNumeric(),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const eliminarFila = [
    check('id')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('variable1')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('modificado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),
    check('usuario')
        .exists()
        .isLength({ min: 1 }).isNumeric(),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
///////////////////////CARACTERISTICAS


export const insertarInput = [

    check('input')
        .matches(/^[()/a-zA-Z.@ Ññ0-9_-áéíóúÁÉÍÓÚ<>,-]{1,500}$/)
        .exists(),
    check('variable_')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('ini')
        .exists()
        .matches(/\d{4}[-]\d{2}[-]\d{2}/)
        .exists(),
    check('gestion')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('fin')
        .exists()
        .matches(/\d{4}[-]\d{2}[-]\d{2}/)
        .exists(),
    check('creado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),
    check('usuario')
        .exists()
        .isLength({ min: 1 }).isNumeric(),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]
export const añadirInput = [

    check('indicador')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('variable_')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('ini')
        .exists()
        .matches(/\d{4}[-]\d{2}[-]\d{2}/)
        .exists(),
    check('fin')
        .exists()
        .matches(/\d{4}[-]\d{2}[-]\d{2}/)
        .exists(),
    check('creado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),
    check('usuario')
        .exists()
        .isLength({ min: 1 }).isNumeric(),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]


export const editarInput = [

    // check('idinput')
    //     .matches(/^[0-9'']{1,10}$/)
    //     .exists(),
    check('id')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('input')
        .matches(/^[()/a-zA-Z.@ Ññ0-9_-áéíóúÁÉÍÓÚ<>,-]{1,500}$/)
        .exists(),
    check('ini')
        .exists()
        .matches(/\d{4}[-]\d{2}[-]\d{2}/)
        .exists(),
    check('fin')
        .exists()
        .matches(/\d{4}[-]\d{2}[-]\d{2}/)
        .exists(),
    check('variable_')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('modificado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),
    check('usuario')
        .exists()
        .isLength({ min: 1 }).isNumeric(),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const eliminarInput = [
    check('modificado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),
    check('codigo')
        .matches(/^[()/a-zA-Z.@ Ññ0-9_-áéíóúÁÉÍÓÚ<>,-]{1,500}$/)
        .exists(),
    check('gestion')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('idinput')
        .exists()
        .isLength({ min: 1 }).isNumeric(),
    check('variable_')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('usuario')
        .exists()
        .isLength({ min: 1 }).isNumeric(),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]





//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
/////////////////////// OTRAS CARACTERISTICAS

export const insertarOtroInput = [


    check('nivel')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('orden')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('idinput')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('gestion')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('ini')
        .exists()
        .matches(/\d{4}[-]\d{2}[-]\d{2}/)
        .exists(),
    check('fin')
        .exists()
        .matches(/\d{4}[-]\d{2}[-]\d{2}/)
        .exists(),
    check('input')
        .matches(/^[()/a-zA-Z.@ Ññ0-9_-áéíóúÁÉÍÓÚ<>,-]{1,500}$/)
        .exists(),
    check('codigo')
        .matches(/^[()/a-zA-Z.@ Ññ0-9_-áéíóúÁÉÍÓÚ<>,-]{1,500}$/)
        .exists(),
    check('variable_')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('estado')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('creado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),
    check('usuario')
        .exists()
        .isLength({ min: 1 }).isNumeric(),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]

// buscar