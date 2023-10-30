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




rutas.post("/listarmes", id, async (req, res) => {

    try {
        const resultado = await reportes3.listarMes(req.body.id)
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
        const resultado = await reportes3.listarIndicadores(datos)
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





// REPORTES
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// FORMULARIOS NIVEL ESTABLECIMIENTOS


rutas.post("/procesar-por-establecimiento_form_est", async (req, res) => {
    try {
        let data__ = []
        let data_ = []
        let contador_color = 2

        const { sred, variable, gestion, mes1, mes2 } = req.body
        const cabecera = await reportes3.listarCabeceras({ variable: variable })
        const resultado = await reportes3.listarHospitales_form_establecimiento({ sred: sred })
        // console.log('estab', resultado)

        if (resultado.length == 0) {
            return res.json({ ok: false, msg: 'no se encontro hospital' })
        }
        let indicador = await reportes3.listarIndicadores({ variable: variable })
        let contadorMunicipio = 0

        resultado.forEach(async m => {
            let rango = 1
            if ((contador_color % 2) == 0)
                indicador.forEach(i => {
                    data__.push({ color: 1, est: rango == 1 ? m.nombre : null, id: i.id, idest: m.id, indicador: i.indicador, variable: i.variable })
                    rango = 0
                })
            else
                indicador.forEach(i => {
                    data__.push({ color: 0, est: rango == 1 ? m.nombre : null, id: i.id, idest: m.id, indicador: i.indicador, variable: i.variable })
                    rango = 0
                })

            contador_color++
            contadorMunicipio++
            if (contadorMunicipio == resultado.length) {
                let cd = 0
                resultado.forEach(async m => {
                    const dataForm = await reportes3.listarDatosFormularioPorHospital({ est: m.id, variable: variable, gestion: gestion, mes1: mes1, mes2: mes2 })
                    dataForm[1].forEach(i => {
                        dataForm[0].forEach(v => {
                            if (parseInt(i.input) === parseInt(v.idinput)) {
                                i.valor = v.valor
                            }
                        })
                        i.idest = m.id
                        i.est = m.nombre
                        data_.push(i)
                    })
                    cd++
                    if (cd === resultado.length) {
                        console.log(cabecera)
                        return res.json({ ok: true, conf: data__, data: data_, cabecera: cabecera })
                    }
                })
            }
        })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


// POR MUNICIPIOS
rutas.post("/procesar-por-municipio_form_est", async (req, res) => {
    try {
        let data__ = []
        let data_ = []
        let contador_color = 2

        const { sred, variable, gestion, mes1, mes2 } = req.body
        const cabecera = await reportes3.listarCabeceras({ variable: variable })
        const resultado = await reportes3.listarMunicipio({ sred: sred })
        // console.log('muni', resultado)

        if (resultado.length == 0) {
            return res.json({ ok: false, msg: 'no se encontro hospital' })
        }
        let indicador = await reportes3.listarIndicadores({ variable: variable })
        let contadorMunicipio = 0

        resultado.forEach(async m => {
            let rango = 1
            if ((contador_color % 2) == 0)
                indicador.forEach(i => {
                    data__.push({ color: 1, est: rango == 1 ? m.nombre : null, id: i.id, idest: m.id, indicador: i.indicador, variable: i.variable })
                    rango = 0
                })
            else
                indicador.forEach(i => {
                    data__.push({ color: 0, est: rango == 1 ? m.nombre : null, id: i.id, idest: m.id, indicador: i.indicador, variable: i.variable })
                    rango = 0
                })

            contador_color++
            contadorMunicipio++
            if (contadorMunicipio == resultado.length) {
                let cd = 0
                resultado.forEach(async m => {
                    const dataForm = await reportes3.listarDatosFormularioEst_Municipio({ mun: m.id, variable: variable, gestion: gestion, mes1: mes1, mes2: mes2 })
                    dataForm[1].forEach(i => {
                        dataForm[0].forEach(v => {
                            if (parseInt(i.input) === parseInt(v.idinput)) {
                                i.valor = v.valor
                            }
                        })
                        i.idest = m.id
                        i.est = m.nombre
                        data_.push(i)
                    })
                    cd++
                    if (cd === resultado.length) {
                        // console.log(cabecera)
                        return res.json({ ok: true, conf: data__, data: data_, cabecera: cabecera })
                    }
                })
            }
        })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

// CONSOLIDADO POR RED
rutas.post("/procesar-est-consolidado_form_est", async (req, res) => {
    try {
        let data__ = []
        let data_ = []
        let contador_color = 2

        const { variable, gestion, mes1, mes2, red, sred } = req.body
        const cabecera = await reportes3.listarCabeceras({ variable: variable })
        const resultado = [{ id: sred, nombre: red }]
        console.log('muni', resultado)

        if (resultado.length == 0) {
            return res.json({ ok: false, msg: 'no se encontro hospital' })
        }
        let indicador = await reportes3.listarIndicadores({ variable: variable })
        let contadorMunicipio = 0

        resultado.forEach(async m => {
            let rango = 1
            if ((contador_color % 2) == 0)
                indicador.forEach(i => {
                    data__.push({ color: 1, est: rango == 1 ? m.nombre : null, id: i.id, idest: m.id, indicador: i.indicador, variable: i.variable })
                    rango = 0
                })
            else
                indicador.forEach(i => {
                    data__.push({ color: 0, est: rango == 1 ? m.nombre : null, id: i.id, idest: m.id, indicador: i.indicador, variable: i.variable })
                    rango = 0
                })

            contador_color++
            contadorMunicipio++
            if (contadorMunicipio == resultado.length) {
                let cd = 0
                resultado.forEach(async m => {
                    const dataForm = await reportes3.listarDatosFormularioEst_Consolidado({ red: m.id, variable: variable, gestion: gestion, mes1: mes1, mes2: mes2 })
                    dataForm[1].forEach(i => {
                        dataForm[0].forEach(v => {
                            if (parseInt(i.input) === parseInt(v.idinput)) {
                                i.valor = v.valor
                            }
                        })
                        i.idest = m.id
                        i.est = m.nombre
                        data_.push(i)
                    })
                    cd++
                    if (cd === resultado.length) {
                        // console.log(cabecera)
                        return res.json({ ok: true, conf: data__, data: data_, cabecera: cabecera })
                    }
                })
            }
        })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


// FORMULARIOS NIVEL MUNICIPIO
rutas.post("/procesar-mun_form_mun", async (req, res) => {
    try {
        let data__ = []
        let data_ = []
        let contador_color = 2

        const { variable, gestion, mes1, mes2, sred } = req.body
        const cabecera = await reportes3.listarCabeceras({ variable: variable })
        const resultado = await reportes3.listarMunicipio({ sred: sred })

        if (resultado.length == 0) {
            return res.json({ ok: false, msg: 'no se encontro hospital' })
        }
        let indicador = await reportes3.listarIndicadores({ variable: variable })
        let contadorMunicipio = 0

        resultado.forEach(async m => {
            let rango = 1
            if ((contador_color % 2) == 0)
                indicador.forEach(i => {
                    data__.push({ color: 1, est: rango == 1 ? m.nombre : null, id: i.id, idest: m.id, indicador: i.indicador, variable: i.variable })
                    rango = 0
                })
            else
                indicador.forEach(i => {
                    data__.push({ color: 0, est: rango == 1 ? m.nombre : null, id: i.id, idest: m.id, indicador: i.indicador, variable: i.variable })
                    rango = 0
                })

            contador_color++
            contadorMunicipio++
            if (contadorMunicipio == resultado.length) {
                let cd = 0
                resultado.forEach(async m => {
                    const dataForm = await reportes3.listarDatosFormularioMun({ mun: m.id, variable: variable, gestion: gestion, mes1: mes1, mes2: mes2 })
                    dataForm[1].forEach(i => {
                        dataForm[0].forEach(v => {
                            if (parseInt(i.input) === parseInt(v.idinput)) {
                                i.valor = v.valor
                            }
                        })
                        i.idest = m.id
                        i.est = m.nombre
                        data_.push(i)
                    })
                    cd++
                    if (cd === resultado.length) {
                        // console.log(cabecera)
                        return res.json({ ok: true, conf: data__, data: data_, cabecera: cabecera })
                    }
                })
            }
        })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


// CONSOLIDADO POR RED
rutas.post("/procesar-mun-consolidado_form_mun", async (req, res) => {
    try {
        let data__ = []
        let data_ = []
        let contador_color = 2

        const { variable, gestion, mes1, mes2, red, sred } = req.body
        const cabecera = await reportes3.listarCabeceras({ variable: variable })
        const resultado = [{ id: sred, nombre: red }]
        console.log('muni', resultado)

        if (resultado.length == 0) {
            return res.json({ ok: false, msg: 'no se encontro hospital' })
        }
        let indicador = await reportes3.listarIndicadores({ variable: variable })
        let contadorMunicipio = 0

        resultado.forEach(async m => {
            let rango = 1
            if ((contador_color % 2) == 0)
                indicador.forEach(i => {
                    data__.push({ color: 1, est: rango == 1 ? m.nombre : null, id: i.id, idest: m.id, indicador: i.indicador, variable: i.variable })
                    rango = 0
                })
            else
                indicador.forEach(i => {
                    data__.push({ color: 0, est: rango == 1 ? m.nombre : null, id: i.id, idest: m.id, indicador: i.indicador, variable: i.variable })
                    rango = 0
                })

            contador_color++
            contadorMunicipio++
            if (contadorMunicipio == resultado.length) {
                let cd = 0
                resultado.forEach(async m => {
                    const dataForm = await reportes3.listarDatosFormularioMunicipioConsolidado({ sred: m.id, variable: variable, gestion: gestion, mes1: mes1, mes2: mes2 })
                    dataForm[1].forEach(i => {
                        dataForm[0].forEach(v => {
                            if (parseInt(i.input) === parseInt(v.idinput)) {
                                i.valor = v.valor
                            }
                        })
                        i.idest = m.id
                        i.est = m.nombre
                        data_.push(i)
                    })
                    cd++
                    if (cd === resultado.length) {
                        // console.log(cabecera)
                        return res.json({ ok: true, conf: data__, data: data_, cabecera: cabecera })
                    }
                })
            }
        })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})








////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// REPORTES DINAMICO
// NIVEL FORMULARIO: ESTABLECIMIENTO



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
                const cabecera = await reportes3.listarCabeceras({ variable: f })
                const ind = await reportes3.listarIndicadores({ variable: f })
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
                        const dataForm = await reportes3.listarDatosTodosVariableEstablecimiento({ variable: f, est: est, gestion: gestion, mes1: mes1, mes2: mes2 })
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
            const cabecera = await reportes3.listarCabeceras({ variable: variable })
            const ind = await reportes3.listarIndicadores({ variable: variable })
            let data_ = []
            let cd = 0
            lista.forEach(async f => {
                const dataForm = await reportes3.listarDatosVariableElegidoEstablecimiento({ indicador: f, est: est, gestion: gestion, mes1: mes1, mes2: mes2 })
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

// por municipio
rutas.post("/reportes-formularios-enteros-est-nivel-4", async (req, res) => {
    try {
        const { lista, est, gestion, mes1, mes2 } = req.body
        if (lista.length > 0) {

            let cf = 0
            let dataCabeceras = []
            let dataInd_ = []
            let data_ = []

            lista.forEach(async f => {
                const cabecera = await reportes3.listarCabeceras({ variable: f })
                const ind = await reportes3.listarIndicadores({ variable: f })
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
                        const dataForm = await reportes3.listarDatosTodosVariableEstablecimiento_nivel_4({ variable: f, est: est, gestion: gestion, mes1: mes1, mes2: mes2 })
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

rutas.post("/reportes-formularios-dividido-est-nivel-4", async (req, res) => {
    try {
        const { lista, est, variable, gestion, mes1, mes2 } = req.body
        if (lista.length > 0) {
            const cabecera = await reportes3.listarCabeceras({ variable: variable })
            const ind = await reportes3.listarIndicadores({ variable: variable })
            let data_ = []
            let cd = 0
            lista.forEach(async f => {
                const dataForm = await reportes3.listarDatosVariableElegidoEstablecimiento_nivel_4({ indicador: f, est: est, gestion: gestion, mes1: mes1, mes2: mes2 })
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

// por red CONSOLIDADO
rutas.post("/reportes-formularios-enteros-est-consolidado", async (req, res) => {
    try {
        const { lista, gestion, mes1, mes2 } = req.body
        if (lista.length > 0) {

            let cf = 0
            let dataCabeceras = []
            let dataInd_ = []
            let data_ = []

            lista.forEach(async f => {
                const cabecera = await reportes3.listarCabeceras({ variable: f })
                const ind = await reportes3.listarIndicadores({ variable: f })
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
                        const dataForm = await reportes3.listarDatosTodosVariableEstablecimiento_nivel_3({ variable: f, est: req.body.sred, gestion: gestion, mes1: mes1, mes2: mes2 })
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

rutas.post("/reportes-formularios-dividido-est-consolidado", async (req, res) => {
    try {
        const { lista, est, variable, gestion, mes1, mes2 } = req.body
        if (lista.length > 0) {
            const cabecera = await reportes3.listarCabeceras({ variable: variable })
            const ind = await reportes3.listarIndicadores({ variable: variable })
            let data_ = []
            let cd = 0
            lista.forEach(async f => {
                const dataForm = await reportes3.listarDatosVariableElegidoEstablecimiento_nivel_3({ indicador: f, est: req.body.sred, gestion: gestion, mes1: mes1, mes2: mes2 })
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

/// FORMULARIOS DE MUNICIPIO

// por municipio
rutas.post("/reportes-formularios-enteros-mun-nivel-4", async (req, res) => {
    try {
        const { lista, est, gestion, mes1, mes2 } = req.body
        if (lista.length > 0) {

            let cf = 0
            let dataCabeceras = []
            let dataInd_ = []
            let data_ = []

            lista.forEach(async f => {
                const cabecera = await reportes3.listarCabeceras({ variable: f })
                const ind = await reportes3.listarIndicadores({ variable: f })
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
                        const dataForm = await reportes3.listarDatosTodosVariablemun_nivel_4({ variable: f, est: est, gestion: gestion, mes1: mes1, mes2: mes2 })
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

rutas.post("/reportes-formularios-dividido-mun-nivel-4", async (req, res) => {
    try {
        const { lista, est, variable, gestion, mes1, mes2 } = req.body
        if (lista.length > 0) {
            const cabecera = await reportes3.listarCabeceras({ variable: variable })
            const ind = await reportes3.listarIndicadores({ variable: variable })
            let data_ = []
            let cd = 0
            lista.forEach(async f => {
                const dataForm = await reportes3.listarDatosVariableElegidomun_nivel_4({ indicador: f, est: est, gestion: gestion, mes1: mes1, mes2: mes2 })
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

// por red consolidado
rutas.post("/reportes-formularios-enteros-mun-nivel-3", async (req, res) => {
    try {
        const { lista, gestion, mes1, mes2 } = req.body
        console.log(req.body, 'llamada del cliente')
        if (lista.length > 0) {

            let cf = 0
            let dataCabeceras = []
            let dataInd_ = []
            let data_ = []

            lista.forEach(async f => {
                const cabecera = await reportes3.listarCabeceras({ variable: f })
                const ind = await reportes3.listarIndicadores({ variable: f })
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
                        const dataForm = await reportes3.listarDatosTodosVariablemun_nivel_3({ variable: f, est: req.body.sred, gestion: gestion, mes1: mes1, mes2: mes2 })
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

rutas.post("/reportes-formularios-dividido-mun-nivel-3", async (req, res) => {
    try {
        const { lista, variable, gestion, mes1, mes2 } = req.body
        if (lista.length > 0) {
            const cabecera = await reportes3.listarCabeceras({ variable: variable })
            const ind = await reportes3.listarIndicadores({ variable: variable })
            let data_ = []
            let cd = 0
            lista.forEach(async f => {
                const dataForm = await reportes3.listarDatosVariableElegidomun_nivel_3({ indicador: f, est: req.body.sred, gestion: gestion, mes1: mes1, mes2: mes2 })
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


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MIS VARAIBLES NIVEL RED
// por red
rutas.post("/reportes-formularios-enteros-red", async (req, res) => {
    try {
        const { lista,  gestion, mes1, mes2 } = req.body
        console.log(req.body, 'llamada del cliente')
        if (lista.length > 0) {

            let cf = 0
            let dataCabeceras = []
            let dataInd_ = []
            let data_ = []

            lista.forEach(async f => {
                const cabecera = await reportes3.listarCabeceras({ variable: f })
                const ind = await reportes3.listarIndicadores({ variable: f })
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
                        const dataForm = await reportes3.listarDatosTodosVariablered_nivel_3({ variable: f, est: req.body.sred, gestion: gestion, mes1: mes1, mes2: mes2 })
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

rutas.post("/reportes-formularios-dividido-red", async (req, res) => {
    try {
        const { lista, variable, gestion, mes1, mes2 } = req.body
        if (lista.length > 0) {
            const cabecera = await reportes3.listarCabeceras({ variable: variable })
            const ind = await reportes3.listarIndicadores({ variable: variable })
            let data_ = []
            let cd = 0
            lista.forEach(async f => {
                const dataForm = await reportes3.listarDatosVariableElegidored_nivel_3({ indicador: f, est: req.body.sred, gestion: gestion, mes1: mes1, mes2: mes2 })
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