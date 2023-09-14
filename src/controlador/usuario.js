import { Router } from "express"
import { Usuario } from "../modelo/usuario.js"
import { eliminar, buscar, siguiente, insertar, actualizar, recet } from '../validacion/usuario.js'
import { CLAVEGMAIL } from '../config.js'
import nodemailer from "nodemailer";
//const modelo from "../modelo/usuario.js"
// desde esta plantilla se importa las funcionalidades de los controladores de los modulos


const rutas = Router()
const usuarios = new Usuario()



rutas.post("/listar1", async (req, res) => {
    try {
        const resultado = await usuarios.listarActivos(req.body.usuario)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})
rutas.post("/listar2", async (req, res) => {
    try {
        const resultado = await usuarios.listarNoActivos(req.body.usuario)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})


rutas.post("/ver", async (req, res) => {
    try {
        const resultado = await usuarios.ver(req.body.id)
        // console.log(resultado)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})


rutas.post("/rol", async (req, res) => {
    try {
        const resultado = await usuarios.listarRol()
        return res.json(resultado)
    } catch (error) {
        return res.status(500).send(error)
    }
})

rutas.post("/establecimientos", siguiente, async (req, res) => {
    try {
        const resultado = await usuarios.listarHospital(req.body.id)
        return res.json(resultado)
    } catch (error) {
        return res.status(500).send(error)
    }
})









rutas.post("/buscar", buscar, async (req, res) => {
    // console.log(req.body)
    const dato = req.body.dato
    const user = req.body.usuario
    try {
        const resultado = await usuarios.buscar(dato, user)
        return res.send({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }

})
rutas.post("/buscar_", buscar, async (req, res) => {
    // console.log(req.body)
    const dato = req.body.dato
    const user = req.body.usuario
    try {
        const resultado = await usuarios.buscar_(dato, user)
        return res.send({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }

})


rutas.post("/next", siguiente, async (req, res) => {

    let id = req.body.id
    try {
        const resultado = await usuarios.listarSiguiente(id, req.body.usuario)
        if (resultado.length > 0)
            return res.json({ ok: true, data: resultado })
        else
            return res.json({ ok: false, msg: 'Ya no hay mas registros!' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})

rutas.post("/anterior", siguiente, async (req, res) => {
    let id = req.body.id
    try {
        const resultado = await usuarios.listarAnterior(id, req.body.usuario)
        if (resultado.length > 0)
            return res.json({ ok: true, data: resultado })
        else
            return res.json({ ok: false, msg: 'Ya no hay mas registros!' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }

})

rutas.post("/next_", siguiente, async (req, res) => {

    let id = req.body.id
    try {
        const resultado = await usuarios.listarSiguiente_(id, req.body.usuario)
        if (resultado.length > 0)
            return res.json({ ok: true, data: resultado })
        else
            return res.json({ ok: false, msg: 'Ya no hay mas registros!' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})

rutas.post("/anterior_", siguiente, async (req, res) => {
    let id = req.body.id
    try {
        const resultado = await usuarios.listarAnterior_(id, req.body.usuario)
        if (resultado.length > 0)
            return res.json({ ok: true, data: resultado })
        else
            return res.json({ ok: false, msg: 'Ya no hay mas registros!' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }

})


















rutas.post("/registrar", insertar, async (req, res) => {

    console.log('datos: ', req.body)
    const { username, otros, hospital, rol_, nombre, ape1,
        ape2, celular, direccion, correo, creado, usuario } = req.body
    const datos = {
        username,
        pass: otros,
        establecimiento: hospital,
        rol:rol_,
        nombre,
        apellido1: ape1,
        apellido2: ape2,
        celular,
        direccion,
        correo,
        estado: 1,
        creado,
        usuario
    }
    try {
        const resultado = await usuarios.insertar(datos)

        if (resultado.existe === 1)
            return res.json({ ok: false, msg: 'Este usuario ya esta registrado' })
        if (resultado.existe === 2)
            return res.json({ ok: false, msg: 'Este Correo ya esta registrado' })
        else
            return res.json({ data: resultado, ok: true, msg: "El Usuario se ha registrado correctamente" });

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el Servidor', ok: false })
    }
})


rutas.post("/actualizar", actualizar, async (req, res) => {

    console.log('datos: ', req.body)

    const { id, rol_, hospital, nombre, ape1,
        ape2, celular, direccion, correo, modificado, usuario } = req.body
    const datos = {
        id,
        rol:rol_,
        hospital,
        nombre,
        ape1,
        ape2,
        celular,
        direccion,
        correo,
        modificado,
        usuario
    }
    try {
        const resultado = await usuarios.actualizar(datos)
        if (resultado.existe === 1)
            return res.json({ ok: false, msg: 'Este usuario ya esta registrado' })
        if (resultado.existe === 2)
            return res.json({ ok: false, msg: 'Este correo ya esta registrado' })
        else
            return res.json({ data: resultado, ok: true, msg: "El Registro se ha actualizado correctamente" });

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el Servidor', ok: false })
    }
})

rutas.post("/eliminar", eliminar, async (req, res) => {
    // console.log(req.body)
    try {
        const { id, modificado, usuario } = req.body;
        const datos = {
            id, modificado, usuario
        }
        const resultado = await usuarios.eliminar(datos)
        return res.json({ data: resultado, ok: true, msg: 'El usuario se ha eliminado exitosamente' })

    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Operacion fállida, Consulte con el administrador' })
    }

})


rutas.post("/recet", recet, async (req, res) => {
    // console.log(req.body)
    try {
        const { id, otros, modificado, usuario } = req.body;
        const datos = {
            id, otros, modificado, usuario
        }
        const resultado = await usuarios.recet(datos)
        if (resultado)
            return res.json({ ok: true, msg: 'La contraseña ha reiciado correctamete' })
        else
            return res.json({ ok: false, msg: 'La contraseña no se ha actualizado!' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Operacion fállida, Consulte con el administrador' })
    }

})


export default rutas;