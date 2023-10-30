import { Router } from "express"
import { Reportes2 } from "../modelo/reportes2.js"
import { id, } from '../validacion/formulario/formulario5.js'


const rutas = Router()
const reportes2 = new Reportes2()



rutas.post("/listargestion", async (req, res) => {
    try {
        const resultado = await reportes2.listarGestion(req.body.sred)
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
        const resultado = await reportes2.listarHospitales(datos)
        // console.log(resultado)

        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})




rutas.post("/listarmes", id, async (req, res) => {

    try {
        const resultado = await reportes2.listarMes(req.body.id)
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
        const resultado = await reportes2.listarIndicadores(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})
rutas.post("/maxorden", async (req, res) => {
    try {
        const resultado = await reportes2.maxordengen(req.body.id)
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
        const resultado = await reportes2.listarCabeceras(datos)
        // console.log(resultado)

        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})



//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
// LISTAR VARAIBLES SEDES, RED, MUN, EST



// variables de nivel 3: red
rutas.post("/listartodosvariable-area", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await reportes2.listarTodosVariableArea(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listarvariable-area", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await reportes2.listarVariableArea(req.body.id, req.body.ssector)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

// variables de nivel 3: red
rutas.post("/listartodosvariable-red", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await reportes2.listarTodosVariableRed(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listarvariable-red", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await reportes2.listarVariableRed(req.body.id, req.body.ssector)
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
        const resultado = await reportes2.listarTodosVariablemun(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listarvariable-mun", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await reportes2.listarVariablemun(req.body.id, req.body.ssector)
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
        const resultado = await reportes2.listarTodosVariable(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listarvariable", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await reportes2.listarVariable(req.body.id, req.body.ssector)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

















//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

//REPORTES

// consolidado
rutas.post("/reportes-formularios-enteros-sedes", async (req, res) => {
    try {
        const { lista,  gestion, mes1, mes2 } = req.body
        if (lista.length > 0) {

            let cf = 0
            let dataCabeceras = []
            let dataInd_ = []
            let data_ = []

            lista.forEach(async f => {
                const cabecera = await reportes2.listarCabeceras({ variable: f })
                const ind = await reportes2.listarIndicadores({ variable: f })
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
                        const dataForm = await reportes2.listarDatosTodosVariableS({ variable: f, gestion: gestion, mes1: mes1, mes2: mes2 })
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

rutas.post("/reportes-formularios-dividido-sedes", async (req, res) => {
    try {
        const { lista, variable, gestion, mes1, mes2 } = req.body
        if (lista.length > 0) {
            const cabecera = await reportes2.listarCabeceras({ variable: variable })
            const ind = await reportes2.listarIndicadores({ variable: variable })
            let data_ = []
            let cd = 0
            lista.forEach(async f => {
                const dataForm = await reportes2.listarDatosVariableElegidoS({ indicador: f, gestion: gestion, mes1: mes1, mes2: mes2 })
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



// REPORTES POR FORMULARIO



rutas.post("/procesar-por-establecimiento", async (req, res) => {   
    try {
        let data__ = []
        let data_ = []
        let contador_color = 2

        const { variable, gestion, mes1, mes2 } = req.body
        const cabecera = await reportes2.listarCabeceras({ variable: variable })    
        const resultado = await reportes2.listarTodosHospital() 
        // console.log('estab', resultado)

        if (resultado.length == 0) {
            return res.json({ ok: false, msg: 'no se encontro hospital' })
        }
        let indicador = await reportes2.listarIndicadores({ variable: variable }) 
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
                    const dataForm = await reportes2.listarDatosFormularioPorEstablecimiento({ est: m.id, variable: variable, gestion: gestion, mes1: mes1, mes2: mes2 })
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


rutas.post("/procesar-por-municipio", async (req, res) => {
    try {
        let data__ = []
        let data_ = []
        let contador_color = 2

        const { variable, gestion, mes1, mes2 } = req.body
        const cabecera = await reportes2.listarCabeceras({ variable: variable })
        const resultado = await reportes2.listarTodosMunicipios()
        console.log('muni', resultado)

        if (resultado.length == 0) {
            return res.json({ ok: false, msg: 'no se encontro hospital' })
        }
        let indicador = await reportes2.listarIndicadores({ variable: variable })
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
                    const dataForm = await reportes2.listarDatosFormularioPorMunicipio({ mun: m.id, variable: variable, gestion: gestion, mes1: mes1, mes2: mes2 })
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

rutas.post("/procesar-por-red", async (req, res) => {
    try {
        let data__ = []
        let data_ = []
        let contador_color = 2

        const { variable, gestion, mes1, mes2 } = req.body
        const cabecera = await reportes2.listarCabeceras({ variable: variable })
        const resultado = await reportes2.listarTodosRedes()
        console.log('muni', resultado)

        if (resultado.length == 0) {
            return res.json({ ok: false, msg: 'no se encontro hospital' })
        }
        let indicador = await reportes2.listarIndicadores({ variable: variable })
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
                    const dataForm = await reportes2.listarDatosFormularioPorRed({ red: m.id, variable: variable, gestion: gestion, mes1: mes1, mes2: mes2 })
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

rutas.post("/procesar-est-consolidado", async (req, res) => {
    try {
        let data__ = []
        let data_ = []
        let contador_color = 2

        const { variable, gestion, mes1, mes2 } = req.body
        const cabecera = await reportes2.listarCabeceras({ variable: variable })
        const resultado = [{ id: 12220729, nombre: 'CHUQUISACA' }]
        console.log('muni', resultado)

        if (resultado.length == 0) {
            return res.json({ ok: false, msg: 'no se encontro hospital' })
        }
        let indicador = await reportes2.listarIndicadores({ variable: variable })
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
                    const dataForm = await reportes2.listarDatosFormularioEstConsolidado({ red: m.id, variable: variable, gestion: gestion, mes1: mes1, mes2: mes2 })
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


// DAOTS DE LAS VARIABLES DE MUNICIPIO

//municipio
rutas.post("/procesar-por-variable-municipio-municipio", async (req, res) => {
    try {
        let data__ = []
        let data_ = []
        let contador_color = 2

        const { variable, gestion, mes1, mes2 } = req.body
        const cabecera = await reportes2.listarCabeceras({ variable: variable })
        const resultado = await reportes2.listarTodosRedes()
        // console.log('muni', resultado)

        if (resultado.length == 0) {
            return res.json({ ok: false, msg: 'no se encontro hospital' })
        }
        let indicador = await reportes2.listarIndicadores({ variable: variable })
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
                    const dataForm = await reportes2.listarDatosFormularioMunicipioporMunicipio({ mun: m.id, variable: variable, gestion: gestion, mes1: mes1, mes2: mes2 })
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

// red
rutas.post("/procesar-por-variable-municipio-red", async (req, res) => {
    try {
        let data__ = []
        let data_ = []
        let contador_color = 2

        const { variable, gestion, mes1, mes2 } = req.body
        const cabecera = await reportes2.listarCabeceras({ variable: variable })
        const resultado = await reportes2.listarTodosRedes()
        console.log('muni', resultado)

        if (resultado.length == 0) {
            return res.json({ ok: false, msg: 'no se encontro hospital' })
        }
        let indicador = await reportes2.listarIndicadores({ variable: variable })
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
                    const dataForm = await reportes2.listarDatosFormularioMunicipioporRed({ red: m.id, variable: variable, gestion: gestion, mes1: mes1, mes2: mes2 })
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

// consolidado
rutas.post("/procesar-por-variable-municipio-consolidado", async (req, res) => {
    try {
        let data__ = []
        let data_ = []
        let contador_color = 2

        const { variable, gestion, mes1, mes2 } = req.body
        const cabecera = await reportes2.listarCabeceras({ variable: variable })
        const resultado = [{ id: 12220729, nombre: 'CHUQUISACA' }]
        console.log('muni', resultado)

        if (resultado.length == 0) {
            return res.json({ ok: false, msg: 'no se encontro hospital' })
        }
        let indicador = await reportes2.listarIndicadores({ variable: variable })
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
                    const dataForm = await reportes2.listarDatosFormularioMunicipioporConsolidado({ variable: variable, gestion: gestion, mes1: mes1, mes2: mes2 })
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


// VARAIBLES DE REDES
// red
rutas.post("/procesar-por-variable-red-red", async (req, res) => {
    try {
        let data__ = []
        let data_ = []
        let contador_color = 2

        const { variable, gestion, mes1, mes2 } = req.body
        const cabecera = await reportes2.listarCabeceras({ variable: variable })
        const resultado = await reportes2.listarTodosRedes()
        console.log('muni', resultado)

        if (resultado.length == 0) {
            return res.json({ ok: false, msg: 'no se encontro hospital' })
        }
        let indicador = await reportes2.listarIndicadores({ variable: variable })
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
                    const dataForm = await reportes2.listarDatosFormularioRedporRed({ red: m.id, variable: variable, gestion: gestion, mes1: mes1, mes2: mes2 })
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
// consolidado
rutas.post("/procesar-por-variable-red-consolidado", async (req, res) => {
    try {
        let data__ = []
        let data_ = []
        let contador_color = 2

        const { variable, gestion, mes1, mes2 } = req.body
        const cabecera = await reportes2.listarCabeceras({ variable: variable })
        const resultado = [{ id: 12220729, nombre: 'CHUQUISACA' }]
        console.log('muni', resultado)

        if (resultado.length == 0) {
            return res.json({ ok: false, msg: 'no se encontro hospital' })
        }
        let indicador = await reportes2.listarIndicadores({ variable: variable })
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
                    const dataForm = await reportes2.listarDatosFormularioRedesConsolidado({ variable: variable, gestion: gestion, mes1: mes1, mes2: mes2 })
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












////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// REPORTES  DINAMICOS


rutas.post("/entidad-formulario-est", async (req, res) => {
    try {
        const redes = await reportes2.listarTodosRedesDinamico()
        const municipios = await reportes2.listarTodosMunicipiosDinamicos()
        const hospitales = await reportes2.listarTodosHospitalDinamico()
        if (hospitales.length == 0) return res.json({ msg: 'no hay hospitales', ok: false })

        let data = [{ id: 1000, nombre: 'CONSOLIDADO', numero: 1000 }]
        for (let r of redes) {
            data.push(r)
        }
        for (let m of municipios) {
            data.push(m)
        }
        for (let h of hospitales) {
            data.push(h)
        }
        return res.json({ data: data, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})
rutas.post("/entidad-formulario-municipio", async (req, res) => {
    try {
        const redes = await reportes2.listarTodosRedesDinamico()
        const municipios = await reportes2.listarTodosMunicipiosDinamicos()
        if (municipios.length == 0) return res.json({ msg: 'no hay Municipios', ok: false })

        let data = [{ id: 1000, nombre: 'CONSOLIDADO', numero: 1000 }]
        for (let r of redes) {
            data.push(r)
        }
        for (let m of municipios) {
            data.push(m)
        }
        return res.json({ data: data, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})
rutas.post("/entidad-formulario-red", async (req, res) => {
    try {
        const redes = await reportes2.listarTodosRedesDinamico()
        if (redes.length == 0) return res.json({ msg: 'no hay Redes', ok: false })

        let data = [{ id: 1000, nombre: 'CONSOLIDADO', numero: 1000 }]
        for (let r of redes) {
            data.push(r)
        }
        return res.json({ data: data, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})




//PARA REPORTES DINAMICPOS

// POR ESTABLECIMIENTO
// por establecimiento
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
                const cabecera = await reportes2.listarCabeceras({ variable: f })
                const ind = await reportes2.listarIndicadores({ variable: f })
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
                        const dataForm = await reportes2.listarDatosTodosVariableEstablecimiento({ variable: f, est: est, gestion: gestion, mes1: mes1, mes2: mes2 })
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
            const cabecera = await reportes2.listarCabeceras({ variable: variable })
            const ind = await reportes2.listarIndicadores({ variable: variable })
            let data_ = []
            let cd = 0
            lista.forEach(async f => {
                const dataForm = await reportes2.listarDatosVariableElegidoEstablecimiento({ indicador: f, est: est, gestion: gestion, mes1: mes1, mes2: mes2 })
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
                const cabecera = await reportes2.listarCabeceras({ variable: f })
                const ind = await reportes2.listarIndicadores({ variable: f })
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
                        const dataForm = await reportes2.listarDatosTodosVariableEstablecimiento_nivel_4({ variable: f, est: est, gestion: gestion, mes1: mes1, mes2: mes2 })
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
            const cabecera = await reportes2.listarCabeceras({ variable: variable })
            const ind = await reportes2.listarIndicadores({ variable: variable })
            let data_ = []
            let cd = 0
            lista.forEach(async f => {
                const dataForm = await reportes2.listarDatosVariableElegidoEstablecimiento_nivel_4({ indicador: f, est: est, gestion: gestion, mes1: mes1, mes2: mes2 })
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

// por red
rutas.post("/reportes-formularios-enteros-est-nivel-3", async (req, res) => {
    try {
        const { lista, est, gestion, mes1, mes2 } = req.body
        if (lista.length > 0) {

            let cf = 0
            let dataCabeceras = []
            let dataInd_ = []
            let data_ = []

            lista.forEach(async f => {
                const cabecera = await reportes2.listarCabeceras({ variable: f })
                const ind = await reportes2.listarIndicadores({ variable: f })
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
                        const dataForm = await reportes2.listarDatosTodosVariableEstablecimiento_nivel_3({ variable: f, est: est, gestion: gestion, mes1: mes1, mes2: mes2 })
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

rutas.post("/reportes-formularios-dividido-est-nivel-3", async (req, res) => {
    try {
        const { lista, est, variable, gestion, mes1, mes2 } = req.body
        if (lista.length > 0) {
            const cabecera = await reportes2.listarCabeceras({ variable: variable })
            const ind = await reportes2.listarIndicadores({ variable: variable })
            let data_ = []
            let cd = 0
            lista.forEach(async f => {
                const dataForm = await reportes2.listarDatosVariableElegidoEstablecimiento_nivel_3({ indicador: f, est: est, gestion: gestion, mes1: mes1, mes2: mes2 })
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

// consolidado
rutas.post("/reportes-formularios-enteros-est-consolidado", async (req, res) => {
    try {
        const { lista, est, gestion, mes1, mes2 } = req.body
        if (lista.length > 0) {

            let cf = 0
            let dataCabeceras = []
            let dataInd_ = []
            let data_ = []

            lista.forEach(async f => {
                const cabecera = await reportes2.listarCabeceras({ variable: f })
                const ind = await reportes2.listarIndicadores({ variable: f })
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
                        const dataForm = await reportes2.listarDatosTodosVariableEstablecimiento_consolidado({ variable: f, gestion: gestion, mes1: mes1, mes2: mes2 })
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
            const cabecera = await reportes2.listarCabeceras({ variable: variable })
            const ind = await reportes2.listarIndicadores({ variable: variable })
            let data_ = []
            let cd = 0
            lista.forEach(async f => {
                const dataForm = await reportes2.listarDatosVariableElegidoEstablecimiento_consolidado({ indicador: f, gestion: gestion, mes1: mes1, mes2: mes2 })
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
                const cabecera = await reportes2.listarCabeceras({ variable: f })
                const ind = await reportes2.listarIndicadores({ variable: f })
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
                        const dataForm = await reportes2.listarDatosTodosVariablemun_nivel_4({ variable: f, est: est, gestion: gestion, mes1: mes1, mes2: mes2 })
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
            const cabecera = await reportes2.listarCabeceras({ variable: variable })
            const ind = await reportes2.listarIndicadores({ variable: variable })
            let data_ = []
            let cd = 0
            lista.forEach(async f => {
                const dataForm = await reportes2.listarDatosVariableElegidomun_nivel_4({ indicador: f, est: est, gestion: gestion, mes1: mes1, mes2: mes2 })
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

// por red
rutas.post("/reportes-formularios-enteros-mun-nivel-3", async (req, res) => {
    try {
        const { lista, est, gestion, mes1, mes2 } = req.body
        console.log(req.body, 'llamada del cliente')
        if (lista.length > 0) {

            let cf = 0
            let dataCabeceras = []
            let dataInd_ = []
            let data_ = []

            lista.forEach(async f => {
                const cabecera = await reportes2.listarCabeceras({ variable: f })
                const ind = await reportes2.listarIndicadores({ variable: f })
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
                        const dataForm = await reportes2.listarDatosTodosVariablemun_nivel_3({ variable: f, est: est, gestion: gestion, mes1: mes1, mes2: mes2 })
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
        const { lista, est, variable, gestion, mes1, mes2 } = req.body
        if (lista.length > 0) {
            const cabecera = await reportes2.listarCabeceras({ variable: variable })
            const ind = await reportes2.listarIndicadores({ variable: variable })
            let data_ = []
            let cd = 0
            lista.forEach(async f => {
                const dataForm = await reportes2.listarDatosVariableElegidomun_nivel_3({ indicador: f, est: est, gestion: gestion, mes1: mes1, mes2: mes2 })
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

// consolidado
rutas.post("/reportes-formularios-enteros-mun-consolidado", async (req, res) => {
    try {
        const { lista, gestion, mes1, mes2 } = req.body
        if (lista.length > 0) {

            let cf = 0
            let dataCabeceras = []
            let dataInd_ = []
            let data_ = []

            lista.forEach(async f => {
                const cabecera = await reportes2.listarCabeceras({ variable: f })
                const ind = await reportes2.listarIndicadores({ variable: f })
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
                        const dataForm = await reportes2.listarDatosTodosVariablemun_consolidado({ variable: f, gestion: gestion, mes1: mes1, mes2: mes2 })
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

rutas.post("/reportes-formularios-dividido-mun-consolidado", async (req, res) => {
    try {
        const { lista, variable, gestion, mes1, mes2 } = req.body
        if (lista.length > 0) {
            const cabecera = await reportes2.listarCabeceras({ variable: variable })
            const ind = await reportes2.listarIndicadores({ variable: variable })
            let data_ = []
            let cd = 0
            lista.forEach(async f => {
                const dataForm = await reportes2.listarDatosVariableElegidomun_consolidado({ indicador: f, gestion: gestion, mes1: mes1, mes2: mes2 })
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

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
/// FORMULARIOS POR RED

// por red
rutas.post("/reportes-formularios-enteros-red-nivel-3", async (req, res) => {
    try {
        const { lista, est, gestion, mes1, mes2 } = req.body
        console.log(req.body, 'llamada del cliente')
        if (lista.length > 0) {

            let cf = 0
            let dataCabeceras = []
            let dataInd_ = []
            let data_ = []

            lista.forEach(async f => {
                const cabecera = await reportes2.listarCabeceras({ variable: f })
                const ind = await reportes2.listarIndicadores({ variable: f })
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
                        const dataForm = await reportes2.listarDatosTodosVariablered_nivel_3({ variable: f, est: est, gestion: gestion, mes1: mes1, mes2: mes2 })
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

rutas.post("/reportes-formularios-dividido-red-nivel-3", async (req, res) => {
    try {
        const { lista, est, variable, gestion, mes1, mes2 } = req.body
        if (lista.length > 0) {
            const cabecera = await reportes2.listarCabeceras({ variable: variable })
            const ind = await reportes2.listarIndicadores({ variable: variable })
            let data_ = []
            let cd = 0
            lista.forEach(async f => {
                const dataForm = await reportes2.listarDatosVariableElegidored_nivel_3({ indicador: f, est: est, gestion: gestion, mes1: mes1, mes2: mes2 })
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

// consolidado
rutas.post("/reportes-formularios-enteros-red-consolidado", async (req, res) => {
    try {
        const { lista, gestion, mes1, mes2 } = req.body
        if (lista.length > 0) {

            let cf = 0
            let dataCabeceras = []
            let dataInd_ = []
            let data_ = []

            lista.forEach(async f => {
                const cabecera = await reportes2.listarCabeceras({ variable: f })
                const ind = await reportes2.listarIndicadores({ variable: f })
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
                        const dataForm = await reportes2.listarDatosTodosVariablered_consolidado({ variable: f, gestion: gestion, mes1: mes1, mes2: mes2 })
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

rutas.post("/reportes-formularios-dividido-red-consolidado", async (req, res) => {
    try {
        const { lista, variable, gestion, mes1, mes2 } = req.body
        if (lista.length > 0) {
            const cabecera = await reportes2.listarCabeceras({ variable: variable })
            const ind = await reportes2.listarIndicadores({ variable: variable })
            let data_ = []
            let cd = 0
            lista.forEach(async f => {
                const dataForm = await reportes2.listarDatosVariableElegidored_consolidado({ indicador: f, gestion: gestion, mes1: mes1, mes2: mes2 })
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


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// FORMULARIO AREA

// consolidado
rutas.post("/reportes-formularios-enteros-area", async (req, res) => {
    try {
        const { lista, gestion, mes1, mes2 } = req.body
        if (lista.length > 0) {

            let cf = 0
            let dataCabeceras = []
            let dataInd_ = []
            let data_ = []

            lista.forEach(async f => {
                const cabecera = await reportes2.listarCabeceras({ variable: f })
                const ind = await reportes2.listarIndicadores({ variable: f })
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
                        const dataForm = await reportes2.listarDatosTodosVariablearea_consolidado({ variable: f, gestion: gestion, mes1: mes1, mes2: mes2 })
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

rutas.post("/reportes-formularios-dividido-area", async (req, res) => {
    try {
        const { lista, variable, gestion, mes1, mes2 } = req.body
        if (lista.length > 0) {
            const cabecera = await reportes2.listarCabeceras({ variable: variable })
            const ind = await reportes2.listarIndicadores({ variable: variable })
            let data_ = []
            let cd = 0
            lista.forEach(async f => {
                const dataForm = await reportes2.listarDatosVariableElegidoarea_consolidado({ indicador: f, gestion: gestion, mes1: mes1, mes2: mes2 })
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




















































































rutas.post("/listartodosvariableS", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await reportes2.listarTodosVariableS(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listarvariableS", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await reportes2.listarVariableS(req.body.id, req.body.ssector)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

// VARAIBLES RED
rutas.post("/listartodosvariableR", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await reportes2.listarTodosVariableR(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listarvariableR", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await reportes2.listarVariableR(req.body.id, req.body.ssector)
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
        const resultado = await reportes2.listarMunicipio(datos)
        let c = 1
        let data = []
        resultado.forEach(async e => {
            const h = await reportes2.listarHospitalesFormulario({ smun: e.id })
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





// consolidado red
rutas.post("/unavariableconsolidado-red", async (req, res) => {
    try {
        const { sred, variable, gestion, mes1, mes2 } = req.body
        const datos = { sred, variable, gestion, mes1, mes2 }
        const resultado = await reportes2.listarDatosTodosVariableConsolidadored(datos)
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
        const resultado = await reportes2.listarDatosVariableElegidoConsolidadored(datos)
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
        const resultado = await reportes2.listarDatosTodosVariableConsolidadomun(datos)
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
        const resultado = await reportes2.listarDatosVariableElegidoConsolidadomun(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})





// formularios de municipio

//variables del município
rutas.post("/unavariableM", async (req, res) => {
    try {
        const { mun, variable, gestion, mes1, mes2 } = req.body
        const datos = { mun, variable, gestion, mes1, mes2 }
        const resultado = await reportes2.listarDatosTodosVariableM(datos)
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
        const resultado = await reportes2.listarDatosVariableElegidoM(datos)
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
        const resultado = await reportes2.listarDatosFormularioPorHospital(datos)
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
        const resultado = await reportes2.listarDatosFormularioPorMunicipio(datos)
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
        const resultado = await reportes2.listarDatosFormularioConsolidado(datos)
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
        const resultado = await reportes2.listarDatosFormularioMunicipio(datos)
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
        const resultado = await reportes2.listarDatosFormularioMunicipioConsolidado(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})



































export default rutas;