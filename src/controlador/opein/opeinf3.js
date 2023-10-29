import { Router } from "express"
import { Opeinf3 } from "../../modelo/opienf/opeinf3.js"
import { id, } from '../../validacion/formulario/formulario5.js'


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



rutas.post("/listardatos", async (req, res) => {
    // console.log(req.body)
    try {
        const {  gestion, mes1, sred} = req.body
        const datos = {  gestion, mes1,sred }
        const resultado = await opeinf3.listardatos(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


export default rutas;