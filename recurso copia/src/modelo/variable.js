
import pool from './bdConfig.js'

export class Variable {


    // METODOS


    listarGestion = async () => {
        const sql =
            `SELECT id, gestion as nombre FROM gestion where eliminado = false and estado = true ORDER BY id ASC`;
        const [rows] = await pool.query(sql)
        const sqlRol =
            `SELECT id, rol as nombre, nivel FROM rol where nivel > 1  ORDER BY nivel desc`;
        const [rowsRol] = await pool.query(sqlRol)
        // console.log(rowsRol)
        return [rows, rowsRol]
    }

    listar = async (datos) => {


        const sql =
            `SELECT v.id,v.variable,g.gestion,r.rol, v.estado, if(count(vl.id)>0, 1, 0) as eliminar from variable v
            inner join gestion g on g.id = v.gestion
            inner join rol r on r.id = v.rol
            left join valor vl on vl.variable = v.id
            where (g.id = ${pool.escape(datos.gestion)} or g.gestion = ${pool.escape(datos.gestion)}) and r.id = ${pool.escape(datos.rol)}
            GROUP by v.id
             ORDER BY v.id ASC`;
        // console.log(sql)
        const [rows] = await pool.query(sql)

        const sql_ =
            `SELECT count(v.id) as cantidad FROM variable v 
            inner join gestion g on g.id = v.gestion
            inner join rol r on r.id = v.rol
            where  (g.id = ${pool.escape(datos.gestion)} or g.gestion = ${pool.escape(datos.gestion)}) and r.id = ${pool.escape(datos.rol)}`;
        const [rows_] = await pool.query(sql_)
        return [rows, rows_[0].cantidad]
    }

    insertar = async (datos) => {
        const sqlRol =
            `SELECT id from rol
                where  id = ${pool.escape(datos.rol)}`;
        const [rowRol] = await pool.query(sqlRol)

        if (rowRol.length > 0) {
            datos.rol = rowRol[0].id
            const sqlAño =
                `SELECT id from gestion
                    where  (id = ${pool.escape(datos.gestion)} or gestion = ${pool.escape(datos.gestion)}) and eliminado = false`;
            const [rowAño] = await pool.query(sqlAño)
            if (rowAño.length > 0) {
                datos.gestion = rowAño[0].id
                const variable =
                    `SELECT * from variable  
                    where variable = ${pool.escape(datos.variable)} and gestion = ${pool.escape(datos.gestion)} 
                    and rol =${pool.escape(datos.rol)}`;
                const [rowsVar] = await pool.query(variable)
                if (rowsVar.length === 0) {

                    let num = 1
                    const sqlNum =
                        `SELECT max(num) as num from variable  
                            where  gestion = ${pool.escape(datos.gestion)} 
                            and rol =${pool.escape(datos.rol)}`;
                    const [rowNum] = await pool.query(sqlNum)
                    if (rowNum.length > 0)
                        num = rowNum[0].num + 1
                    datos.num = num
                    await pool.query("INSERT INTO variable SET  ?", datos)
                    return await this.listar({ gestion: rowAño[0].id, rol: rowRol[0].id })
                } else return { existe: 1 }
            } else return { existe: 2 }
        } else return { existe: 3 }
    }


    actualizar = async (datos) => {
        const variable =
            `SELECT * from variable v
                inner join gestion g on g.id = v.gestion
                where v.variable = ${pool.escape(datos.variable)} and g.gestion = ${pool.escape(datos.gestion)} 
                and v.id != ${pool.escape(datos.id)}
                and v.rol =${pool.escape(datos.rol)}`;

        const [rowsvar] = await pool.query(variable)
        if (rowsvar.length === 0) {

            const gestion =
                `SELECT id from gestion
                    where  (gestion = ${pool.escape(datos.gestion)} or  id = ${pool.escape(datos.gestion)}) and eliminado = false`;
            const [rowsaño] = await pool.query(gestion)
            const sql = `UPDATE variable SET
                                variable = ${pool.escape(datos.variable)},
                                modificado = ${pool.escape(datos.modificado)},
                                usuario = ${pool.escape(datos.usuario)}
                                WHERE id = ${pool.escape(datos.id)}`;
            await pool.query(sql);

            return await this.listar({ gestion: rowsaño[0].id, rol: datos.rol })
        } return { existe: 1 }
    }

