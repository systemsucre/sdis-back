import { Router } from "express"
import { Formulario4 } from "../../modelo/formulario/formulario4.js"
import { id, listarmes, } from '../../validacion/formulario/formulario5.js'

import pool from '../../modelo/bdConfig.js'  

const rutas = Router()
const formulario4 = new Formulario4()



rutas.post("/listargestion", async (req, res) => {
    try {
        const resultado = await formulario4.listarGestion()
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listarmes", listarmes, async (req, res) => {

    try {
        const resultado = await formulario4.listarMes(req.body.id, req.body.fecha)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listarvariable", id, async (req, res) => {
    try {
        const resultado = await formulario4.listarVariable(req.body.id, req.body.rol, req.body.ss) 
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listarindicadores", async (req, res) => {
    try {
        const { variable, fecha, smun, mes } = req.body
        const datos = { variable, fecha, smun, mes }
        const resultado = await formulario4.listarIndicadores(datos)
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
        const resultado = await formulario4.cantidadItem(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})



rutas.post("/guardar", async (req, res) => {
    // console.log(req.body, 'datos en guardar info valores')
    const { usuario, smun, mes, gestion, datos, variable, estado, fecha, hora, } = req.body
    const data ={
        variable, fecha, smun, mes
    }

    try {
        if (datos.length > 0) {


            const sqlEliminarValores = `delete from valor
                    where mes = ${pool.escape(mes)} and 
                    mun = ${pool.escape(smun)} and variable = ${pool.escape(parseInt(variable))}`
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
                    mun: smun,
                    variable: variable, indicador: e.idindicador
                }
                pool.query('INSERT INTO valor SET  ?', insert)
                // console.log('guardar datos', insert)
                if (c === datos.length) {
                    const result = await formulario4.listarIndicadores(data)
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
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})





export default rutas;