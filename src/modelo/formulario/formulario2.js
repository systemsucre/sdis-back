


import pool from '../bdConfig.js'

export class Formulario2 {


    // METODOS


    listarGestion = async () => {
        const sql =
            `SELECT id, gestion as nombre FROM gestion where estado = 1 and eliminado = false ORDER BY id ASC `;
        const [rows] = await pool.query(sql)
        const sql1 =
            `SELECT id, ssector as nombre FROM ssector  ORDER BY id ASC`;
        const [rows1] = await pool.query(sql1)
        // console.log(rows1)
        return [rows, rows1]
    }

    listarMes = async (gestion, fecha) => {
        // console.log(gestion)
        const sql =
            `SELECT m.id, concat(m.mes) as nombre, m.estado
            FROM mes m
            inner join gestion g on g.id = m.gestion 
            where m.eliminado = false and g.id = ${pool.escape(gestion)} ORDER BY m.num asc `;
        const [rows] = await pool.query(sql)
        // console.log(sql, rows)

        return rows
    }
    listarVariable = async (gestion, rol, ss) => {
        const sql =
            `SELECT v.id, concat(v.num,'.',v.variable) as nombre 
            FROM ssector ss
            inner join ssvariable ssv on ss.id = ssv.ssector
            inner join variable v on v.id = ssv.variable 
            inner join rol r on r.id = v.rol
            where v.gestion = ${pool.escape(gestion)} and r.nivel = 2 and ss.id = ${pool.escape(ss)}
            and v.estado = 1  ORDER BY v.num ASC `;
        const [rows] = await pool.query(sql)
        console.log(rows, 'cadena sql de list variable')
        return rows
    }

    listarIndicadores = async (datos) => {
        // console.log(datos,'paametros')

        const sql1 =
            `SELECT i.id, concat(i.num,'.',i.indicador) as indicador
            FROM indicador i
            inner join variable v on v.id = i.variable
            where i.estado = 1 and v.id = ${pool.escape(datos.variable)} 
            and ${pool.escape(datos.fecha)} >= i.ini and ${pool.escape(datos.fecha)} <= i.fin ORDER BY i.num ASC `;
        const [rows1] = await pool.query(sql1)

        // EL ORDEN ES EL ORDENGEN DEL INPUT, ESTE VALOR SE LISTA PARA LAS TABLAS
        const sql2 =
            `SELECT ip.id_ as input, ip.indicador_ as idindicador, 0 as valor, ip.cod
                FROM  entrada ip 
                inner join indicador ind on ind.id = ip.indicador_
                where ip.variable =${pool.escape(datos.variable)} and ip.estado = 1 and ind.estado = 1
                ORDER BY ip.ordengen  ASC `;

        const [rows2] = await pool.query(sql2)

        const sqlValores =
            `SELECT input, indicador, valor 
                FROM   valor
                where variable = ${pool.escape(datos.variable)} and  mes = ${pool.escape(datos.mes)}`;

        const [rowsValores] = await pool.query(sqlValores)
        console.log(rowsValores, 'lista ordenada')
        return [rows1, rows2, rowsValores]
    }


}


