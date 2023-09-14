import { check } from "express-validator"
import { validaciones } from "./headers.js"

export const insertar = [

    check('username')
        .matches(/^[a-zA-ZÑñ ]{2,30}$/)
        .exists(),
    check('otros')
        .matches(/^.{4,3000}$/)
        .exists(),
    check('rol_')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('hospital')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('nombre')
        .matches(/^[a-zA-ZÑñ ]{2,30}$/)
        .exists(),
    check('ape1')
        .matches(/^[a-zA-ZÑñ ]{2,30}$/)
        .exists(),
    check('ape2')
        .matches(/^[a-zA-ZÑñ ]{2,30}$/)
        .exists(),
    check('celular')
        .exists()
        .matches(/^\d{5,10}$/),
    check('correo')
        .matches(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/)
        .exists(),
    check('direccion')
        .matches(/^[()/a-zA-Z.@ Ññ0-9_-]{1,100}$/)
        .exists(),
    check('creado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const actualizar = [
    check('id')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('rol_')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('hospital')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('nombre')
        .matches(/^[a-zA-ZÑñ ]{2,30}$/)
        .exists(),
    check('ape1')
        .matches(/^[a-zA-ZÑñ ]{2,30}$/)
        .exists(),
    check('ape2')
        .matches(/^[a-zA-ZÑñ ]{2,30}$/)
        .exists(),
    check('celular')
        .exists()
        .matches(/^\d{5,10}$/),
    check('correo')
        .matches(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/)
        .exists(),
    check('direccion')
        .matches(/^[()/a-zA-Z.@ Ññ0-9_-]{1,100}$/)
        .exists(),
    check('modificado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]
export const registrarme = [

    check('username')
        .matches(/^[a-zA-ZÑñ ]{2,30}$/)
        .exists(),
    check('otros')
        .matches(/^.{4,3000}$/)
        .exists(),
    check('hospital')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('nombre')
        .matches(/^[a-zA-ZÑñ ]{2,30}$/)
        .exists(),
    check('ape1')
        .matches(/^[a-zA-ZÑñ ]{2,30}$/)
        .exists(),
    check('ape2')
        .matches(/^[a-zA-ZÑñ ]{2,30}$/)
        .exists(),
    check('celular')
        .exists()
        .matches(/^\d{5,10}$/),
    check('correo')
        .matches(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/)
        .exists(),
    check('direccion')
        .matches(/^[()/a-zA-Z.@ Ññ0-9_-]{1,100}$/)
        .exists(),
    check('creado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const recet = [

    check('id')
        .matches(/^\d{1,10}$/)
        .exists(),
    check('otros')
        .matches(/^.{4,3000}$/)
        .exists(),
    check('modificado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const actualizarMiPerfil = [

    check('nombre')
        .matches(/^[a-zA-ZÑñ ]{2,30}$/)
        .exists(),
    check('ape1')
        .matches(/^[a-zA-ZÑñ ]{2,30}$/)
        .exists(),
    check('ape2')
        .matches(/^[a-zA-ZÑñ ]{2,30}$/)
        .exists(),
    check('celular')
        .exists()
        .matches(/^\d{5,10}$/),
    check('correo')
        .matches(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/)
        .exists(),
    check('direccion')
        .matches(/^[()/a-zA-Z.@ Ññ0-9_-]{1,100}$/)
        .exists(),
    check('modificado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]



export const cambiarMiContraseña = [

    check('pass1')
        .exists().
        isLength({ min: 5 }),
    check('pass2')
        .exists().
        isLength({ min: 5 }),
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


export const eliminar = [
    check('id').exists().matches(/^\d{1,10}$/),
    check('modificado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const buscar = [
    check('dato').matches(/^[()/a-zA-Z.@ Ññ0-9_-]{1,400}$/).exists(),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const siguiente = [
    check('id').isLength({ min: 1 }).exists().isNumeric(),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const anterior = [
    check('id').isLength({ min: 1 }).exists().isNumeric(),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

// buscar