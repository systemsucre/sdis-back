import { Router } from "express"
import { Registro } from "../modelo/registro.js"
import { id, listarmes, valoresinput, } from '../validacion/registro.js'


const rutas = Router()
const registro = new Registro()



rutas.post("/listargestion", async (req, res) => {
    try {
        const resultado = await registro.listarGestion()
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})
rutas.post("/listarmes", listarmes, async (req, res) => {
    try {
        const resultado = await registro.listarMes(req.body.id, req.body.fecha)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listarvariable", id, async (req, res) => {
    try {
        const resultado = await registro.listarVariable(req.body.id, req.body.rol)  
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listarindicadores", async (req, res) => {
    try {
        const { variable, sest, mes } = req.body
        const datos = { variable, sest, mes }
        const resultado = await registro.listarIndicadores(datos)
        if (resultado[0].length === 0) {
            return res.json({ data: resultado, ok: false, msg: 'No se crearon las variables para esta grupo' })
        } else
            return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


rutas.post("/valoresinput", async (req, res) => {
    const { usuario, sest, gestion, mes, variable, fecha, hora } = req.body
    const data = {
        usuario,
        establecimiento: sest,
        gestion,
        mes,
        fecha,
        hora,
        variable,
    }

    try {
        const resultado = await registro.listarValoresInput(data)

        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})

rutas.post("/listarinput", id, async (req, res) => {
    // console.log(req.body, 'inputss')
    const { id, } = req.body
    const datos = { id, }
    try {
        const resultado = await registro.listarInput(datos)
        // console.log(resultado)
        if (resultado.length === 0) {
            return res.json({ data: resultado, ok: false, msg: 'No se crearon las cabeceras para esta Variable' })
        } else
            return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})
rutas.post("/listarinput2", id, async (req, res) => {
    // console.log(req.body)
    try {
        const { id, } = req.body
        const datos = { id, }

        const resultado = await registro.listarInput2(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})

rutas.post("/guardar", async (req, res) => {
    try {
        const { usuario, sest, mes, gestion, indicador, variable, fecha, hora } = req.body
        const data = {
            usuario,
            establecimiento: sest,
            mes,
            gestion,
            indicador,
            fecha,
            hora,
            variable,
        }
        await registro.insertar(data, req.body.valores)
        return res.json({ ok: true, msg: 'Los valores se guardaron correctamente' })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})




export default rutas;