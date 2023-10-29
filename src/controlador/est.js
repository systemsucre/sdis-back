import { Router } from "express"
import { Est } from "../modelo/est.js"
import { insertar, editar, eliminar, buscar, listar, siguiente, anterior } from '../validacion/est.js'

//const modelo from "../modelo/usuario.js"
// desde esta plantilla se importa las funcionalidades de los controladores de los modulos


const rutas = Router()
const est = new Est()

rutas.post("/listar", listar, async (req, res) => {
    // console.log(req)
    try {
        const resultado = await est.listar(req.body.cantidad)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el Servidor' })
    }

})
rutas.post("/listarMunic", async (req, res) => {
    // console.log(req.body)
    try {
        const resultado = await est.listarMunic()
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el Servidor' })
    }

})

rutas.post("/next", siguiente, async (req, res) => {

    let id = req.body.id
    let cantidad = req.body.cantidad
    try {
        const resultado = await est.listarSiguiente(id, cantidad)
        if (resultado.length > 0)
            return res.json({ ok: true, data: resultado })
        else
            return res.json({ ok: false, msg: 'Ya no hay mas registros!' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})


rutas.post("/anterior", anterior, async (req, res) => {
    let id = req.body.id
    let cantidad = req.body.cantidad

    try {
        const resultado = await est.listarAnterior(id, cantidad)
        if (resultado.length > 0)
            return res.json({ ok: true, data: resultado })
        else
            return res.json({ ok: false, msg: 'Ya no hay mas registros!' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }

})






rutas.post("/buscar", buscar, async (req, res) => {
    const dato = req.body.dato
    try {
        const resultado = await est.buscar(dato)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        // console.log(error)
        return res.json({ ok: false, msg: 'Error en el Servidor' })
    }

})


rutas.post("/insertar", insertar, async (req, res) => {


    const { esta, cantidad, ssector, municipio, creado, usuario } = req.body
    const datos = {
        establecimiento: esta,
        municipio,
        ssector,
        creado,
        usuario,

    }
    try {

        const resultado = await est.insertar(datos, cantidad)
        if (resultado.existe === 1) {
            return res.json({ ok: false, msg: 'ya existe el registro' })
        }
        return res.json({ ok: true, data: resultado, msg: 'Registro Guardado' })

    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el Servidor' })
    }
})



rutas.post("/actualizar", editar, async (req, res) => {
    const { id, esta, cantidad, ssector, municipio, estado, modificado, usuario } = req.body
    const datos = {
        id: id,
        establecimiento: esta,
        municipio,
        ssector,
        modificado,
        usuario,
        cantidad, estado
    }
    try {
        const resultado = await est.actualizar(datos, cantidad)
        if (resultado.existe === 1) {
            return res.json({ msg: 'ya existe el registro', ok: false })
        }
        if (resultado.existe === 2) {
            return res.json({ msg: 'Actualizacion Fállida', ok: false })
        }
        return res.json({ ok: true, data: resultado, msg: 'Registro actualizado' })

    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el Servidor' })
    }
})


rutas.post("/eliminar", eliminar, async (req, res) => {
    // console.log(req.body)
    try {
        let cantidad = req.body.cantidad
        const id = req.body.id;
        const resultado = await est.eliminar(id, cantidad, req.body.modificado)
        return res.json({ ok: true, data: resultado, msg: 'El registro se ha eliminado' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el Servidor' })
    }
})



export default rutas;