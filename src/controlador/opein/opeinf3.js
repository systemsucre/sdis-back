import { Router } from "express"
import { Opeinf3 } from "../../modelo/opienf/opeinf3.js"
import { id, } from '../../validacion/registro.js'


const rutas = Router()
const opeinf3 = new Opeinf3()



rutas.post("/listargestion", async (req, res) => {
    try {
        const resultado = await opeinf3.listarGestion()
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})
rutas.post("/listarmes", id, async (req, res) => {

    try {
        const resultado = await opeinf3.listarMes(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false }) 
    }
})
rutas.post("/listarmunicipio", async (req, res) => {

    try {
        const resultado = await opeinf3.listarMun(req.body.sred) 
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false }) 
    }
})

rutas.post("/listarvariableinicio", async (req, res) => {

    try {
        const resultado = await opeinf3.listarVariableinicio()
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listarvariable", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await opeinf3.listarVariable(req.body.id, )
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
        const resultado = await opeinf3.listarIndicadores(datos)
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
        const resultado = await opeinf3.listarCabeceras(datos)
        // console.log(resultado)

        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


rutas.post("/all-inf", async (req, res) => {
    try {
        const { municipio, variable, gestion, mes1, mes2 } = req.body
        const datos = { municipio, variable, gestion, mes1, mes2 }
        const resultado = await opeinf3.listarDatosTodosVariable(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})




export default rutas;