import { Router } from "express"
import { Mes } from "../modelo/mes.js"
import { insertar, editar, gestion, buscar, id } from '../validacion/mes.js'


const rutas = Router()
const mes = new Mes()


rutas.post("/listarinicio", gestion, async (req, res) => {
    try {
        const resultado = await mes.listarInicio(req.body.gestion)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})
rutas.post("/listargestion", async (req, res) => {
    try {
        const resultado = await mes.listarGestion()
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})
rutas.post("/listar", id, async (req, res) => {
    try {
        const resultado = await mes.listar(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})



rutas.post("/buscar", buscar, async (req, res) => {
    // console.log(req.body.dato)
    const dato = req.body.dato
    try {
        const resultado = await mes.buscar(dato)
        return res.json({ ok: true, data: resultado })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})









rutas.post("/actualizar", editar, async (req, res) => {
    console.log(req.body)

    const { id, f1, h1, f2, h2, modificado, estado, usuario } = req.body
    const datos = {
        id,
        f1, h1, f2, h2,
        modificado,
        usuario, estado 
    }
    try {
        await mes.actualizar(datos).then(j => {
            return res.json({ data: j, ok: true, msg: 'Acceso actualizados' })
        })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


rutas.post("/eliminar", id, async (req, res) => {
    try {
        const id = req.body.id;

        await mes.eliminar(id).then(j => {
            return res.json({ data: j, ok: true, msg: 'operacion exitosa' })
        })

    } catch (error) {
        return res.json({ msg: 'Debe eliminar los registros dependientes', ok: false })
    }

})


export default rutas;