    eliminar = async (datos) => {
        const variable =
            `SELECT * from valor 
                where variable =${pool.escape(datos.id)}`;

        const [rowsvalor] = await pool.query(variable)
        if (rowsvalor.length === 0) {
            const sqlInput = `delete from input
                WHERE variable = ${pool.escape(datos.id)}`;
            await pool.query(sqlInput);
            const sqlIndicador = `delete from indicador
                WHERE variable = ${pool.escape(datos.id)}`;
            await pool.query(sqlIndicador);

            const sql = `delete from variable
                WHERE id = ${pool.escape(datos.id)}`;
            await pool.query(sql);
            return await this.listar(datos)
        } return { existe: 1 }
    }



    detener = async (datos) => {
        const sql = `UPDATE variable SET
                estado = 0,
                modificado = ${pool.escape(datos.modificado)},
                usuario = ${pool.escape(datos.usuario)}
                WHERE id = ${pool.escape(datos.variable)}`;
        await pool.query(sql);

        const sqlDele = `delete from cabeceras
        WHERE variable = ${pool.escape(datos.variable)}`;
        await pool.query(sqlDele);

        return await this.listar(datos)
    }

    // suspender = async (datos) => {
    //     const sql = `UPDATE variable SET
    //             estado = 3,
    //             modificado = ${pool.escape(datos.modificado)},
    //             usuario = ${pool.escape(datos.usuario)}
    //             WHERE id = ${pool.escape(datos.variable)}`;
    //     await pool.query(sql);

    //     const sqlDele = `delete from cabeceras
    //     WHERE variable = ${pool.escape(datos.variable)}`;
    //     await pool.query(sqlDele);

    //     return await this.listar(datos)
    // }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////7
    /////////////////////////////////////////////////////////////////////////////////////////////////////////7
    /////////////////////////////////////////////////////////////////////////////////////////////////////////7
    ///////////////////////////////INDICADORES
    /////////////////////////////////////////////////////////////////////////////////////////////////////////7
    /////////////////////////////////////////////////////////////////////////////////////////////////////////7
    /////////////////////////////////////////////////////////////////////////////////////////////////////////7

    listarIndicador = async (variable) => {
        const sql =
            `SELECT f.id, v.variable,f.indicador, DATE_FORMAT(f.ini, '%Y-%m-%d') as ini, DATE_FORMAT(f.fin, '%Y-%m-%d') as fin, 
            if(count(vl.id)>0, 1, 0) as eliminar, f.estado
            from variable v
            inner join indicador f on v.id = f.variable
            left join valor vl on vl.indicador = f.id
            where  v.id = ${pool.escape(variable)}  GROUP by f.id ORDER BY f.id ASC`;
        const [rows] = await pool.query(sql)

        const sql_ =
            `SELECT count(v.id) as cantidad FROM variable v 
            inner join indicador f on v.id = f.variable
            where  v.id = ${pool.escape(variable)}`;
        const [rows_] = await pool.query(sql_)

        return [rows, rows_[0].cantidad]
    }



    insertarIndicador = async (datos) => {

        const indicador =
            `SELECT * from indicador f
                    inner join variable v on v.id = f.variable
                    where f.indicador = ${pool.escape(datos.indicador)} 
                    and v.id = ${pool.escape(datos.variable)}`;
        const [rowsfila] = await pool.query(indicador)
        if (rowsfila.length === 0) {
            let num = 1
            const numsql =
                `SELECT max(num) as num from indicador  
                 where variable = ${pool.escape(datos.variable)} `;
            const [rowNum] = await pool.query(numsql)
            console.log(rowNum)
            if (rowNum.length > 0) {
                num = rowNum[0].num + 1
            }
            datos.num = num
            const [resultado] = await pool.query("INSERT INTO indicador SET  ?", datos)
            const [datos_] = await this.listarIndicador(datos.variable)
            // console.log(resultado.insertId, 'id insertado')
            return [datos_, resultado.insertId]

        } else return { existe: 1 }
    }

