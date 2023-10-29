import { check } from "express-validator"
import { validaciones } from "./headers.js"

export const insertar = [
    check('cantidad')
        .isLength({ min: 1 })
        .exists().isNumeric(),
    check('esta')
        .matches(/^\w{1,100}\s?[()/a-zA-Z.@, Ññ0-9_-]{1,100}?$/)
        .exists(),
    check('municipio')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('ssector')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('creado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const editar = [
    check('id')
        .isLength({ min: 1 })
        .exists().isNumeric(),
    check('estado')
        .isLength({ min: 1 })
        .exists().isNumeric(),
    check('cantidad')
        .isLength({ min: 1 })
        .exists().isNumeric(),
    check('esta')
        .matches(/^\w{1,100}\s?[()/a-zA-Z.@, Ññ0-9_-]{1,100}?$/)
        .exists(),
    check('municipio')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('ssector')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('modificado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const eliminar = [
    check('id').isLength({ min: 1 }).exists().isNumeric(),
    check('cantidad')
        .isLength({ min: 1 })
        .exists().isNumeric(),
    check('modificado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]
export const siguiente = [
    check('id').isLength({ min: 1 }).exists().isNumeric(),
    check('cantidad')
        .isLength({ min: 1 })
        .exists().isNumeric(),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const anterior = [
    check('id').isLength({ min: 1 }).exists().isNumeric(),
    check('cantidad')
        .isLength({ min: 1 })
        .exists().isNumeric(),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const listar = [
    check('cantidad')
        .isLength({ min: 1 })
        .exists().isNumeric(),
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

// buscar