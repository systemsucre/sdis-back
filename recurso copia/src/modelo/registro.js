


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
        // console.log(gestion)
        const sql =
            `SELECT m.id, concat(m.mes) as nombre 
            FROM mes m
            inner join gestion g on g.id = m.gestion 
            where  ${pool.escape(fecha)} >= m.ini and ${pool.escape(fecha)} <= m.fin
            and m.eliminado = false and g.id = ${pool.escape(gestion)} ORDER BY m.num asc `;
        const [rows] = await pool.query(sql)
        // console.log(sql, rows)

        return rows
    }
    listarVariable = async (gestion, rol) => {
        const sql =
            `SELECT v.id, concat(v.num,'.',v.variable) as nombre 
            FROM variable v
            inner join gestion g on g.id = v.gestion 
            where g.id = ${pool.escape(gestion)} and rol = ${pool.escape(rol)} and v.estado = 1  ORDER BY v.num ASC `;
        const [rows] = await pool.query(sql)
        return rows
    }

    listarIndicadores = async (datos) => {
        const sql1 =
            `SELECT i.id, concat(i.num,'.',i.indicador) as indicador
            FROM indicador i
            inner join variable v on v.id = i.variable
            where i.estado = 1 and v.id = ${pool.escape(datos.variable)} 
            and ${pool.escape(datos.fecha)} >= i.ini and ${pool.escape(datos.fecha)} <= i.fin ORDER BY i.num ASC `;
        const [rows1] = await pool.query(sql1)
        // console.log(rows1, 'lista ordenada', sql1)
        // EL ORDEN ES EL ORDENGEN DEL INPUT, ESTE VALOR SE LISTA PARA LAS TABLAS
        const sql2 =
            `SELECT ip.id, vl.indicador as idindicador, vl.valor
            FROM valor vl
            inner join input ip on ip.id = vl.input
            inner join indicador ind on ind.id = vl.indicador
                where vl.variable = ${pool.escape(datos.variable)} and vl.mes = ${pool.escape(datos.mes)} and vl.establecimiento =${pool.escape(datos.sest)} 
                and ip.estado = 1 and ind.estado = 1
                ORDER BY ip.ordengen  ASC `;

        const [rows2] = await pool.query(sql2)

        console.log(rows1, rows2)
        return [rows1, rows2]
    }


    cantidadItem = async (id) => {
        const sql =
            `select count(id) as cantidad from cabeceras WHERE idinput = ${pool.escape(id)};`;
        const [rows] = await pool.query(sql)
        // console.log(rows[0].cantidad)
        return rows[0].cantidad
    }


    listarValoresInput = async (datos) => {

        const sqlvalores = `select valor from valor  
                            where indicador = ${pool.escape(datos.id)} and 
                            establecimiento = ${pool.escape(datos.establecimiento)} and 
                            mes= ${pool.escape(datos.mes)}`
        const [rowsValores] = await pool.query(sqlvalores)


        if (rowsValores.length === 0) {

            const sqltope = `select id, indicador_ as indicador, orden, cod from  input
                            where tope = 1 and indicador_ = ${pool.escape(datos.id)} 
                            order by ordengen asc`
            const [tope] = await pool.query(sqltope)
            console.log(tope, 'lista de datos obtenidos, probando atribute')
            await tope.forEach(async e => {
                const dataInsert = {
                    valor: 0, fecha: datos.fecha, hora: datos.hora, gestion: datos.gestion, mes: datos.mes, cod: e.cod, variable: datos.variable,
                    usuario: datos.usuario, input: e.id, establecimiento: datos.establecimiento, indicador: e.indicador,
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
                    where i.estado = 1 and vl.indicador = ${pool.escape(datos.id)} and vl.mes = ${pool.escape(datos.mes)} and
                     vl.establecimiento = ${pool.escape(datos.establecimiento)}
                    ORDER BY i.ordengen ASC`;
        const [rows] = await pool.query(sql)


        return rows
    }





    listarInput = async (datos) => {

        const sql =
            `SELECT i.nivel, i.id,  i.input, i.orden, i.idinput, i.tope,  ind.id as idindicador, concat(ind.num,'.',ind.indicador) as indicador, ind.num as ordensup, 
            if (${pool.escape(datos.fecha)} >= i.ini and ${pool.escape(datos.fecha)} <= i.fin, 1, 0) as estado
            from input i
            inner join indicador ind on ind.id = i.indicador
            where i.estado =  1 and ind.id = ${pool.escape(datos.id)} 
            ORDER BY i.orden ASC`;
        const [rows] = await pool.query(sql)
        // console.log(rows)

        return rows
    }

    listarInput2 = async (datos) => {
        const sqlDependiente =
            `SELECT i.nivel,i.id, i.input, i.orden, i.idinput,  i.tope, '' as indicador, '' as idindicador, '' as ordensup,
            if (${pool.escape(datos.fecha)} >= i.ini and ${pool.escape(datos.fecha)} <= i.fin, 1, 0) as estado
                        from input i
                        inner join input ind on ind.id = i.idinput
                        where i.estado =  1 and ind.id = ${pool.escape(datos.id)}
                        ORDER BY i.orden DESC`;
        const [arrayNivel2] = await pool.query(sqlDependiente)
        return arrayNivel2
    }



    insertar = async (info) => {


        const sqlExiste = `select id from  valor
        where mes = ${pool.escape(info.mes)} and 
        establecimiento = ${pool.escape(info.establecimiento)} and input = ${pool.escape(parseInt(info.input))}`
        const [lista] = await pool.query(sqlExiste)
        console.log(lista)
        if (lista.length > 0) {
            const sqlUpd = `update valor set 
                                    valor = ${pool.escape(parseInt(info.valor))},
                                    usuario = ${pool.escape(info.usuario)},
                                    fecha = ${pool.escape(info.fecha)},
                                    hora = ${pool.escape(info.hora)}
                                    where mes = ${pool.escape(info.mes)} and establecimiento = ${pool.escape(info.establecimiento)} and
                                    input = ${pool.escape(parseInt(info.input))}`
            await pool.query(sqlUpd)
            return true
        } else {
            const sqlCodigo = `select cod from  input
                                where id = ${pool.escape(info.input)} `
            const [codigo] = await pool.query(sqlCodigo)
            const dataInsert = {
                valor: info.valor, fecha: info.fecha, hora: info.hora, gestion: info.gestion, mes: info.mes, cod: codigo[0].cod, variable: info.variable,
                usuario: info.usuario, input: info.input, establecimiento: info.establecimiento, indicador: info.indicador,
            }
            await pool.query('INSERT INTO valor SET  ?', dataInsert)
            return true
        }

    }

}


