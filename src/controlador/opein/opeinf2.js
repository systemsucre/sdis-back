import { Router } from "express"
import { Opeinf2 } from "../../modelo/opienf/opeinf2.js"
import { id, } from '../../validacion/formulario/formulario5.js'


const rutas = Router()
const opeinf2 = new Opeinf2()



rutas.post("/listargestion", async (req, res) => {
    try {
        const resultado = await opeinf2.listarGestion()
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})
rutas.post("/listarmes", id, async (req, res) => {

    try {
        const resultado = await opeinf2.listarMes(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false }) 
    }
})



rutas.post("/listardatos", async (req, res) => {
    console.log(req.body)
    try {
        const {  gestion, mes1, } = req.body
        const datos = {  gestion, mes1, }
        const resultado = await opeinf2.listardatos(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


export default rutas;