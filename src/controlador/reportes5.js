import { Router } from "express"
import { Reportes5 } from "../modelo/reportes5.js"
import { id, } from '../validacion/formulario/formulario5.js' 


const rutas = Router()
const reportes5 = new Reportes5()



rutas.post("/listargestion", async (req, res) => {
    try {
        const resultado = await reportes5.listarGestion()
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})
rutas.post("/listarmes", id, async (req, res) => {

    try {
        const resultado = await reportes5.listarMes(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false }) 
    }
})

rutas.post("/listarvariableinicio", async (req, res) => {

    try {
        const resultado = await reportes5.listarVariableinicio(req.body.sest,req.body.rol)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listarvariable", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await reportes5.listarVariable(req.body.id, req.body.rol, req.body.sest)
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
        const resultado = await reportes5.listarIndicadores(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})
rutas.post("/maxorden", async (req, res) => {
    try {
        const resultado = await reportes5.maxordengen(req.body.id)
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
        const resultado = await reportes5.listarCabeceras(datos)
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
//         const resultado = await reportes5.listarDatosTodosGrupos(datos)
//         return res.json({ data: resultado, ok: true })
//     } catch (error) {
//         console.log(error)
//         return res.json({ msg: 'Error en el servidor', ok: false })
//     }
// })


rutas.post("/unavariable", async (req, res) => {
    try {
        const { sest, variable, gestion, mes1, mes2 } = req.body
        const datos = { sest, variable, gestion, mes1, mes2 }
        const resultado = await reportes5.listarDatosTodosVariable(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/indicadorespecifico", async (req, res) => {
    try {
        const { sest, indicador, gestion, mes1, mes2 } = req.body
        const datos = { sest, indicador, gestion, mes1, mes2 }
        const resultado = await reportes5.listarDatosVariableElegido(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})



export default rutas;