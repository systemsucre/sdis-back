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



rutas.post("/reportes-formularios-enteros-est-nivel-5", async (req, res) => {
    try {
        const { lista, est, gestion, mes1, mes2 } = req.body
        console.log(req.body)
        if (lista.length > 0) {

            let cf = 0
            let dataCabeceras = []
            let dataInd_ = []
            let data_ = []

            lista.forEach(async f => {
                const cabecera = await reportes5.listarCabeceras({ variable: f })
                const ind = await reportes5.listarIndicadores({ variable: f })
                for (let c of cabecera) {
                    dataCabeceras.push(c)
                }
                for (let i of ind) {
                    dataInd_.push(i)
                }

                cf++
                if (cf === lista.length) {
                    let cd = 0
                    lista.forEach(async f => {
                        const dataForm = await reportes5.listarDatosTodosVariableEstablecimiento({ variable: f, est: req.body.sest, gestion: gestion, mes1: mes1, mes2: mes2 })
                        dataForm[1].forEach(e1 => {
                            dataForm[0].forEach(e2 => {
                                if (parseInt(e1.input) === parseInt(e2.idinput)) {
                                    e1.valor = e2.valor
                                }
                            })
                            data_.push(e1)
                        })
                        cd++
                        if (cd === lista.length) {
                            return res.json({ dataForm: data_, cabeceras: dataCabeceras, indicadores: dataInd_, ok: true })
                        }
                    })

                }

            })
        } else return res.json({ msg: 'no se ha encontrado formulario(s)', ok: false })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})
rutas.post("/reportes-formularios-dividido-est-nivel-5", async (req, res) => {
    try {
        const { lista, est, variable, gestion, mes1, mes2 } = req.body
        if (lista.length > 0) {
            const cabecera = await reportes5.listarCabeceras({ variable: variable })
            const ind = await reportes5.listarIndicadores({ variable: variable })
            let data_ = []
            let cd = 0
            lista.forEach(async f => {
                const dataForm = await reportes5.listarDatosVariableElegidoEstablecimiento({ indicador: f, est: req.body.sest, gestion: gestion, mes1: mes1, mes2: mes2 })
                dataForm[1].forEach(e1 => {
                    dataForm[0].forEach(e2 => {
                        if (parseInt(e1.input) === parseInt(e2.idinput)) {
                            e1.valor = e2.valor
                        }
                    })
                    data_.push(e1)
                })
                cd++
                if (cd === lista.length) {
                    return res.json({ dataForm: data_, cabeceras: cabecera, indicadores: ind, ok: true })
                }
            })
        } else return res.json({ msg: 'no se ha encontrado la variable', ok: false })
    } catch (error) {

        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})



export default rutas;