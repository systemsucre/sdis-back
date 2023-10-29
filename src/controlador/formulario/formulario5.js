import { Router } from "express"
import { Formulario5 } from "../../modelo/formulario/formulario5.js"
import { id, listarmes, } from '../../validacion/formulario/formulario5.js'

import pool from '../../modelo/bdConfig.js'

const rutas = Router()
const formulario5 = new Formulario5()



rutas.post("/listargestion", async (req, res) => {
    try {
        const resultado = await formulario5.listarGestion()
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})
rutas.post("/listarmes", listarmes, async (req, res) => {

    try {
        const resultado = await formulario5.listarMes(req.body.id, req.body.fecha)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listarvariable", id, async (req, res) => {
    try {
        const resultado = await formulario5.listarVariable(req.body.id, req.body.rol, req.body.sest)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listarindicadores", async (req, res) => {
    try {
        const { variable, fecha, sest, mes } = req.body
        const datos = { variable, fecha, sest, mes }
        const resultado = await formulario5.listarIndicadores(datos)
        // console.log(resultado, resultado.length)
        if (resultado[0].length === 0) {
            return res.json({ data: resultado, ok: false, msg: 'No se crearon las variables para esta grupo' })
        } else
            return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


rutas.post("/cantidaditem", id, async (req, res) => {

    try {
        const resultado = await formulario5.cantidadItem(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})



rutas.post("/guardar", async (req, res) => {
    const { usuario, sest, mes, gestion, datos, variable, estado, fecha, hora, } = req.body
    const data ={
        variable, fecha, sest, mes
    }

    try {
        if (datos.length > 0) {


            const sqlEliminarValores = `delete from valor
                    where mes = ${pool.escape(mes)} and 
                    establecimiento = ${pool.escape(sest)} and variable = ${pool.escape(parseInt(variable))}`
            await pool.query(sqlEliminarValores)

            let c = 0
            datos.forEach(async e => {
                c++
                let insert = {
                    valor: e.valor,
                    fecha: fecha,
                    hora: hora,
                    gestion: gestion,
                    mes: mes,
                    usuario: usuario,
                    input: e.input,
                    cod: e.cod,
                    estado: estado,
                    establecimiento: sest,
                    variable: variable, indicador: e.idindicador
                }
                pool.query('INSERT INTO valor SET  ?', insert)
                if (c === datos.length) {
                    const result = await formulario5.listarIndicadores(data)
                    return res.json({ ok: true, data:result, msg: 'Datos guardados correctamente' })
                }
            });
        } else return res.json({ ok: false, msg: 'No se encontro los valores' })
    } catch (error) {
        console.log(error.sqlState)
        console.log(error)

        // if (error.sqlState === '40001') {
        //     console.log('error sql transaccion, enviando mensaje de reintento de transacción')
        // }
        // return res.json({ data: error.sqlState, msg: error.sqlMessage, ok: false })
    }

})





export default rutas;