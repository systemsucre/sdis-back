


import pool from './bdConfig.js'

export class Registro {


    // METODOS


    listarGestion = async () => {
        const sql =
            `SELECT id, gestion as nombre FROM gestion where estado = 1 and eliminado = false ORDER BY id ASC `;
        const [rows] = await pool.query(sql)
        return rows
    }
    listarMes = async (gestion, fecha) => {
        const sql =
            `SELECT m.id, concat(m.mes) as nombre 
            FROM mes m
            inner join gestion g on g.id = m.gestion 
            where (m.estado = 1 or (${pool.escape(fecha)} >= m.ini and ${pool.escape(fecha)} <= m.fin)) 
            and m.eliminado = false and g.id = ${pool.escape(gestion)} ORDER BY m.mes ASC `;
        const [rows] = await pool.query(sql)
        return rows
    }
    listarVariable = async (gestion, rol) => {
        const sql =
            `SELECT v.id, concat(v.num,'.',v.variable) as nombre 
            FROM variable v
            inner join gestion g on g.id = v.gestion 
            where v.eliminado = false and g.id = ${pool.escape(gestion)} and rol = ${pool.escape(rol)} ORDER BY v.num ASC `;  
        const [rows] = await pool.query(sql)
        return rows
    }

    listarIndicadores = async (datos) => {
        const sql1 =
            `SELECT i.id, concat(i.num,'.',i.indicador) as indicador
            FROM indicador i
            inner join variable v on v.id = i.variable
            where i.eliminado = false and v.id = ${pool.escape(datos.variable)} ORDER BY i.num ASC `;
        const [rows1] = await pool.query(sql1)

        // EL ORDEN ES EL ID DEL INPUT, CONSIDERAR PONER OTRO ATRIBUTO A LA TABLA PARA ORDENAR LOS VALORES QUE PERTENECEN AL INDICADOR
        const sql2 =
            `SELECT ip.id, i.id as idindicador, vl.valor
                FROM variable v
                inner join indicador i on v.id = i.variable
                inner join valor vl on i.id = vl.indicador
                inner join input ip on ip.id = vl.input 
                where v.id = ${pool.escape(datos.variable)} and vl.mes = ${pool.escape(datos.mes)} and vl.establecimiento =${pool.escape(datos.sest)} 
                ORDER BY ip.indicador_, ip.id  ASC `;
        const [rows2] = await pool.query(sql2)

        return [rows1, rows2]
    }


    listarValoresInput = async (datos) => {

        const sqlvalores = `select v.valor from valor v 
                            inner join variable i on i.id = v.variable
                            where v.variable = ${pool.escape(datos.variable)} and 
                            v.establecimiento = ${pool.escape(datos.establecimiento)} and 
                            v.mes= ${pool.escape(datos.mes)}`
        const [rowsValores] = await pool.query(sqlvalores)
        // LA INFORMACION SE LLENA DE MANERA MENSUAL, SE DEBE IMPEDIR CREAR MAS DE UN VALOR EN UN MISMO MES
        // SI rowsValores NO TIENE NINGUNA INFORMACION INSERTAMOS CEROS EN TODAS LAS TABLAS 
        // HACEMOS UN BUCLE CON TODOS LOS IDS DE LA VARAIBLE OBTENIDOS DE LA TABLA INPUT

        if (rowsValores.length === 0) {
            const sqltope = `select i.id, ind.id as indicador from variable v 
                            inner join indicador ind on v.id = ind.variable
                            inner join input i on ind.id = i.indicador_
                            where i.tope = 1 and i.eliminado = false and v.id = ${pool.escape(datos.variable)}`
            const [tope] = await pool.query(sqltope)
            console.log(tope)
            await tope.forEach(async e => {
                const dataInsert = {
                    valor: 0, fecha: datos.fecha, hora: datos.hora, gestion: datos.gestion, mes: datos.mes, variable: datos.variable,
                    usuario: datos.usuario, input: e.id, establecimiento: datos.establecimiento, indicador: e.indicador
                }
                await pool.query('INSERT INTO valor SET  ?', dataInsert)
            })
        }
        // OBTENEMOS VALOR PARA RELLENAR CAMPOS EN EL CLIENTE
        const sql =
            `SELECT i.id, vl.valor
        from variable v
        inner join input i on v.id = i.variable
        inner join valor vl on i.id = vl.input
        where i.eliminado =  false and v.id = ${pool.escape(datos.variable)} and vl.mes = ${pool.escape(datos.mes)} and vl.establecimiento = ${pool.escape(datos.establecimiento)}
        ORDER BY i.id ASC`;
        const [rows] = await pool.query(sql)

        return rows
    }

