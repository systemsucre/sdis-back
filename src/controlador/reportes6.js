import { Router } from "express"
import { Reportes6 } from "../modelo/reportes6.js"
import { id, } from '../validacion/formulario/formulario5.js'


const rutas = Router()
const reportes6 = new Reportes6()



rutas.post("/listargestion", async (req, res) => {
    try {
        const resultado = await reportes6.listarGestion(req.body.smun)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})
rutas.post("/listarmes", id, async (req, res) => {

    try {
        const resultado = await reportes6.listarMes(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})



// VARAIBLES DE TIPO establecimiento

rutas.post("/listar-todos-los-formulario-est", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await reportes6.listarTodosFormularioEst(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listar-variable-especifico-est", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await reportes6.listarFormularioEst(req.body.id, req.body.ssector)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


// VARAIBLES DE TIPO AREA

rutas.post("/listar-todas-las-variables-area", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await reportes6.listarTodosFormularioArea(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listar-varaible-especifico-area", id, async (req, res) => {
    // console.log(req.body, 'lista de variables despues de la primera')
    try {
        const resultado = await reportes6.listarFormularioArea(req.body.id, req.body.ssector)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})
rutas.post("/listarCabeceras-mi-formulario", async (req, res) => {
    try {
        const { variable } = req.body
        const datos = { variable: variable }
        const resultado = await reportes6.listarCabeceras(datos)
        // console.log(resultado)

        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listarCabeceras", async (req, res) => {
    try {
        const { svar } = req.body
        const datos = { variable: svar }
        const resultado = await reportes6.listarCabeceras(datos)
        // console.log(resultado)

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
        const resultado = await reportes6.listarIndicadores(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


rutas.post("/maxorden", async (req, res) => {
    try {
        const resultado = await reportes6.maxordengen(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})





rutas.post("/listarhospitales", async (req, res) => {
    try {
        const resultado = await reportes6.listarHospitales()
        // console.log(resultado)

        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})
rutas.post("/listarmunicipio", async (req, res) => {
    try {
        const resultado = await reportes6.listarMunicipio()
        // console.log(resultado)

        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})
rutas.post("/listarred", async (req, res) => {
    try {
        const resultado = await reportes6.listarRed()
        // console.log(resultado)

        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})




//REPORTES


//variables del município
rutas.post("/listar-datos-de-formularios-completos", async (req, res) => {
    try {
        const { variable, gestion, mes1, mes2 } = req.body
        const datos = { variable, gestion, mes1, mes2 }
        const resultado = await reportes6.listarDatosFormularioCompletoArea(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/listar-datos-con-varaibles-especificos", async (req, res) => {
    try {
        const { indicador, gestion, mes1, mes2 } = req.body
        const datos = { indicador, gestion, mes1, mes2 }
        const resultado = await reportes6.listarDatosVariableElegidoArea(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})





rutas.post("/procesar-red-consolidado", async (req, res) => {
    try {
        let data__ = []
        let data_ = []
        let contador_color = 2

        const { gestion, mes1, mes2 } = req.body
        const cabecera = await reportes6.listarCabeceras({ variable: req.body.svar })
        const resultado = await reportes6.listarRedUnico(req.body.red)
        let indicador = await reportes6.listarIndicadores({ variable: req.body.svar })
        let contadorMunicipio = 0

        resultado.forEach(async m => {
            let rango = 1
            if ((contador_color % 2) == 0)
                indicador.forEach(i => {
                    data__.push({ color: 0, est: rango == 1 ? m.nombre : null, id: i.id, idest: m.id, indicador: i.indicador, variable: i.variable })
                    rango = 0
                })
            else
                indicador.forEach(i => {
                    data__.push({ color: 1, est: rango == 1 ? m.nombre : null, id: i.id, idest: m.id, indicador: i.indicador, variable: i.variable })
                    rango = 0
                })

            contador_color++
            contadorMunicipio++
            if (contadorMunicipio == resultado.length) {
                let cd = 0
                resultado.forEach(async m => {
                    const dataForm = await reportes6.listarDatosFormularioPorRedConsolidado({ red: m.id, variable: req.body.svar, gestion: gestion, mes1: mes1, mes2: mes2 })
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


rutas.post("/procesar-por-redes", async (req, res) => {
    try {
        let data__ = []
        let data_ = []
        let contador_color = 2

        const { gestion, mes1, mes2 } = req.body
        const cabecera = await reportes6.listarCabeceras({ variable: req.body.svar })
        const resultado = await reportes6.listarRed()
        if (resultado.length == 0) {
            return res.json({ ok: false, msg: 'Red sin redes' })
        }
        let indicador = await reportes6.listarIndicadores({ variable: req.body.svar })
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
                    const dataForm = await reportes6.listarDatosFormularioPorRedes({ red: m.id, variable: req.body.svar, gestion: gestion, mes1: mes1, mes2: mes2 })
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



rutas.post("/procesar-red", async (req, res) => {
    try {
        let data__ = []
        let data_ = []
        let contador_color = 2

        const { gestion, mes1, mes2 } = req.body
        const cabecera = await reportes6.listarCabeceras({ variable: req.body.svar })
        const resultado = await reportes6.listarMunicipioRed(req.body.red)
        if (resultado.length == 0) {
            return res.json({ ok: false, msg: 'Red sin municipios' })
        }
        let indicador = await reportes6.listarIndicadores({ variable: req.body.svar })
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
                    const dataForm = await reportes6.listarDatosFormularioPorMunicipio({ mun: m.id, variable: req.body.svar, gestion: gestion, mes1: mes1, mes2: mes2 })
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



rutas.post("/procesar-municipio", async (req, res) => {
    try {
        let data__ = []
        let data_ = []
        let contador_color = 2

        const { gestion, mes1, mes2 } = req.body
        const cabecera = await reportes6.listarCabeceras({ variable: req.body.svar })
        const resultado = await reportes6.listarHospitalesMunicipio(req.body.mun)

        if (resultado.length == 0) {
            return res.json({ ok: false, msg: 'Municipio sin establecimientos' })
        }
        let indicador = await reportes6.listarIndicadores({ variable: req.body.svar })
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
                    const dataForm = await reportes6.listarDatosFormularioPorEstablecimiento({ est: m.id, variable: req.body.svar, gestion: gestion, mes1: mes1, mes2: mes2 })
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



rutas.post("/procesar-municipio-consolidado", async (req, res) => {
    try {
        let data__ = []
        let data_ = []
        let contador_color = 2

        const { gestion, mes1, mes2 } = req.body
        const cabecera = await reportes6.listarCabeceras({ variable: req.body.svar })
        const resultado = await reportes6.listarMunicipioUnico(req.body.mun)
        let indicador = await reportes6.listarIndicadores({ variable: req.body.svar })
        let contadorMunicipio = 0

        resultado.forEach(async m => {
            let rango = 1
            if ((contador_color % 2) == 0)
                indicador.forEach(i => {
                    data__.push({ color: 0, est: rango == 1 ? m.nombre : null, id: i.id, idest: m.id, indicador: i.indicador, variable: i.variable })
                    rango = 0
                })
            else
                indicador.forEach(i => {
                    data__.push({ color: 1, est: rango == 1 ? m.nombre : null, id: i.id, idest: m.id, indicador: i.indicador, variable: i.variable })
                    rango = 0
                })

            contador_color++
            contadorMunicipio++
            if (contadorMunicipio == resultado.length) {
                let cd = 0
                resultado.forEach(async m => {
                    const dataForm = await reportes6.listarDatosFormularioPorMunicipioConsolidado({ mun: m.id, variable: req.body.svar, gestion: gestion, mes1: mes1, mes2: mes2 })
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






rutas.post("/procesar-establecimiento", async (req, res) => {
    try {
        let data__ = []
        let data_ = []
        let contador_color = 2

        const { gestion, mes1, mes2 } = req.body
        const cabecera = await reportes6.listarCabeceras({ variable: req.body.svar })
        const resultado = await reportes6.listarHospitalUnico(req.body.est)

        if (resultado.length == 0) {
            return res.json({ ok: false, msg: 'no se encontro hospital' })
        }
        let indicador = await reportes6.listarIndicadores({ variable: req.body.svar })
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
                    const dataForm = await reportes6.listarDatosFormularioPorEstablecimiento({ est: m.id, variable: req.body.svar, gestion: gestion, mes1: mes1, mes2: mes2 })
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

rutas.post("/procesar-consolidado", async (req, res) => {
    try {
        let data__ = []
        let data_ = []
        let contador_color = 2

        const { gestion, mes1, mes2 } = req.body
        const cabecera = await reportes6.listarCabeceras({ variable: req.body.svar })
        // const resultado = await reportes6.listarHospitalUnico(req.body.est)}

        const sedes = [{ id: 1, nombre: 'DEPTO. CHUQUISACA' }]

        let indicador = await reportes6.listarIndicadores({ variable: req.body.svar })
        let contadorMunicipio = 0

        sedes.forEach(async m => {
            let rango = 1
            if ((contador_color % 2) == 0)
                indicador.forEach(i => {
                    data__.push({ color: 0, est: rango == 1 ? m.nombre : null, id: i.id, idest: m.id, indicador: i.indicador, variable: i.variable })
                    rango = 0
                })
            else
                indicador.forEach(i => {
                    data__.push({ color: 1, est: rango == 1 ? m.nombre : null, id: i.id, idest: m.id, indicador: i.indicador, variable: i.variable })
                    rango = 0
                })

            contador_color++
            contadorMunicipio++
            if (contadorMunicipio == sedes.length) {
                let cd = 0
                sedes.forEach(async m => {
                    const dataForm = await reportes6.listarDatosFormularioConsolidado({ variable: req.body.svar, gestion: gestion, mes1: mes1, mes2: mes2 })
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
                    if (cd === sedes.length) {
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





export default rutas;