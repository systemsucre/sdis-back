import { Router } from "express"
import { Reportes3 } from "../modelo/reportes3.js"
import { id, } from '../validacion/formulario/formulario5.js'


const rutas = Router()
const reportes3 = new Reportes3()



rutas.post("/listargestion", async (req, res) => {
    try {
        const resultado = await reportes3.listarGestion(req.body.sred)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


rutas.post("/listarmunicipio", async (req, res) => {
    try {
        const { sred, } = req.body
        const datos = { sred, }
        const resultado = await reportes3.listarMunicipio(datos)
        // console.log(resultado)

        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


rutas.post("/listarhospitales", async (req, res) => {
    try {
        const { mun, } = req.body
        const datos = { smun: mun, }
        const resultado = await reportes3.listarHospitales(datos)
        // console.log(resultado)

        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listarhospitales-formulario", async (req, res) => {
    try {
        const { sred, } = req.body
        const datos = { sred, }
        const resultado = await reportes3.listarMunicipio(datos)
        let c = 1
        let data = []
        resultado.forEach(async e => {
            const h = await reportes3.listarHospitalesFormulario({ smun: e.id })
            h.forEach(hp => {
                data.push(hp)
            })
            if (c === resultado.length) {
                return res.json({ data: data, ok: true, msg: 'lista de establecimientos' })
            }
            c++
        })

        // console.log(resultado)
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


rutas.post("/listarmes", id, async (req, res) => {

    try {
        const resultado = await reportes3.listarMes(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


// variables del municipio

rutas.post("/listartodosvariableR", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await reportes3.listarTodosVariableR(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listarvariableR", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await reportes3.listarVariableR(req.body.id, req.body.ssector)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


// variables de nivel 4: municipio
rutas.post("/listartodosvariable-mun", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await reportes3.listarTodosVariablemun(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listarvariable-mun", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await reportes3.listarVariablemun(req.body.id, req.body.ssector)
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
        const resultado = await reportes3.listarTodosVariable(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listarvariable", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await reportes3.listarVariable(req.body.id, req.body.ssector)
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
        const resultado = await reportes3.listarIndicadores(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})
rutas.post("/maxorden", async (req, res) => {
    try {
        const resultado = await reportes3.maxordengen(req.body.id)
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
        const resultado = await reportes3.listarCabeceras(datos)
        // console.log(resultado)

        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

























//REPORTES


//variables del município
rutas.post("/unavariableR", async (req, res) => {
    try {
        const { sred, variable, gestion, mes1, mes2 } = req.body
        const datos = { sred, variable, gestion, mes1, mes2 }
        const resultado = await reportes3.listarDatosTodosVariableR(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/indicadorespecificoR", async (req, res) => {
    try {
        const { sred, indicador, gestion, mes1, mes2 } = req.body
        const datos = { sred, indicador, gestion, mes1, mes2 }
        const resultado = await reportes3.listarDatosVariableElegidoR(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})




// consolidado red
rutas.post("/unavariableconsolidado-red", async (req, res) => {
    try {
        const { sred, variable, gestion, mes1, mes2 } = req.body
        const datos = { sred, variable, gestion, mes1, mes2 }
        const resultado = await reportes3.listarDatosTodosVariableConsolidadored(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/indicadorespecificoconsolidado-red", async (req, res) => {
    try {
        const { sred, indicador, gestion, mes1, mes2 } = req.body
        const datos = { sred, indicador, gestion, mes1, mes2 }
        const resultado = await reportes3.listarDatosVariableElegidoConsolidadored(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

// consolidado municipio
rutas.post("/unavariableconsolidado-mun", async (req, res) => {
    try {
        const { mun, variable, gestion, mes1, mes2 } = req.body
        const datos = { mun, variable, gestion, mes1, mes2 }
        const resultado = await reportes3.listarDatosTodosVariableConsolidadomun(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/indicadorespecificoconsolidado-mun", async (req, res) => {
    try {
        const { mun, indicador, gestion, mes1, mes2 } = req.body
        const datos = { mun, indicador, gestion, mes1, mes2 }
        const resultado = await reportes3.listarDatosVariableElegidoConsolidadomun(datos)
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
        const resultado = await reportes3.listarDatosTodosVariableEstablecimiento(datos)
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
        const resultado = await reportes3.listarDatosVariableElegidoEstablecimiento(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})




// formularios de municipio

//variables del município, sin consolidar
rutas.post("/unavariableM", async (req, res) => {
    try {
        const { mun, variable, gestion, mes1, mes2 } = req.body
        const datos = { mun, variable, gestion, mes1, mes2 }
        const resultado = await reportes3.listarDatosTodosVariableM(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/indicadorespecificoM", async (req, res) => {
    try {
        const { mun, indicador, gestion, mes1, mes2 } = req.body
        const datos = { mun, indicador, gestion, mes1, mes2 }
        const resultado = await reportes3.listarDatosVariableElegidoM(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

// varaibles de municipio consolidado red
rutas.post("/unavariablemunicipioconsolidado-red", async (req, res) => {
    try {
        const { sred, variable, gestion, mes1, mes2 } = req.body
        const datos = { sred, variable, gestion, mes1, mes2 }
        const resultado = await reportes3.listarDatosTodosVariableMConsolidado(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/indicadorespecificomunicipioconsolidado-red", async (req, res) => {
    try {
        const { sred, indicador, gestion, mes1, mes2 } = req.body
        const datos = { sred, indicador, gestion, mes1, mes2 }
        const resultado = await reportes3.listarDatosVariableElegidoMConsolidado(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


















// listar datos por formulario por hospital
rutas.post("/listardatosformulario-por-hospital", async (req, res) => {
    try {
        const { est, variable, gestion, mes1, mes2 } = req.body
        const datos = { est, variable, gestion, mes1, mes2 }
        const resultado = await reportes3.listarDatosFormularioPorHospital(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

// listar datos por formulario consolidado por municipio
rutas.post("/listardatosformulario-por-municipio", async (req, res) => {
    try {
        const { mun, variable, gestion, mes1, mes2 } = req.body
        const datos = { mun, variable, gestion, mes1, mes2 }
        const resultado = await reportes3.listarDatosFormularioPorMunicipio(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


// listar datos por red consolidado
rutas.post("/listardatosformularioconsolidado", async (req, res) => {
    try {
        const { sred, variable, gestion, mes1, mes2 } = req.body
        const datos = { sred, variable, gestion, mes1, mes2 }
        const resultado = await reportes3.listarDatosFormularioConsolidado(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})
























//

// listar datos por formulario de nivel municipio
rutas.post("/listardatosformulario-por-variable-municipio", async (req, res) => {
    try {
        const { mun, variable, gestion, mes1, mes2 } = req.body
        const datos = { mun, variable, gestion, mes1, mes2 }
        const resultado = await reportes3.listarDatosFormularioMunicipio(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


// listar datos por red consolidado
rutas.post("/listardatosformulariomunicipioconsolidado", async (req, res) => {
    try {
        const { sred, variable, gestion, mes1, mes2 } = req.body
        const datos = { sred, variable, gestion, mes1, mes2 }
        const resultado = await reportes3.listarDatosFormularioMunicipioConsolidado(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})



































export default rutas;