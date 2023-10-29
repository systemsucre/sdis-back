import { Router } from "express"
import { Reportes5 } from "../modelo/reportes4.js"
import { id, } from '../validacion/formulario/formulario5.js'


const rutas = Router()
const reportes4 = new Reportes5()



rutas.post("/listargestion", async (req, res) => {
    try {
        const resultado = await reportes4.listarGestion(req.body.smun)
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


// variables del municipio

rutas.post("/listartodosvariableM", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await reportes4.listarTodosVariableM(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listarvariableM", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await reportes4.listarVariableM(req.body.id, req.body.ssector)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

// variables de nivel 5 establecimientos
rutas.post("/listartodosvariable", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await reportes4.listarTodosVariable(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listarvariable", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await reportes4.listarVariable(req.body.id, req.body.ssector)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////


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

rutas.post("/listarhospitales", async (req, res) => {
    try {
        const { smun,  } = req.body
        const datos = { smun, }
        const resultado = await reportes4.listarHospitales(datos)
        // console.log(resultado)

        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})




//REPORTES


//variables del município
rutas.post("/unavariableM", async (req, res) => {
    try {
        const { smun, variable, gestion, mes1, mes2 } = req.body
        const datos = { smun, variable, gestion, mes1, mes2 }
        const resultado = await reportes4.listarDatosTodosVariableM(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/indicadorespecificoM", async (req, res) => {
    try {
        const { smun, indicador, gestion, mes1, mes2 } = req.body
        const datos = { smun, indicador, gestion, mes1, mes2 }
        const resultado = await reportes4.listarDatosVariableElegidoM(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})




// consolidado
rutas.post("/unavariableconsolidado", async (req, res) => {
    try {
        const { smun, variable, gestion, mes1, mes2 } = req.body
        const datos = { smun, variable, gestion, mes1, mes2 }
        const resultado = await reportes4.listarDatosTodosVariableConsolidado(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/indicadorespecificoconsolidado", async (req, res) => {
    try {
        const { smun, indicador, gestion, mes1, mes2 } = req.body
        const datos = { smun, indicador, gestion, mes1, mes2 }
        const resultado = await reportes4.listarDatosVariableElegidoConsolidado(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


// por establecimiento
rutas.post("/unavariableporestablecimiento", async (req, res) => {
    try {
        const { est, variable, gestion, mes1, mes2 } = req.body
        const datos = { est, variable, gestion, mes1, mes2 }
        const resultado = await reportes4.listarDatosTodosVariableEstablecimiento(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/indicadorespecificoestablecimiento", async (req, res) => {
    try {
        const { est, indicador, gestion, mes1, mes2 } = req.body
        const datos = { est, indicador, gestion, mes1, mes2 }
        const resultado = await reportes4.listarDatosVariableElegidoEstablecimiento(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

// listar datos por formulario
rutas.post("/listardatosformulario", async (req, res) => {
    try {
        const { est, variable, gestion, mes1, mes2 } = req.body
        const datos = { est, variable, gestion, mes1, mes2 }
        const resultado = await reportes4.listarDatosFormulario(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listardatosformularioconsolidado", async (req, res) => {
    try {
        const {smun, variable, gestion, mes1, mes2 } = req.body
        const datos = {smun, variable, gestion, mes1, mes2 }
        const resultado = await reportes4.listarDatosFormularioConsolidado(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

export default rutas;