    actualizarIndicador = async (datos) => {
        // console.log(datos)

        const indicador =
            `SELECT * from indicador f
                    inner join variable v on v.id = f.variable
                    where f.indicador = ${pool.escape(datos.indicador)}  and v.id = ${pool.escape(datos.variable)}
                    and f.id != ${pool.escape(datos.id)}`;
        const [rowsfila] = await pool.query(indicador)
        if (rowsfila.length === 0) {

            const sql = `UPDATE indicador SET
                    indicador = ${pool.escape(datos.indicador)},
                    ini = ${pool.escape(datos.ini)},
                    fin = ${pool.escape(datos.fin)},
                    modificado = ${pool.escape(datos.modificado)},
                    usuario = ${pool.escape(datos.usuario)}
                    WHERE id = ${pool.escape(datos.id)}`;
            await pool.query(sql);

            return await this.listarIndicador(datos.variable)

        } return { existe: 1 }
    }

    eliminarIndicador = async (datos) => {
        const indicador =
            `SELECT * from indicador i
                inner join valor v on i.id = v.indicador
                where v.indicador = ${pool.escape(datos.id)} `;
        const [rowsfila] = await pool.query(indicador)
        if (rowsfila.length === 0) {
            const sqlInput = `delete from input
                WHERE indicador = ${pool.escape(datos.id)}`;
            await pool.query(sqlInput);
            const sqlIndicador = `delete from indicador
                WHERE id = ${pool.escape(datos.id)}`;
            await pool.query(sqlIndicador);

            return await this.listarIndicador(datos.variable)
        } return { existe: 1 }
    }

    activarIndicador = async (datos) => {
        const sql = `UPDATE indicador SET
                            estado =1,
                            modificado = ${pool.escape(datos.modificado)},
                            usuario = ${pool.escape(datos.usuario)}
                            WHERE id = ${pool.escape(datos.id)}`;
        await pool.query(sql);

        return await this.listarIndicador(datos.variable)
    }


    desactivarIndicador = async (datos) => {
        const sql = `UPDATE indicador SET
                            estado =0,
                            modificado = ${pool.escape(datos.modificado)},
                            usuario = ${pool.escape(datos.usuario)}
                            WHERE id = ${pool.escape(datos.id)}`;
        await pool.query(sql);

        return await this.listarIndicador(datos.variable)
    }




    /////////////////////////////////////////////////////////////////////////////////////////////////////////7
    /////////////////////////////////////////////////////////////////////////////////////////////////////////7
    /////////////////////////////////////////////////////////////////////////////////////////////////////////7
    ///////////////////////////////INPUT
    /////////////////////////////////////////////////////////////////////////////////////////////////////////7
    /////////////////////////////////////////////////////////////////////////////////////////////////////////7

    /////////////////////////////////////////////////////////////////////////////////////////////////////////7


    listarInput = async (indicador) => {

        const sql =
            `SELECT i.id, i.input, i.idinput, i.nivel, i.tope, i.orden, i.cod, DATE_FORMAT(i.ini, '%Y-%m-%d') as ini, DATE_FORMAT(i.fin, '%Y-%m-%d') as fin, i.estado,
             i.ordengen, i.cod, if(count(vl.id)>0, 1, 0) as eliminar
            from input i
            inner join indicador ind on ind.id = i.indicador
            left join valor vl on vl.cod = i.cod
            where ind.id = ${pool.escape(indicador)} GROUP by i.id ORDER BY i.orden ASC`;
        const [rows] = await pool.query(sql)

        return rows
    }

    listarInput2 = async (input) => {
        const sqlDependiente =
            `SELECT i.id, i.input, i.idinput, i.nivel, i.tope, i.orden, i.cod, DATE_FORMAT(i.ini, '%Y-%m-%d') as ini, DATE_FORMAT(i.fin, '%Y-%m-%d') as fin, i.estado,
            i.ordengen, i.cod, if(count(vl.id)>0, 1, 0) as eliminar
                        from input i
                        inner join input ind on ind.id = i.idinput
                        left join valor vl on vl.cod = i.cod
                        where ind.id = ${pool.escape(input)} GROUP by i.id ORDER BY i.orden DESC`;
        const [arrayNivel2] = await pool.query(sqlDependiente)

        return arrayNivel2
    }


