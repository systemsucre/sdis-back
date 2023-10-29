


import pool from '../bdConfig.js'

export class Formulario5 {


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
            `SELECT m.id, concat(m.mes) as nombre, m.estado
            FROM mes m
            inner join gestion g on g.id = m.gestion 
            where  ${pool.escape(fecha)} >= m.ini and ${pool.escape(fecha)} <= m.fin
            and m.eliminado = false and g.id = ${pool.escape(gestion)} ORDER BY m.num asc `;
        const [rows] = await pool.query(sql)
        // console.log(sql, rows)

        return rows
    }
    listarVariable = async (gestion, rol, est) => {
        const sql =
            `SELECT v.id, concat(v.num,'.',v.variable) as nombre 
            FROM establecimiento e
            inner join ssector ss on ss.id = e.ssector 
            inner join ssvariable ssv on ss.id = ssv.ssector
            inner join variable v on v.id = ssv.variable
            where v.gestion = ${pool.escape(gestion)} and v.rol = ${pool.escape(rol)} 
            and e.id = ${pool.escape(est)} and v.estado = 1  ORDER BY v.num ASC `;
        const [rows] = await pool.query(sql)
        // console.log(sql, 'cadena sql de list variable')
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
            `SELECT ip.id_ as input, ip.indicador_ as idindicador, 0 as valor, ip.cod,
            if( ${pool.escape(datos.fecha)} >= ip.ini  and ${pool.escape(datos.fecha)}<= ip.fin, 1, 0) as edicion
                FROM  entrada ip 
                inner join indicador ind on ind.id = ip.indicador_
                where ip.variable =${pool.escape(datos.variable)} and ip.estado = 1 and ind.estado = 1
                ORDER BY ip.ordengen  ASC `;

        const [rows2] = await pool.query(sql2)

        const sqlValores =
            `SELECT input, indicador, valor 
                FROM   valor
                where variable = ${pool.escape(datos.variable)} and establecimiento = ${pool.escape(datos.sest)} and mes = ${pool.escape(datos.mes)}`;

        const [rowsValores] = await pool.query(sqlValores)

        // console.log(sql,'cadena sql')
        return [rows1, rows2, rowsValores]
    }


    cantidadItem = async (id) => {
        const sql =
            `select count(id) as cantidad from cabeceras WHERE idinput = ${pool.escape(id)};`;
        const [rows] = await pool.query(sql)
        // console.log(rows[0].cantidad)
        return rows[0].cantidad
    }

}


