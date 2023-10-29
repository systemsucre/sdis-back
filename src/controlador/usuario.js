import { Router } from "express"
import { Usuario } from "../modelo/usuario.js"
import { buscar, siguiente, insertar, actualizar, recet, validar,} from '../validacion/usuario.js'
import { CLAVEGMAIL } from '../config.js'
import nodemailer from "nodemailer";
//const modelo from "../modelo/usuario.js"
// desde esta plantilla se importa las funcionalidades de los controladores de los modulos


const rutas = Router()
const usuarios = new Usuario()



rutas.post("/listar1", async (req, res) => {
    try {
        const resultado = await usuarios.listarActivos(req.body.usuario, req.body.cantidad)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})
rutas.post("/listar2", async (req, res) => {
    try {
        const resultado = await usuarios.listarNoActivos(req.body.usuario, req.body.cantidad)
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

rutas.post("/variable", async (req, res) => {
    try {
        const resultado = await usuarios.listarVariable()
        return res.json(resultado)
    } catch (error) {
        return res.status(500).send(error)
    }
})

rutas.post("/municipio", async (req, res) => {
    try {
        const resultado = await usuarios.listarMunicipio()
        return res.json(resultado)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})

rutas.post("/red", async (req, res) => {
    try {
        const resultado = await usuarios.listarRed()
        return res.json(resultado)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})



rutas.post("/establecimientos", async (req, res) => {
    try {
        const resultado = await usuarios.listarHospital()
        return res.json(resultado)
    } catch (error) {
        console.log(error)
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
        const resultado = await usuarios.listarSiguiente(id, req.body.usuario, req.body.cantidad)
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
        const resultado = await usuarios.listarAnterior(id, req.body.usuario, req.body.cantidad)
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
        const resultado = await usuarios.listarSiguiente_(id, req.body.usuario, req.body.cantidad)
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
        const resultado = await usuarios.listarAnterior_(id, req.body.usuario, req.body.cantidad)
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
    const { username, otros, rol_, variable, nombre, ape1,lugar,
        ape2, celular, correo, creado, usuario } = req.body
    const datos = {
        username,
        pass: otros,
        rol: rol_,
        nombre,
        variable,
        establecimiento:rol_==5?lugar:null,
        mun:rol_==4?lugar:null,
        red:rol_==3?lugar:null,
        apellido1: ape1,
        apellido2: ape2,
        celular,
        correo,
        estado: 1,
        creado,
        usuario
    }
    try {
        const resultado = await usuarios.insertar(datos, req.body.cantidad)

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

    const { id, rol_, estado, variable, lugar, nombre, ape1,
        ape2, celular, correo, modificado, usuario, } = req.body
    const datos = {
        id,
        rol: rol_, estado,  
        establecimiento:rol_==5?lugar:null,
        mun:rol_==4?lugar:null,
        red:rol_==3?lugar:null,
        nombre,
        ape1,
        ape2, variable,
        celular,
        correo,
        modificado,
        usuario,
    }
    try {
        const resultado = await usuarios.actualizar(datos)
        if (resultado.existe === 1)
            return res.json({ ok: false, msg: 'Usuario ya esta registrado' })
        if (resultado.existe === 2)
            return res.json({ ok: false, msg: 'Correo ya esta registrado' })
        else
            return res.json({ data: resultado, ok: true, msg: "Registro actualizado correctamente" });

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el Servidor', ok: false })
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
            return res.json({ ok: true, msg: 'Contraseña se ha reiciado correctamete' })
        else
            return res.json({ ok: false, msg: 'Contraseña no se ha actualizado!' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Operacion fállida, Consulte con el administrador' })
    }

})


rutas.post("/validar", validar, async (req, res) => {
    // console.log(req.body)
    try {
        const { id, rol_, variable, hospital, nombre, ape1,
            ape2, celular, correo, modificado, usuario, cantidad } = req.body
        const datos = {
            id,
            rol: rol_,
            hospital,
            nombre,
            ape1,
            variable,
            ape2,
            celular,
            correo,
            modificado,
            usuario, cantidad
        }
        const resultado = await usuarios.validar(datos)
        return res.json({ ok: true, data: resultado, msg: 'El usuario activado correctamente' })

    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Operacion fállida, Consulte con el administrador' })
    }

})


export default rutas;