    insertarInput = async (datos, indicadores) => {
        const sqlExisteInput =
            `SELECT id from input i 
                where input = ${pool.escape(datos.input)} and indicador = ${pool.escape(indicadores[0])} 
                and nivel = ${datos.nivel}`;
        const [rowExisteInput] = await pool.query(sqlExisteInput)
        if (rowExisteInput.length === 0) {
            let codigo = 'C-' + datos.usuario + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds()
            let orden = 1
            const sqlOrden =
                `SELECT max(orden) as orden from input i 
                where  indicador = ${pool.escape(indicadores[0])} and nivel = 1`;

            const [rowOrden] = await pool.query(sqlOrden)

            if (rowOrden.length > 0) {
                orden = rowOrden[0].orden + 1
            }

            const sqlOrdengen =
                `SELECT max(ordengen) as ordengen from input i 
                where  indicador = ${pool.escape(indicadores[0])}`;

            const [rowOrdengen] = await pool.query(sqlOrdengen)
            let ordengen = 1
            if (rowOrdengen.length > 0) {
                ordengen = rowOrdengen[0].ordengen + 1
            }
            indicadores.forEach(async element => {

                datos.indicador_ = element
                datos.indicador = element
                console.log(datos)
                const datos_ = {
                    input: datos.input,
                    cod: codigo,
                    indicador: element,
                    indicador_: element,
                    orden: orden,
                    nivel: 1,
                    ini: datos.ini,
                    fin: datos.fin,
                    variable: datos.variable,
                    ordengen: ordengen,
                    creado: datos.creado,
                    usuario: datos.usuario
                }
                pool.query("INSERT INTO input SET  ?", datos_)

                // const sqlUEliminar = `delete from valor
                // where variable = ${pool.escape(datos.variable)} and gestion = ${pool.escape(datos.gestion)}`
                // await pool.query(sqlUEliminar)

                this.detener({ modificado: datos.creado, usuario: datos.usuario, variable: datos.variable })
            });

            return { ok: true }
        } else return { existe: 1 }
    }


    // nuevas cabeceras de la nueva variable que se añade automaticamente despues  que se crea la variable 

    añadirOtroInput = async (datos, inputs) => {

        [
            { id: 951, input: 'N° FAMILIAS PLANIFICADAS EN LA GESTION Y CARPETIZADAS', idinput: null, nivel: 1, tope: 0, orden: 1, cod: 'C-4131416283' },
            { id: 953, input: 'MASCULINO', idinput: 951, nivel: 2, tope: 0, orden: 1, cod: 'C-413144112' },
            { id: 1007, input: '1', idinput: 953, nivel: 3, tope: 1, orden: 1, cod: 'C-4143237855' },
            { id: 1008, input: '2', idinput: 953, nivel: 3, tope: 1, orden: 2, cod: 'C-4143243341' },
            { id: 954, input: 'FEMENINO', idinput: 951, nivel: 2, tope: 0, orden: 2, cod: 'C-4131449213' },
            { id: 1009, input: '1', idinput: 954, nivel: 3, tope: 1, orden: 1, cod: 'C-4143248238' },
            { id: 1010, input: '2', idinput: 954, nivel: 3, tope: 1, orden: 2, cod: 'C-4143252534' },
            { id: 952, input: 'CANTIDAD', idinput: null, nivel: 1, tope: 0, orden: 2, cod: 'C-4131429553' },
            { id: 955, input: 'MASCULINO', idinput: 952, nivel: 2, tope: 0, orden: 1, cod: 'C-4131457116' },
        ]
        var result = null
        inputs.forEach(async e => {

            let datos_ = {}
            datos_ = {
                input: e.input, indicador: datos.indicador, variable: datos.variable, nivel: e.nivel, ini: datos.ini, fin: datos.fin, estado: e.estado,
                tope: e.tope, orden: e.orden, cod: e.cod, indicador_: datos.indicador, creado: datos.creado, usuario: datos.usuario, ordengen: e.ordengen
            }
            // console.log(e, 'item')

            if (e.idinput == null) {
                [result] = await pool.query("INSERT INTO input SET  ?", datos_)
                // console.log('entra al bloque', result.insertId)
                // console.log(e.idinput, result, 'id del input')

                await inputs.forEach(async e2 => {
                    if (e.id === e2.idinput) {
                        // console.log(result.insertId, 'id del registro padre')
                        const datos_2 = {
                            input: e2.input, idinput: result.insertId, variable: datos.variable, nivel: e2.nivel, ini: datos.ini,
                            fin: datos.fin, estado: e2.estado,
                            tope: e2.tope, orden: e2.orden, cod: e2.cod, indicador_: datos.indicador, creado: datos.creado, usuario: datos.usuario, ordengen: e2.ordengen
                        }
                        const [result2] = await pool.query("INSERT INTO input SET  ?", datos_2)
                        if (e2.tope == 0) {
                            await inputs.forEach(async e3 => {
                                if (e2.id === e3.idinput) {
                                    const datos_3 = {
                                        input: e3.input, idinput: result2.insertId, variable: datos.variable, nivel: e3.nivel, ini: datos.ini,
                                        fin: datos.fin, estado: e3.estado,
                                        tope: e3.tope, orden: e3.orden, cod: e3.cod, indicador_: datos.indicador, creado: datos.creado, usuario: datos.usuario, ordengen: e3.ordengen
                                    }
                                    const [result3] = await pool.query("INSERT INTO input SET  ?", datos_3)
                                }
                            })
                        }
                    }
                })

            }
        })


    }





