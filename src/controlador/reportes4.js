import { Router } from "express"
import { Reportes5 } from "../modelo/reportes4.js"
import { id, } from '../validacion/registro.js'


const rutas = Router()
const reportes4 = new Reportes5()



rutas.post("/listargestion", async (req, res) => {
    try {
        const resultado = await reportes4.listarGestion()
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})
rutas.post("/listarmes", id, async (req, res) => {

    try {
        const resultado = await reportes4.listarMes(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listarvariableinicio", async (req, res) => {

    try {
        const resultado = await reportes4.listarVariableinicio()
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listarvariable", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await reportes4.listarVariable(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listarindicadores", async (req, res) => {
    try {
        const { variable, } = req.body
        const datos = { variable }
        const resultado = await reportes4.listarIndicadores(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})
rutas.post("/maxorden", async (req, res) => {
    try {
        const resultado = await reportes4.maxordengen(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})






rutas.post("/listarCabeceras", async (req, res) => {
    try {
        const { variable } = req.body
        const datos = { variable }
        const resultado = await reportes4.listarCabeceras(datos)
        // console.log(resultado)

        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

//REPORTES


// rutas.post("/todaslasvariable", async (req, res) => {
//     try {
//         const { sest, gestion, mes1, mes2 } = req.body
//         const datos = { sest, gestion, mes1, mes2 }
//         const resultado = await reportes4.listarDatosTodosGrupos(datos)
//         return res.json({ data: resultado, ok: true })
//     } catch (error) {
//         console.log(error)
//         return res.json({ msg: 'Error en el servidor', ok: false })
//     }
// })


rutas.post("/unavariable", async (req, res) => {
    try {
        const { smun, variable, gestion, mes1, mes2 } = req.body
        const datos = { smun, variable, gestion, mes1, mes2 }
        const resultado = await reportes4.listarDatosTodosVariable(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/indicadorespecifico", async (req, res) => {
    try {
        const { smun, indicador, gestion, mes1, mes2 } = req.body
        const datos = { smun, indicador, gestion, mes1, mes2 }
        const resultado = await reportes4.listarDatosVariableElegido(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})



export default rutas;