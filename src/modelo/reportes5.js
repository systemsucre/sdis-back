


import pool from './bdConfig.js'

export class Reportes5 {


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
    listarVariableinicio = async (est, rol) => {
        const sql =
            `SELECT v.id, concat(v.num,'.',v.variable) as nombre 
            FROM establecimiento e
            inner join ssector ss on ss.id = e.ssector 
            inner join ssvariable ssv on ss.id = ssv.ssector
            inner join variable v on v.id = ssv.variable
            inner join gestion g on g.id = v.gestion

            where v.estado = 1 and g.gestion = ${pool.escape(new Date().getFullYear())} and rol = ${pool.escape(rol)} and e.id = ${pool.escape(est)} ORDER BY v.num ASC `;
        const [rows] = await pool.query(sql)
        return rows
    }

    listarVariable = async (gestion, rol, est) => {
        const sql =
            `SELECT v.id, concat(v.num,'.',v.variable) as nombre 
            FROM establecimiento e
            inner join ssector ss on ss.id = e.ssector 
            inner join ssvariable ssv on ss.id = ssv.ssector
            inner join variable v on v.id = ssv.variable
            inner join gestion g on g.id = v.gestion
            where  g.id = ${pool.escape(gestion)} and v.rol = ${pool.escape(rol)}
            and e.id = ${pool.escape(est)} and v.estado = 1  ORDER BY v.num ASC
            `;
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
                     WHERE variable = ${pool.escape(datos.variable)} order by nivel, orndegen asc`;
        const [cabeceras] = await pool.query(sqlCabeceras)
        return cabeceras
    }


    // REPORTES
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // PARA REPORTES DINAMICOS

    // NIVEL : ESTABLECIMIENTOS
    // por establecimiennto
    listarDatosTodosVariableEstablecimiento = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
            inner join mes m on m.id = v.mes
            inner join entrada i on i.id_ = v.input
            
            WHERE v.establecimiento = ${pool.escape(datos.est)}  
            and v.variable = ${pool.escape(datos.variable)}  
            and v.gestion = ${pool.escape(datos.gestion)}   and m.num >= ${pool.escape(datos.mes1)}  and m.num <= ${pool.escape(datos.mes2)}  and i.estado = 1
            GROUP by v.input order by i.ordengen asc;`;
        // console.log(sql1)
        const [rows1] = await pool.query(sql1)
        const sql2 =
            `SELECT ip.id_ as input, ind.id as indicador, 0 as valor
                FROM  entrada ip 
                inner join indicador ind on ind.id = ip.indicador_
                where ip.variable =${pool.escape(datos.variable)} and ip.estado = 1 and ind.estado = 1
                ORDER BY ip.ordengen  ASC `;

        const [rows2] = await pool.query(sql2)
        return [rows1, rows2]
    }

    // un indicador en especifico
    listarDatosVariableElegidoEstablecimiento = async (datos) => {
        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
            inner join mes m on m.id = v.mes
            inner join entrada i on i.id_ = v.input
            WHERE v.establecimiento = ${pool.escape(datos.est)} 
            and v.gestion = ${pool.escape(datos.gestion)}   and m.num >= ${pool.escape(datos.mes1)}  and i.estado = 1
            and m.num <= ${pool.escape(datos.mes2)}  and v.indicador = ${pool.escape(datos.indicador)} 
            GROUP by v.input order by i.ordengen asc;`;
        const [rows1] = await pool.query(sql1)

        const sql2 =
            `SELECT ip.id_ as input, ind.id as indicador, 0 as valor
            FROM  entrada ip 
            inner join indicador ind on ind.id = ip.indicador_
            where ip.indicador_ =${pool.escape(datos.indicador)} and ip.estado = 1 and ind.estado = 1
            ORDER BY ip.ordengen  ASC `;

        const [rows2] = await pool.query(sql2)
        return [rows1, rows2]

    }


}