    actualizarInput = async (datos) => {

        // console.log(datos, 'modelo')
        const sqlExiste =
            `SELECT id  from input 
                where  input = ${pool.escape(datos.input)} and id != ${pool.escape(datos.id)} and  idinput = ${pool.escape(datos.idinput)} `;
        const [existe] = await pool.query(sqlExiste)

        if (existe.length === 0) {
            console.log('no existe')
            const sqlUpd =  //OBTENEMOS EL ID Y EL INDICADOR_ DE CADA REGISTRO DE UNA DETERMINADA VARIABLE
                `update input set input =${pool.escape(datos.input)}, ini=${pool.escape(datos.ini)}, fin=${pool.escape(datos.fin)},
                  usuario = ${datos.usuario}, modificado = ${pool.escape(datos.modificado)}
                  where cod = ${pool.escape(datos.codigo)}`;
            await pool.query(sqlUpd)
            return { ok: true }

        } else { console.log(' existe'); return { existe: 1 } }


    }


    eliminarInput = async (datos) => {

        //ID DEL INPUT PADRE
        const sqlIdPadre =
            `SELECT padre.id as id, padre.cod  from input i
                inner join input padre on padre.id = i.idinput
                where  i.id = ${pool.escape(datos.idinput)} `;

        const [existeIdPadre] = await pool.query(sqlIdPadre)
        console.log(existeIdPadre, 'padre ')

        if (existeIdPadre.length > 0) {

            const sqlHijos =
                `SELECT hijos.id as id  from input i
                inner join input hijos on i.id = hijos.idinput
                where  i.id = ${pool.escape(existeIdPadre[0].id)} `;
            const [existeHijos] = await pool.query(sqlHijos)
            if (existeHijos.length > 1) {
                const sql = `delete from input WHERE cod = ${pool.escape(datos.cod)}`;
                await pool.query(sql);

                this.detener({ modificado: datos.modificado, usuario: datos.usuario, variable: datos.variable })
                return { ok: true }
            } else {

                const sqlCambiarTope = `UPDATE input SET
                tope = 1,
                modificado = ${pool.escape(datos.modificado)},
                usuario = ${pool.escape(datos.usuario)}
                WHERE cod = ${pool.escape(existeIdPadre[0].cod)}`;
                await pool.query(sqlCambiarTope);

                const sql = `delete from input WHERE cod = ${pool.escape(datos.cod)}`;
                await pool.query(sql);

                this.detener({ modificado: datos.modificado, usuario: datos.usuario, variable: datos.variable })

                // const sqlUEliminar = `delete from valor
                // where variable = ${pool.escape(datos.variable)} and gestion = ${pool.escape(datos.gestion)}`
                // await pool.query(sqlUEliminar)

                return { ok: true }
            }

        } else {

            const sql = `delete from input WHERE cod = ${pool.escape(datos.cod)}`;
            await pool.query(sql);

            this.detener({ modificado: datos.modificado, usuario: datos.usuario, variable: datos.variable })
            return { ok: true }
        }
    }

