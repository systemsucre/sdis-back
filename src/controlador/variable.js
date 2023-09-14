import { Router } from "express"
import { Variable } from "../modelo/variable.js"
import { insertar, editar, gestion, buscar, id, insertarFila, editarFila, eliminarFila, insertarInput, editarInput, eliminarInput, insertarOtroInput, añadirInput, } from '../validacion/variable.js'


const rutas = Router()
const variable = new Variable()


rutas.post("/listarinicio", gestion, async (req, res) => {
    console.log(req.body)
    const { gestion, rol_ } = req.body
    const datos = { gestion, rol: rol_ }
    try {
        const resultado = await variable.listarInicio(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})
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
                return res.json({ ok: false, msg: 'Este grupo ya esta registrado en la gestion y rol seleccionado' })
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
                return res.json({ ok: false, msg: 'Esta variable ya esta registrado en la gestion y rol seleccionado' })

            if (j.existe === 4)
                return res.json({ ok: false, msg: 'Este numero ya esta registrado en otra variable de la misma gestion y rol' })
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
            return res.json({ data: j, ok: true, msg: 'operacion exitosa' })
        })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }

})


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

    const { variable1, indicador, creado, usuario } = req.body
    const datos = {
        variable: variable1,
        indicador,
        creado,
        usuario
    }
    try {

        await variable.insertarIndicador(datos).then(j => {
            if (j.existe === 1)
                return res.json({ ok: false, msg: 'Esta varaible ya esta registrado en este grupo' })
            return res.json({ data: j, ok: true, msg: 'Operacion exitosa' })
        })
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/actualizarindicador", editarFila, async (req, res) => {
    // console.log(req.body)

    const { id, variable1, indicador, modificado, usuario } = req.body
    const datos = {
        id,
        variable: variable1,
        indicador,
        modificado,
        usuario
    }
    try {
        await variable.actualizarIndicador(datos).then(j => {
            if (j.existe === 1)
                return res.json({ ok: false, msg: 'Esta variable ya esta registrado en este grupo' })

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
                return res.json({ ok: false, msg: 'No se ha encontrado la indicador seleccionada' })
            }
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
        const { input, variable_, creado, usuario } = req.body
        const datos = {
            input,
            nivel: 1,
            variable: variable_,
            creado,
            usuario
        }
        if (req.body.listaInd.length > 0) {
            await variable.insertarInput(datos, req.body.listaInd).then(j => {
                if (j.existe === 1)
                    return res.json({ ok: false, msg: 'La Cabecera ya esta registrado' })

                return res.json({ data: j, ok: true, msg: 'Operacion exitosa' })
            })
        } else return res.json({ ok: false, msg: 'No existe indicadores' })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})

rutas.post("/anadirnuevosinput", añadirInput, async (req, res) => {
    // console.log(req.body)
    try {
        const { indicador, variable_, creado, usuario } = req.body
        const datos = {
            indicador,
            variable: variable_,
            creado,
            usuario
        }
        if (req.body.lista.length > 0) {
            await variable.añadirOtroInput(datos, req.body.lista).then(j => {

                return res.json({ ok: true, msg: 'Operacion exitosa' })
            })
        } else return res.json({ ok: false, msg: 'No existe indicadores' })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


rutas.post("/actualizarinput", editarInput, async (req, res) => {
    // console.log(req.body)
    try {
        const { id, idinput, codigo, input, modificado, usuario } = req.body
        const datos = {
            id,
            idinput,
            input,
            codigo,
            modificado,
            usuario
        }
        await variable.actualizarInput(datos).then(j => {
            if (j.existe === 1)
                return res.json({ ok: false, msg: 'La Cabecera ya esta registrado' })
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
        await variable.eliminarInput({ modificado: req.body.modificado, cod: req.body.codigo, usuario: req.body.usuario }).then(j => {

            if (j.ok)
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

    const { codigo, nivel, orden, idinput, input, variable_, creado, usuario } = req.body
    const datos = {
        codigo,
        orden,
        input,
        idinput,
        nivel,
        variable: variable_,
        creado,
        usuario
    }
    try {

        await variable.insertarOtroInput(datos).then(j => {
            if (j.existe === 1)
                return res.json({ ok: false, msg: 'Faltan argumentos de la variable' })
            if (j.existe === 2)
                return res.json({ ok: false, msg: 'La Cabecera ya esta registrado' })

            if (j.ok)
                return res.json({ data: j, ok: true, msg: 'Operacion exitosa' })
        })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el servidor', ok: false })
    }
})


export default rutas;