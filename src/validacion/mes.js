
import { check } from "express-validator"
import { validaciones } from "./headers.js"

export const insertar = [

    check('f1')
        .exists()
        .matches(/\d{4}[-]\d{2}[-]\d{2}/)
        .exists(),
    check('h1')
        .matches(/\d{2}[:]\d{2}[:]\d{2}/)
        .exists(),
    check('f2')
        .exists()
        .matches(/\d{4}[-]\d{2}[-]\d{2}/)
        .exists(),
    check('h2')
        .matches(/\d{2}[:]\d{2}[:]\d{2}/)
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

export const editar = [
    check('id').isLength({ min: 1 }).exists().isNumeric(),
    check('f1')
        .exists()
        .matches(/\d{4}[-]\d{2}[-]\d{2}/)
        .exists(),
    check('h1')
        .matches(/\d{2}[:]\d{2}[:]\d{2}/)
        .exists(),
    check('f2')
        .exists()
        .matches(/\d{4}[-]\d{2}[-]\d{2}/)
        .exists(),
    check('h2')
        .matches(/\d{2}[:]\d{2}[:]\d{2}/)
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
        .matches(/^\d{4}$/),
        (req, res, next) => {
    validaciones(req, res, next)
}
]

// buscar