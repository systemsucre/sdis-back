


import pool from '../bdConfig.js'

export class Opeinf6 {


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
            `SELECT m.id, m.mes as nombre 
            FROM mes m
            inner join gestion g on g.id = m.gestion 
            where g.id = ${pool.escape(gestion)} and  m.eliminado = false  ORDER BY m.num asc `;
        const [rows] = await pool.query(sql)
        // console.log(sql, rows)

        return rows
    }






    listardatos = async (datos) => {

        const sql1 =
            `select v.establecimiento, DATE_FORMAT(max(v.fecha),"%Y/%m/%d") as fecha, v.estado 
             from valor v
             left join establecimiento e on e.id = v.establecimiento
            where v.gestion=${pool.escape(datos.gestion)} and v.mes = ${pool.escape(datos.mes1)} and v.variable = ${pool.escape(datos.svar)} 
            GROUP by establecimiento`;
        const [rows1] = await pool.query(sql1)
        // console.log(rows1, datos)

        const sql2 =
            `select e.id, concat(e.establecimiento, ' (', m.municipio,')') as establecimiento, 0 as estado from establecimiento e
                    inner join municipio m on m.id = e.municipio
                    where e.eliminado = 0
                    order by m.municipio, e.establecimiento asc`;
        const [rows2] = await pool.query(sql2)
        console.log(rows2)
        return [rows1, rows2]
    }


}


