


import pool from './bdConfig.js'

export class Reportes6 {


    // METODOS


    listarGestion = async (mun) => {
        let año = new Date().getFullYear()
        const sql =
            `SELECT id, gestion as nombre FROM gestion where  eliminado = false and gestion<=${pool.escape(año)}  ORDER BY gestion ASC `;
        const [rows] = await pool.query(sql)
        const sql1 =
            `SELECT id, ssector as nombre FROM ssector  ORDER BY id ASC `;
        const [rows1] = await pool.query(sql1)
        // console.log(rows, rows1)
        const sql12 =
            `SELECT id, establecimiento as nombre FROM establecimiento where municipio = ${pool.escape(mun)} ORDER BY establecimiento ASC `;
        const [rows12] = await pool.query(sql12)
        return [rows, rows1, rows12]
    }
    listarMes = async (gestion) => {
        const sql =
            `SELECT m.num as id, concat(m.mes) as nombre 
            FROM mes m
            inner join gestion g on g.id = m.gestion 
            where g.id = ${pool.escape(gestion)} and  m.eliminado = false  ORDER BY m.num asc `;
        const [rows] = await pool.query(sql)
        // console.log(sql, rows)

        return rows
    }


    // LISTAR VARIABLE DE establecimiento
    listarTodosFormularioEst = async (gestion) => {
        const sql =
            `SELECT v.id, concat(v.num,'.',v.variable) as nombre  
            FROM  variable v 
            inner join rol r on r.id  = v.rol
            where v.gestion = ${pool.escape(gestion)} and r.nivel = 5 and v.estado = 1  ORDER BY v.num ASC`;
        const [rows] = await pool.query(sql)
        return rows
    }

    listarFormularioEst = async (gestion, ssector) => {
        const sql =
            `SELECT v.id, concat(v.num,'.',v.variable) as nombre  
            FROM ssector ss
            inner join ssvariable ssv on ss.id = ssv.ssector
            inner join variable v on v.id = ssv.variable 
            inner join rol r on r.id  = v.rol
            where v.gestion = ${pool.escape(gestion)} and r.nivel = 5 and
            ss.id = ${pool.escape(ssector)} and v.estado = 1  ORDER BY v.num ASC`;
        const [rows] = await pool.query(sql)
        return rows
    }


    // LISTAR VARIABLE DE AREA
    listarTodosFormularioArea = async (gestion) => {
        const sql =
            `SELECT v.id, concat(v.num,'.',v.variable) as nombre  
            FROM  variable v 
            inner join rol r on r.id  = v.rol
            where v.gestion = ${pool.escape(gestion)} and r.nivel = 6 and v.estado = 1  ORDER BY v.num ASC`;
        const [rows] = await pool.query(sql)
        return rows
    }