    activarInput = async (datos) => {
        const sqlIdHijos =
            `SELECT hijo.cod  from input i
            inner join input hijo on hijo.idinput = i.id
            where  i.cod = ${pool.escape(datos.cod)} `;

        const [existeIdHijo] = await pool.query(sqlIdHijos)
        console.log(existeIdHijo, 'hijos activar ', datos.cod)

        if (existeIdHijo.length > 0) {
            const sqlInput_ = `update input set estado = 1,
            modificado = ${pool.escape(datos.modificado)},
            usuario=${pool.escape(datos.usuario)}
            WHERE cod = ${pool.escape(datos.cod)}`;
            pool.query(sqlInput_);

            this.detener(datos)
            existeIdHijo.forEach(async e => {
                const sqlInput = `update input set estado = 1,
                modificado = ${pool.escape(datos.modificado)},
                usuario=${pool.escape(datos.usuario)}
                WHERE cod = ${pool.escape(e.cod)}`;
                await pool.query(sqlInput);

                /////
                const sqlIdHijos3 =
                    `SELECT hijo.cod  from input i
                inner join input hijo on hijo.idinput = i.id
                where  i.cod = ${pool.escape(e.cod)} `;

                const [existeIdHijo3] = await pool.query(sqlIdHijos3)
                existeIdHijo3.forEach(async e3 => {
                    const sqlInput = `update input set estado = 1,
                    modificado = ${pool.escape(datos.modificado)},
                    usuario=${pool.escape(datos.usuario)}
                    WHERE cod = ${pool.escape(e3.cod)}`;
                    await pool.query(sqlInput);
                })

            })

            return { ok: true }

        } else {
            this.detener(datos)
            const sqlInput = `update input set estado = 1,
            modificado = ${pool.escape(datos.modificado)},
            usuario=${pool.escape(datos.usuario)}
            WHERE cod = ${pool.escape(datos.cod)}`;
            await pool.query(sqlInput);

            return { ok: true }
        }
    }


