


import pool from '../bdConfig.js'

export class Opeinf2 {


    // METODOS


    listarGestion = async () => {
        let año = new Date().getFullYear()
        const sql =
            `SELECT id, gestion as nombre FROM gestion where  eliminado = false and gestion<=${pool.escape(año)}  ORDER BY gestion ASC `;
        const [rows] = await pool.query(sql)
        return rows
    }
    listarMes = async (gestion) => {
        // console.log(gestion)
        const sql =
            `SELECT m.num as id, concat(m.mes) as nombre 
            FROM mes m
            inner join gestion g on g.id = m.gestion 
            where g.id = ${pool.escape(gestion)} and  m.eliminado = false  ORDER BY m.num asc `;
        const [rows] = await pool.query(sql)
        // console.log(sql, rows)

        return rows
    }

    listarRed = async () => {
        
        const sql =
            `SELECT id, red as nombre 
            FROM red  ORDER BY red asc `;
        const [rows] = await pool.query(sql)
        // console.log(rows, 'red')
        return rows
    }

    listarVariableinicio = async () => {
        const sql =
            `SELECT v.id, concat(v.num,'.',v.variable) as nombre 
            FROM variable v
            inner join gestion g on g.id = v.gestion 
            inner join rol r on r.id = v.rol
            where v.estado = 1 and g.gestion = ${pool.escape(new Date().getFullYear())} and r.nivel = 5 ORDER BY v.num ASC `;
        const [rows] = await pool.query(sql)
        return rows
    }

    listarVariable = async (gestion,) => {
        const sql =
            `SELECT v.id, concat(v.num,'.',v.variable) as nombre 
            FROM variable v
            inner join gestion g on g.id = v.gestion 
            inner join rol r on r.id = v.rol
            where  g.id = ${pool.escape(gestion)} and r.nivel = 5 and v.estado = 1 ORDER BY v.num ASC `;
        const [rows] = await pool.query(sql)
        return rows
    }


    listarIndicadores = async (datos) => {
        const sql1 =
            `SELECT i.id, concat(i.num,'.',i.indicador) as indicador, v.id as variable
            FROM indicador i
            inner join variable v on v.id = i.variable
            where i.estado = 1 and v.id = ${pool.escape(datos.variable)} ORDER BY i.num ASC `;
        const [rows1] = await pool.query(sql1)
        return rows1
    }





    listarCabeceras = async (datos) => {
        // console.log(datos.variable,'modelo')

        const sqlCabeceras =
            `select id_ as id, input,idinput,nivel, tope,orden, span,orndegen as ordengen, variable from cabeceras 
                     WHERE variable = ${pool.escape(datos.variable)} order by orndegen asc`;
        const [cabeceras] = await pool.query(sqlCabeceras)
        return cabeceras
    }



    listarDatosTodosVariable = async (datos) => {

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
            inner join mes m on m.id = v.mes
            inner join input i on i.id = v.input
            inner join establecimiento e on e.id = v.establecimiento
            inner join municipio mun on mun.id = e.municipio
            inner join red r on r.id = mun.red
            WHERE r.id = ${pool.escape(datos.red)}  and v.variable = ${pool.escape(datos.variable)}  
            and v.gestion = ${pool.escape(datos.gestion)}   and m.num >= ${pool.escape(datos.mes1)}  and m.num <= ${pool.escape(datos.mes2)}  
            GROUP by v.input order by i.ordengen asc;`;
        const [rows1] = await pool.query(sql1) 
        return rows1
    }


}


