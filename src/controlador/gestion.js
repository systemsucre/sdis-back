import { Router } from "express"
import { Gestion } from "../modelo/gestion.js"
import { insertar, editar, eliminar, buscar, siguiente, anterior } from '../validacion/gestion.js'


const rutas = Router()
const gestion = new Gestion()


rutas.post("/listar", async (req, res) => {
    try {
        const resultado = await gestion.listar()
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }

})




rutas.post("/insertar", insertar, async (req, res) => {

    // console.log(req.body)
    try {
        const { tipo, descripcion, creado, usuario } = req.body
        const datos = {
            tipo,
            descripcion,
            creado,
            usuario
        }


        const resultado = await gestion.insertar(datos)
        if (resultado.existe === 1) {
            return res.json({ msg: 'ya existe el registro', ok: false })
        }
        return res.json({ ok: true, data: resultado, msg: 'Registro gurdado' })

    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})

rutas.post("/actualizar", editar, async (req, res) => {

    // console.log(req.body)
    try {
        const { id, tipo, descripcion, modificado, usuario } = req.body
        const datos = {
            id,
            tipo,
            descripcion,
            modificado,
            usuario
        }

        const resultado = await gestion.actualizar(datos)
        if (resultado.existe === 0)
            return res.json({ msg: 'No existe el registro', ok: false })
        if (resultado.existe === 1) {
            return res.json({ msg: 'ya existe el registro', ok: false })
        }
        return res.json({ ok: true, data: resultado, msg: 'El registro se ha actualizado' })

    } catch (error) {
        // console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})


rutas.post("/activar", eliminar, async (req, res) => {
    // console.log('datos antes de aliminar : ',req.body)
    try {
        const { id, modificado, usuario } = req.body;
        const datos = { id, modificado, usuario }
        const resultado = await gestion.activar(datos)
        if (resultado.affectedRows === 0)
            return res.json({ msg: "No existe el registro", ok: false });
        return res.json({ ok: true, data: resultado, msg: 'Gestion activado' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})
rutas.post("/desactivar", eliminar, async (req, res) => {
    // console.log('datos antes de aliminar : ',req.body)
    try {
        const { id, modificado, usuario } = req.body;
        const datos = { id, modificado, usuario }
        const resultado = await gestion.desactivar(datos)
        if (resultado.affectedRows === 0)
            return res.json({ msg: "No existe el registro", ok: false });
        return res.json({ ok: true, data: resultado, msg: 'Gestion desactivado' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})

export default rutas;