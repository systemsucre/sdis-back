import { Router } from "express"
import { Opeinf4 } from "../../modelo/opienf/opeinf4.js"
import { id, } from '../../validacion/formulario/formulario5.js'


const rutas = Router()
const opeinf4 = new Opeinf4()



rutas.post("/listargestion", async (req, res) => {
    try {
        const resultado = await opeinf4.listarGestion()
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})
rutas.post("/listarmes", id, async (req, res) => {

    try {
        const resultado = await opeinf4.listarMes(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false }) 
    }
})



rutas.post("/listardatos", async (req, res) => {
    // console.log(req.body)
    try {
        const {  gestion, mes1, smun} = req.body
        const datos = {  gestion, mes1,smun }
        const resultado = await opeinf4.listardatos(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


export default rutas;