    listarFormularioArea = async (gestion, ssector) => {
        const sql =
            `SELECT v.id, concat(v.num,'.',v.variable) as nombre  
            FROM ssector ss
            inner join ssvariable ssv on ss.id = ssv.ssector
            inner join variable v on v.id = ssv.variable 
            inner join rol r on r.id  = v.rol
            where v.gestion = ${pool.escape(gestion)} and r.nivel = 6 and
            ss.id = ${pool.escape(ssector)} and v.estado = 1  ORDER BY v.num ASC`;
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


    listarHospitales = async () => {
        const h =
            `select id , establecimiento as nombre from establecimiento
                     WHERE eliminado = 0 order by establecimiento asc`;
        const [rh] = await pool.query(h)
        return rh
    }

    listarHospitalUnico = async (est) => {
        const h =
            `select id , establecimiento as nombre from establecimiento
                     WHERE id = ${pool.escape(est)} and eliminado = 0 order by establecimiento asc`;
        const [rh] = await pool.query(h)
        return rh
    }
    listarHospitalesMunicipio = async (mun) => {
        const h =
            `select id , establecimiento as nombre from establecimiento
                     WHERE municipio = ${pool.escape(mun)} and eliminado = 0 order by establecimiento asc`;
        const [rh] = await pool.query(h)
        return rh
    }

    listarMunicipio = async () => {
        const m =
            `select id , municipio as nombre from municipio
                    order by municipio asc`;
        const [rm] = await pool.query(m)
        return rm
    }


    listarMunicipioUnico = async (mun) => {
        const m =
            `select id , municipio as nombre from municipio
                   where id = ${pool.escape(mun)} order by municipio asc`;
        const [rm] = await pool.query(m)
        return rm
    }


    listarMunicipioRed = async (red) => {
        const m =
            `select id , municipio as nombre from municipio
                  where red = ${pool.escape(red)}  order by municipio asc`;
        const [rm] = await pool.query(m)
        return rm
    }

    listarRed = async () => {
        const r =
            `select id , red as nombre from red
                      order by red asc`;
        const [rr] = await pool.query(r)
        return rr
    }

    listarRedUnico = async (red) => {
        const r =
            `select id , red as nombre from red
                  where id = ${pool.escape(red)}    order by red asc`;
        const [rr] = await pool.query(r)
        return rr
    }


    maxordengen = async (id) => {
        // console.log(datos.variable,'modelo')

        const sqlMax =
            `select max(orndegen) as cantidad from cabeceras 
                     WHERE variable = ${pool.escape(id)}`;
        const [cabeceras] = await pool.query(sqlMax)
        return cabeceras[0].cantidad
    }











    // REPORTES 



    // reportes variables del municipio

    listarDatosFormularioCompletoArea = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor 
            from valor v
            inner join mes m on m.id = v.mes
            inner join entrada i on i.id_ = v.input
            WHERE  v.variable = ${pool.escape(datos.variable)}  
            and v.gestion = ${pool.escape(datos.gestion)}   and m.num >= ${pool.escape(datos.mes1)}  and 
            m.num <= ${pool.escape(datos.mes2)}  
            GROUP by v.input order by i.ordengen asc;`;
        const [rows1] = await pool.query(sql1)
        // EL ORDEN ES EL ORDENGEN DEL INPUT, ESTE VALOR SE LISTA PARA LAS TABLAS
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
    listarDatosVariableElegidoArea = async (datos) => {
        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor 
            from valor v
            inner join mes m on m.id = v.mes
            inner join entrada i on i.id_ = v.input
            WHERE v.gestion = ${pool.escape(datos.gestion)}   and m.num >= ${pool.escape(datos.mes1)}  and i.estado = 1
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
















    listarDatosFormularioPorRedes = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                    inner join mes m on m.id = v.mes
                    inner join entrada i on i.id_ = v.input
                    inner join establecimiento e on e.id = v.establecimiento
                    inner join municipio mn on mn.id = e.municipio
                    WHERE mn.red = ${pool.escape(datos.red)}  
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

// consolidado por red
listarDatosFormularioPorRedConsolidado = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                    inner join mes m on m.id = v.mes
                    inner join entrada i on i.id_ = v.input
                    inner join establecimiento e on e.id = v.establecimiento
                    inner join municipio mn on mn.id = e.municipio
                    WHERE mn.red = ${pool.escape(datos.red)}  
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

    //listar datos por formulario:: POR MUNICIPIO

    listarDatosFormularioPorMunicipio = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                    inner join mes m on m.id = v.mes
                    inner join entrada i on i.id_ = v.input
                    inner join establecimiento e on e.id = v.establecimiento
                    inner join municipio mn on mn.id = e.municipio
                    WHERE mn.id = ${pool.escape(datos.mun)}  
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
    // consolidado municipio
    listarDatosFormularioPorMunicipioConsolidado = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                    inner join mes m on m.id = v.mes
                    inner join entrada i on i.id_ = v.input
                    inner join establecimiento e on e.id = v.establecimiento
                    inner join municipio mn on mn.id = e.municipio
                    WHERE mn.id = ${pool.escape(datos.mun)}  
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

    listarDatosFormularioPorEstablecimiento = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                    inner join mes m on m.id = v.mes
                    inner join entrada i on i.id_ = v.input
                    inner join establecimiento e on e.id = v.establecimiento
                    WHERE e.id = ${pool.escape(datos.est)}  
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


    listarDatosFormularioConsolidado = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                    inner join mes m on m.id = v.mes
                    inner join entrada i on i.id_ = v.input
                    inner join establecimiento e on e.id = v.establecimiento
                    WHERE v.variable = ${pool.escape(datos.variable)}  
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


}