    listarInput = async (datos) => {

        const sql =
            `SELECT i.nivel, i.id,  i.input, i.orden, i.idinput, i.tope,  ind.id as idindicador, concat(ind.num,'.',ind.indicador) as indicador, ind.num as ordensup
            from input i
            inner join indicador ind on ind.id = i.indicador
            where i.eliminado =  false and ind.id = ${pool.escape(datos.id)} 
            ORDER BY i.id ASC`;
        const [rows] = await pool.query(sql)

        return rows
    }

    listarInput2 = async (datos) => {
        const sqlDependiente =
            `SELECT i.nivel,i.id, i.input, i.orden, i.idinput,  i.tope, '' as indicador, '' as idindicador, '' as ordensup
                        from input i
                        inner join input ind on ind.id = i.idinput
                        where i.eliminado =  false and ind.id = ${pool.escape(datos.id)}
                        ORDER BY i.orden DESC`;
        const [arrayNivel2] = await pool.query(sqlDependiente)

        return arrayNivel2
    }

    insertar = async (info, data) => {


        // BUSCAR LA MANERA DE OBTENER LOS IDS DE LOS INPUTS CON TOPE IGUAL A 1 QUE PERTENEZCAN A DICHA VARIABLE,
        // PREFERIBLIEMENTE SE PUEDE HACER DESDE EL CLIENTE I ENVIAR ESTOS IDS AL MOMENTO DE SOLICITAR EL REGISTRO DE VALORES, 
        // AUNQUE ESTO LLEVE MAS TIEMPO Y PROCESAMIENTO
        // LA ULTIMA OPCION ES CREAR UN ATRIBUTO VARIABLE EN LA TABLA INPUT, (OPCION ELEGIDA)


        // const sqltope = `select i.id from input i 
        // inner join variable v on v.id = i.variable
        // where i.tope = 1 and i.eliminado = false and v.id = ${pool.escape(info.variable)}`
        // const [tope] = await pool.query(sqltope)
        // console.log(data, tope)


        // await tope.forEach(async e => {
        await data.forEach(async e1 => {
            // if (parseInt(e1.id) === parseInt(e.id)) {

            const sqlRegistrado = `select id  
                from valor where input = ${pool.escape(e1.id)} and establecimiento = ${pool.escape(info.establecimiento)} and variable = ${pool.escape(info.variable)} `
            const [registrado] = await pool.query(sqlRegistrado)
            if (registrado.length > 0) {

                console.log(registrado, e1, 'registrado')
                const sqlUpd = `update valor set 
                        valor = ${pool.escape(e1.valor)},
                        usuario = ${pool.escape(info.usuario)},
                        fecha = ${pool.escape(info.fecha)},
                        hora = ${pool.escape(info.hora)}
                        where mes = ${pool.escape(info.mes)} and establecimiento = ${pool.escape(info.establecimiento)} and 
                        input = ${pool.escape(e1.id)}`
                pool.query(sqlUpd)
            } else {
                const datoFaltante = {
                    valor: e1.valor, fecha: info.fecha, hora: info.hora, gestion: info.gestion, mes: info.mes, variable: info.variable,
                    usuario: info.usuario, input: e1.id, establecimiento: info.establecimiento, indicador: info.indicador
                }
                await pool.query('INSERT INTO valor SET  ?', datoFaltante)
                console.log(registrado, e1, 'no registrado')

            }

            // }
        })
        // })
        return true
    }

}


