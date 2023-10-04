import { Router } from "express"
import { Variable } from "../modelo/variable.js"
import { insertar, editar, gestion, buscar, id, insertarFila, editarFila, eliminarFila, insertarInput, editarInput, eliminarInput, insertarOtroInput, añadirInput, } from '../validacion/variable.js'
import pool from '../modelo/bdConfig.js'

const rutas = Router()
const variable = new Variable()


rutas.post("/listargestion", async (req, res) => {

    try {
        const resultado = await variable.listarGestion()
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})
rutas.post("/listar", gestion, async (req, res) => {
    try {
        const { gestion, rol_ } = req.body
        const datos = { gestion, rol: rol_ }
        const resultado = await variable.listar(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})



rutas.post("/insertar", insertar, async (req, res) => {
    // console.log(req.body)

    const { variable1, gestion, rol_, creado, usuario } = req.body
    const datos = {
        variable: variable1,
        gestion, rol: rol_,
        creado,
        usuario
    }
    try {

        await variable.insertar(datos).then(j => {
            if (j.existe === 1)
                return res.json({ ok: false, msg: 'Este formulario ya esta registrado en la gestion y rol seleccionado' })
            if (j.existe === 2)
                return res.json({ ok: false, msg: 'Año no encontrado' })
            if (j.existe === 3)
                return res.json({ ok: false, msg: 'Rol no encontrado' })

            return res.json({ data: j, ok: true, msg: 'Operacion exitosa' })
        })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})







rutas.post("/actualizar", editar, async (req, res) => {
    // console.log(req.body)

    const { id, variable1, gestion, rol_, modificado, usuario } = req.body
    const datos = {
        id,
        variable: variable1,
        gestion,
        rol: rol_,
        modificado,
        usuario
    }
    try {
        await variable.actualizar(datos).then(j => {
            if (j.existe === 1)
                return res.json({ ok: false, msg: 'Este formulario ya esta registrado en la gestion y rol seleccionado' })
            return res.json({ data: j, ok: true, msg: 'Operacion exitosa' })
        })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


rutas.post("/eliminar", id, async (req, res) => {
    const { id, gestion, rol_, modificado, usuario } = req.body
    const datos = {
        id,
        gestion,
        rol: rol_,
        modificado,
        usuario
    }
    try {

        await variable.eliminar(datos).then(j => {
            if (j.existe === 1)
                return res.json({ ok: false, msg: 'Este formulario contiene valores, no se puede realizar la operacion eliminar' })
            return res.json({ data: j, ok: true, msg: 'formulario quitado correctamente' })
        })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})

rutas.post("/iniciar", async (req, res) => {
    try {

        const { variable_, gestion, rol_, modificado, usuario } = req.body
        const datos = {
            variable: variable_,
            gestion,
            rol: rol_,
            modificado,
            usuario
        }
        if (req.body.lista.length > 0) {
            const sqlInd = `SELECT id FROM indicador
            WHERE variable= ${pool.escape(datos.variable)} `;
            const [resultInd] = await pool.query(sqlInd);
            if (resultInd.length > 0) {


                let indicador = resultInd[0].id
                const sql = `SELECT tope, nivel FROM input
                WHERE indicador_ = ${pool.escape(indicador)} and tope=1 `;
                const [result] = await pool.query(sql);
                // console.log(result)
                if (result.length > 0) {

                    const sqlMaxNivel = `SELECT max(nivel) as nivel FROM input
                    WHERE indicador_ = ${pool.escape(indicador)}`;
                    const [resultMaxNivel] = await pool.query(sqlMaxNivel);

                    let c = 1
                    let mismoNivel = false
                    let retorno = true
                    result.forEach(async e => {

                        if (e.tope === 1 && resultMaxNivel[0].nivel === e.nivel) {
                            mismoNivel = true
                        }
                        else {
                            mismoNivel = false
                            c = 10000
                            if (retorno) {
                                retorno = false
                                return res.json({ ok: false, msg: 'la(s) subvariables del formulario deben estar a la misma profundidad' })
                            }
                        }

                        if (c === result.length) {
                            console.log('entrado')
                            if (mismoNivel === true) {
                                const sqlIniciarVar = ` 
                                update variable set estado = 1,
                                modificado = ${pool.escape(datos.modificado)},
                                usuario = ${pool.escape(datos.usuario)}
                                WHERE id = ${pool.escape(datos.variable)}`;
                                await pool.query(sqlIniciarVar);
                                // console.log(req.body.lista, 'lista')
                                let c_ = 0
                                req.body.lista.forEach(async element => {
                                    if (element.estado === 1) {
                                        c_++
                                        const data = {
                                            id_: element.id,
                                            orndegen: c_,
                                            variable: datos.variable,
                                            input: element.input,
                                            idinput: element.idinput,
                                            nivel: element.nivel,
                                            span: element.span,
                                            tope: element.tope,
                                            orden: element.orden,
                                            cod: element.cod
                                        }

                                        pool.query('INSERT INTO cabeceras SET ?', data)
                                        // console.log(c, req.body.lista.length)
                                        // if (c === req.body.lista.length) {


                                        // }
                                        const sqlIniciarVar = ` 
                                                    update input set ordengen = ${pool.escape(c_)},
                                                    modificado = ${pool.escape(modificado)},
                                                    usuario = ${pool.escape(usuario)}
                                                    WHERE cod = ${pool.escape(element.cod)}`;
                                        await pool.query(sqlIniciarVar);
                                    }
                                })
                                // setTimeout(async () => {
                                //     const sqlCab = `SELECT * FROM cabeceras
                                //                 WHERE variable = ${pool.escape(datos.variable)}`;
                                //     const [resultCab] = await pool.query(sqlCab);
                                //     console.log('entra a actualizar el orden de los inputs', resultCab)

                                //     resultCab.forEach(async e => {
                                //         const sqlIniciarVar = ` 
                                //                     update input set ordengen = ${pool.escape(e.orndegen)},
                                //                     modificado = ${pool.escape(datos.modificado)},
                                //                     usuario = ${pool.escape(datos.usuario)}
                                //                     WHERE cod = ${pool.escape(e.cod)}`;
                                //         await pool.query(sqlIniciarVar);
                                //     })
                                // }, 5000)
                                const result = await variable.listar({ gestion: gestion, rol: rol_ })

                                return res.json({ data: result, ok: true, msg: 'Formulario Iniciado' })
                            }
                        }
                        c++
                    })

                } else return res.json({ ok: false, msg: 'No se encontró las subvaraibles este formulario' })
            } else return res.json({ ok: false, msg: 'No hay variables en este formulario' })
        } else return res.json({ ok: false, msg: 'No se encontro ninguna subvariable' })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})
rutas.post("/detener", id, async (req, res) => {
    try {
        // console.log(req.body)
        const { id, gestion, rol_, modificado, usuario } = req.body
        const datos = {
            variable: id,
            gestion,
            rol: rol_,
            modificado,
            usuario
        }
        await variable.detener(datos).then(j => {
            return res.json({ data: j, ok: true, msg: 'el formulario se ha detenido' })
        })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})
// rutas.post("/suspender", id, async (req, res) => {
//     try {
//         // console.log(req.body)
//         const { id, gestion, rol_, modificado, usuario } = req.body
//         const datos = {
//             variable: id,
//             gestion,
//             rol: rol_,
//             modificado,
//             usuario
//         }
//         await variable.suspender(datos).then(j => {
//             return res.json({ data: j, ok: true, msg: 'el formulario se ha suspendido correctamente, ' })
//         })

//     } catch (error) {
//         console.log(error)
//         return res.json({ msg: 'Error en el servidor', ok: false })
//     }

// })


//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////INDICADOR
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////


rutas.post("/listarindicador", id, async (req, res) => {

    try {
        const resultado = await variable.listarIndicador(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})

rutas.post("/insertarindicador", insertarFila, async (req, res) => {

    const { variable1, ini, fin, indicador, creado, usuario } = req.body
    const datos = {
        variable: variable1,
        indicador, ini, fin,
        creado,
        usuario
    }
    try {

        await variable.insertarIndicador(datos).then(j => {
            if (j.existe === 1)
                return res.json({ ok: false, msg: 'Esta variable ya esta registrado en este cuaderno' })
            return res.json({ data: j, ok: true, msg: 'Operacion exitosa' })
        })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/actualizarindicador", editarFila, async (req, res) => {
    // console.log(req.body)

    const { id, variable1, ini, fin, indicador, modificado, usuario } = req.body
    const datos = {
        id,
        variable: variable1,
        indicador, ini, fin,
        modificado,
        usuario
    }
    try {
        await variable.actualizarIndicador(datos).then(j => {
            if (j.existe === 1)
                return res.json({ ok: false, msg: 'Esta variable ya esta registrado en este cuaderno' })

            return res.json({ data: j, ok: true, msg: 'Operacion exitosa' })
        })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/eliminarindicador", eliminarFila, async (req, res) => {
    // console.log(req.body)
    try {

        await variable.eliminarIndicador({ id: req.body.id, variable: req.body.variable1, modificado: req.body.modificado, usuario: req.body.usuario }).then(j => {
            if (j.existe === 1) {
                return res.json({ ok: false, msg: 'Esta variable ya tiene valores' })
            }
            return res.json({ data: j, ok: true, msg: 'Operacion exitosa' })
        })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})

rutas.post("/activarindicador", eliminarFila, async (req, res) => {
    // console.log(req.body)
    try {

        await variable.activarIndicador({ id: req.body.id, variable: req.body.variable1, modificado: req.body.modificado, usuario: req.body.usuario }).then(j => {
            return res.json({ data: j, ok: true, msg: 'Operacion exitosa' })
        })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})

rutas.post("/desactivarindicador", eliminarFila, async (req, res) => {
    // console.log(req.body)
    try {

        await variable.desactivarIndicador({ id: req.body.id, variable: req.body.variable1, modificado: req.body.modificado, usuario: req.body.usuario }).then(j => {
            return res.json({ data: j, ok: true, msg: 'Operacion exitosa' })
        })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})



//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////INPUTS
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////



rutas.post("/listarinput", id, async (req, res) => {

    try {
        const resultado = await variable.listarInput(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})
rutas.post("/listarinput2", id, async (req, res) => {
    // console.log(req.body)
    try {
        const resultado = await variable.listarInput2(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})


rutas.post("/insertarinput", insertarInput, async (req, res) => {
    console.log(req.body)
    try {
        const { input, ini, gestion, fin, variable_, creado, usuario } = req.body
        const datos = {
            input, ini, fin,
            nivel: 1, gestion,
            variable: variable_,
            creado,
            usuario
        }
        if (req.body.listaInd.length > 0) {
            await variable.insertarInput(datos, req.body.listaInd).then(j => {
                if (j.existe === 1)
                    return res.json({ ok: false, msg: 'Esta subvariable ya esta registrado en este formulario' })

                return res.json({ data: j, ok: true, msg: 'Operacion exitosa' })
            })
        } else return res.json({ ok: false, msg: 'No existe la variable' })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/anadirnuevosinput", añadirInput, async (req, res) => {
    // console.log(req.body)
    try {
        const { indicador, variable_, ini, fin, creado, usuario } = req.body
        const datos = {
            indicador, ini, fin,
            variable: variable_,
            creado,
            usuario
        }
        if (req.body.lista.length > 0) {
            await variable.añadirOtroInput(datos, req.body.lista).then(j => {

                return res.json({ ok: true, msg: 'Operacion exitosa' })
            })
        } else return res.json({ ok: false, msg: 'No existe la variable' })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


rutas.post("/actualizarinput", editarInput, async (req, res) => {
    // console.log(req.body)
    try {
        const { id, idinput, codigo, ini, fin, input, modificado, usuario } = req.body
        const datos = {
            id, ini, fin,
            idinput,
            input,
            codigo,
            modificado,
            usuario
        }
        await variable.actualizarInput(datos).then(j => {
            if (j.existe === 1)
                return res.json({ ok: false, msg: 'Esta subvariable ya esta registrado en este formulario' })
            if (j.ok)
                return res.json({ data: j, ok: true, msg: 'Operacion exitosa' })
        })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/eliminarinput", eliminarInput, async (req, res) => {
    // console.log(req.body)
    try {
        await variable.eliminarInput({ modificado: req.body.modificado, gestion: req.body.gestion, idinput: req.body.idinput, variable: req.body.variable_, cod: req.body.codigo, usuario: req.body.usuario }).then(j => {
            return res.json({ data: j, ok: true, msg: 'Operacion exitosa' })
        })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})

rutas.post("/activarinput", eliminarInput, async (req, res) => {
    // console.log(req.body)
    try {
        await variable.activarInput({ modificado: req.body.modificado, gestion: req.body.gestion, idinput: req.body.idinput, variable: req.body.variable_, cod: req.body.codigo, usuario: req.body.usuario }).then(j => {
            return res.json({ data: j, ok: true, msg: 'Operacion exitosa' })
        })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})

rutas.post("/desactivarinput", eliminarInput, async (req, res) => {
    // console.log(req.body)
    try {
        await variable.desactivarInput({ modificado: req.body.modificado, gestion: req.body.gestion, idinput: req.body.idinput, variable: req.body.variable_, cod: req.body.codigo, usuario: req.body.usuario }).then(j => {
            return res.json({ data: j, ok: true, msg: 'Operacion exitosa' })
        })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})




//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////OTROS INPUTS
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////



rutas.post("/insertarotroinput", insertarOtroInput, async (req, res) => {

    const { codigo, nivel, orden, ini, fin, idinput,estado, gestion, input, variable_, creado, usuario } = req.body
    const datos = {
        codigo, gestion,
        orden, ini, fin,
        input,
        idinput,
        nivel,
        variable: variable_,estado,
        creado,
        usuario
    }
    try {

        await variable.insertarOtroInput(datos).then(j => {
            if (j.existe === 1)
                return res.json({ ok: false, msg: 'Faltan argumentos de la variable' })
            if (j.existe === 2)
                return res.json({ ok: false, msg: 'Esta subvariable ya esta  registrado' })

            if (j.ok)
                return res.json({ data: j, ok: true, msg: 'Operacion exitosa' })
        })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


export default rutas;