    desactivarInput = async (datos) => {

        const sqlIdHijos =
            `SELECT hijo.cod  from input i
            inner join input hijo on hijo.idinput = i.id
        where  i.cod = ${pool.escape(datos.cod)} `;

        const [existeIdHijo] = await pool.query(sqlIdHijos)
        console.log(existeIdHijo, 'hijos desactivar', datos.cod)

        if (existeIdHijo.length > 0) {

            const sqlInput_ = `update input set estado = 0,
            modificado = ${pool.escape(datos.modificado)},
            usuario=${pool.escape(datos.usuario)}
            WHERE cod = ${pool.escape(datos.cod)}`;
            pool.query(sqlInput_);
            this.detener(datos)
            existeIdHijo.forEach(async e => {
                const sqlInput = `update input set estado = 0,
            modificado = ${pool.escape(datos.modificado)},
            usuario=${pool.escape(datos.usuario)}
            WHERE cod = ${pool.escape(e.cod)}`;
                await pool.query(sqlInput);
                /////
                const sqlIdHijos3 =
                    `SELECT hijo.cod  from input i
                    inner join input hijo on hijo.idinput = i.id
                    where  i.cod = ${pool.escape(e.cod)} `;

                const [existeIdHijo3] = await pool.query(sqlIdHijos3)
                existeIdHijo3.forEach(async e3 => {
                    const sqlInput = `update input set estado = 0,
                                    modificado = ${pool.escape(datos.modificado)},
                                    usuario=${pool.escape(datos.usuario)}
                                    WHERE cod = ${pool.escape(e3.cod)}`;
                    await pool.query(sqlInput);
                })
            })
            return { ok: true } 

        } else {
            const sqlInput = `update input set estado = 0,
                        modificado = ${pool.escape(datos.modificado)},
                        usuario=${pool.escape(datos.usuario)}
                        WHERE cod = ${pool.escape(datos.cod)}`;
            await pool.query(sqlInput);
            this.detener(datos)
            return { ok: true }
        }

    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////7
    /////////////////////////////////////////////////////////////////////////////////////////////////////////7
    /////////////////////////////////////////////////////////////////////////////////////////////////////////7
    ///////////////////////////////INPUT OTRO////////////////////////////////////////////////////////////////7
    /////////////////////////////////////////////////////////////////////////////////////////////////////////7
    /////////////////////////////////////////////////////////////////////////////////////////////////////////7
    /////////////////////////////////////////////////////////////////////////////////////////////////////////7


    insertarOtroInput = async (datos) => {
        const sqlExiste =
            `SELECT i.id  from input ip
                inner join input i on ip.id = i.idinput
                where i.variable = ${pool.escape(datos.variable)} and i.nivel = ${pool.escape(datos.nivel + 1)} 
                and i.input = ${pool.escape(datos.input)} and ip.id = ${pool.escape(datos.idinput)} `;
        const [existe] = await pool.query(sqlExiste)
        // console.log(existe, sqlExiste)
        if (existe.length === 0) {

            const sqlLista =  //OBTENEMOS EL ID Y EL INDICADOR_ DE CADA REGISTRO DE UNA DETERMINADA VARIABLE
                `SELECT id, indicador_ from input 
                where variable = ${pool.escape(datos.variable)} and nivel = ${pool.escape(datos.nivel)} and cod = ${pool.escape(datos.codigo)}`;
            const [lista] = await pool.query(sqlLista)
            console.log(lista, 'datos de la lista', datos)

            if (lista.length > 0) {
                let codigo = 'C-' + datos.usuario + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds()
                console.log(codigo)
                lista.forEach(async e => {
                    const sqlOrden = `select max(ip.orden) as orden from input i
                    inner join input ip on i.id = ip.idinput 
                    where i.id = ${pool.escape(e.id)}`

                    const [filaOrden] = await pool.query(sqlOrden)

                    let orden = 1
                    if (filaOrden.length > 0) {
                        orden = filaOrden[0].orden + 1
                    }
                    const sqlOrdenGen =  //OBTENEMOS EL ID Y EL INDICADOR_ DE CADA REGISTRO DE UNA DETERMINADA VARIABLE
                        `SELECT max(ordengen) as ordengen from input 
                                where indicador_ = ${pool.escape(e.indicador)}`;
                    const [ordenGen] = await pool.query(sqlOrdenGen)
                    let ordengen = 1
                    if (ordenGen.length > 0) {
                        ordengen = ordenGen[0].ordengen + 1
                    }

                    const datos_ = {
                        idinput: e.id, cod: codigo, input: datos.input, orden: orden, nivel: datos.nivel + 1, ini: datos.ini, fin: datos.fin,
                        variable: datos.variable, indicador_: e.indicador_, ordengen: ordengen, estado:datos.estado,
                        creado: datos.creado, usuario: datos.usuario
                    }
                    // console.log(e, datos_)

                    const [result] = await pool.query("INSERT INTO input SET  ?", datos_)
                    if (result.insertId > 0) {
                        const sqlUpdTope = `update input set tope = 0, modificado = ${pool.escape(datos.modificado)}, usuario=${pool.escape(datos.usuarios)}
                            where id = ${pool.escape(e.id)}`
                        pool.query(sqlUpdTope)
                        this.detener({ modificado: datos.creado, usuario: datos.usuario, variable: datos.variable })


                        // ELIMINAR DATOS DE LA TABLA VALORES SOLO DEL PADRE DEL NUEVO INPUT CREADO
                        const sqlUEliminar = `delete from valor 
                            where input = ${pool.escape(e.id)} and gestion = ${pool.escape(datos.gestion)}`
                        await pool.query(sqlUEliminar)
                    }
                })

                return { ok: true }

            } else return { existe: 1 } // sin datos de elementos primarios
        } else return { existe: 2 }
    }

}