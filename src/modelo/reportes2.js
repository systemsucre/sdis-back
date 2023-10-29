


import pool from './bdConfig.js'

export class Reportes2 {


    // METODOS


    listarGestion = async () => {
        let año = new Date().getFullYear()
        const sql =
            `SELECT id, gestion as nombre FROM gestion where  eliminado = false and gestion<=${pool.escape(año)}  ORDER BY gestion ASC `;
        const [rows] = await pool.query(sql)
        const sql1 =
            `SELECT id, ssector as nombre FROM ssector  ORDER BY id ASC `;
        const [rows1] = await pool.query(sql1)
        // console.log(rows, rows1)

        return [rows, rows1]
    }


    listarHospitales = async (datos) => {
        const h =
            `select cod as id, establecimiento as nombre, 5 as numero from establecimiento
                     WHERE municipio = ${pool.escape(datos.smun)} and eliminado = 0 order by establecimiento asc`;
        const [rh] = await pool.query(h)

        return rh
    }




    listarHospitalesFormulario = async (datos) => {

        const h =
            `select e.cod as id, concat(establecimiento,' (', m.municipio, ')') as nombre, 5 as numero from establecimiento e
                    inner join municipio m on m.id = e.municipio
                    WHERE e.municipio = ${pool.escape(datos.smun)} and e.eliminado = 0 order by e.establecimiento asc`;
        const [rh] = await pool.query(h)

        return rh
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


    // VARIaBLE NIVEL SEDES
    listarTodosVariableS = async (gestion) => {
        const sql =
            `SELECT v.id, concat(v.num,'.',v.variable) as nombre  
            FROM  variable v 
            inner join rol r on r.id  = v.rol
            where v.gestion = ${pool.escape(gestion)} and r.nivel = 2 and v.estado = 1  ORDER BY v.num ASC`;
        const [rows] = await pool.query(sql)
        return rows
    }

    listarVariableS = async (gestion, ssector) => {
        const sql =
            `SELECT v.id, concat(v.num,'.',v.variable) as nombre  
            FROM ssector ss
            inner join ssvariable ssv on ss.id = ssv.ssector
            inner join variable v on v.id = ssv.variable 
            inner join rol r on r.id  = v.rol
            where v.gestion = ${pool.escape(gestion)} and r.nivel = 2 and
            ss.id = ${pool.escape(ssector)} and v.estado = 1  ORDER BY v.num ASC`;
        const [rows] = await pool.query(sql)
        return rows
    }

    // VARIaBLE NIVEL SEDES
    listarTodosVariableArea = async (gestion) => {
        const sql =
            `SELECT v.id, concat(v.num,'.',v.variable) as nombre  
                FROM  variable v 
                inner join rol r on r.id  = v.rol
                where v.gestion = ${pool.escape(gestion)} and r.nivel = 6 and v.estado = 1  ORDER BY v.num ASC`;
        const [rows] = await pool.query(sql)
        return rows
    }

    listarVariableArea = async (gestion, ssector) => {
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
    // variable de nivel 3: red
    listarTodosVariableRed = async (gestion) => {
        const sql =
            `SELECT v.id, concat(v.num,'.',v.variable) as nombre  
                    FROM  variable v 
                    inner join rol r on r.id  = v.rol
                    where v.gestion = ${pool.escape(gestion)} and r.nivel = 3 and v.estado = 1  ORDER BY v.num ASC`;
        const [rows] = await pool.query(sql)
        // console.log(rows, 'todos los variables nivel 4')

        return rows
    }

    listarVariableRed = async (gestion, ssector) => {
        const sql =
            `SELECT v.id, concat(v.num,'.',v.variable) as nombre  
                    FROM ssector ss
                    inner join ssvariable ssv on ss.id = ssv.ssector
                    inner join variable v on v.id = ssv.variable 
                    inner join rol r on r.id  = v.rol
                    where v.gestion = ${pool.escape(gestion)} and r.nivel = 3 and
                    ss.id = ${pool.escape(ssector)} and v.estado = 1  ORDER BY v.num ASC`;
        const [rows] = await pool.query(sql)
        // console.log(rows, 'varaible escogido nivel 4')
        return rows
    }

    // variable de nivel 4: municipios
    listarTodosVariablemun = async (gestion) => {
        const sql =
            `SELECT v.id, concat(v.num,'.',v.variable) as nombre  
                    FROM  variable v 
                    inner join rol r on r.id  = v.rol
                    where v.gestion = ${pool.escape(gestion)} and r.nivel = 4 and v.estado = 1  ORDER BY v.num ASC`;
        const [rows] = await pool.query(sql)
        // console.log(rows, 'todos los variables nivel 4')

        return rows
    }

    listarVariablemun = async (gestion, ssector) => {
        const sql =
            `SELECT v.id, concat(v.num,'.',v.variable) as nombre  
                    FROM ssector ss
                    inner join ssvariable ssv on ss.id = ssv.ssector
                    inner join variable v on v.id = ssv.variable 
                    inner join rol r on r.id  = v.rol
                    where v.gestion = ${pool.escape(gestion)} and r.nivel = 4 and
                    ss.id = ${pool.escape(ssector)} and v.estado = 1  ORDER BY v.num ASC`;
        const [rows] = await pool.query(sql)
        // console.log(rows, 'varaible escogido nivel 4')
        return rows
    }

    // variable de nivel 5 estableciemintos
    listarTodosVariable = async (gestion) => {
        const sql =
            `SELECT v.id, concat(v.num,'.',v.variable) as nombre  
                FROM  variable v 
                inner join rol r on r.id  = v.rol
                where v.gestion = ${pool.escape(gestion)} and r.nivel = 5 and v.estado = 1  ORDER BY v.num ASC`;
        const [rows] = await pool.query(sql)
        return rows
    }

    listarVariable = async (gestion, ssector) => {
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


    maxordengen = async (id) => {
        // console.log(datos.variable,'modelo')

        const sqlMax =
            `select max(orndegen) as cantidad from cabeceras 
                     WHERE variable = ${pool.escape(id)}`;
        const [cabeceras] = await pool.query(sqlMax)
        return cabeceras[0].cantidad
    }

















    // REPORTES 



    // reportes variables de sedes

    listarDatosTodosVariableS = async (datos) => {
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
    listarDatosVariableElegidoS = async (datos) => {
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






    // para analisis de datos departamental

    listarTodosHospital = async () => {
        const h =
            `select e.cod as id, concat(establecimiento,' (', m.municipio, ')') as nombre, 5 as numero from establecimiento e
            inner join municipio m on m.id = e.municipio
            WHERE e.eliminado = 0 order by m.municipio, e.establecimiento  asc`;
        const [rh] = await pool.query(h)

        return rh
    }

    listarDatosFormularioPorEstablecimiento = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                    inner join mes m on m.id = v.mes
                    inner join entrada i on i.id_ = v.input
                    inner join establecimiento e on e.id = v.establecimiento
                    WHERE e.cod = ${pool.escape(datos.est)}  
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

    // por municipio

    listarTodosMunicipios = async () => {
        const h =
            `select m.id , concat(m.municipio, ' (', r.red, ')') as nombre from municipio m
            inner join red r on r.id = m.red
                     order by m.municipio asc`;
        const [rh] = await pool.query(h)

        return rh
    }

    listarDatosFormularioPorMunicipio = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                    inner join mes m on m.id = v.mes
                    inner join entrada i on i.id_ = v.input
                    inner join establecimiento e on e.id = v.establecimiento
                    WHERE e.municipio = ${pool.escape(datos.mun)}  
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


    // por red

    listarTodosRedes = async () => {
        const h =
            `select id , red as nombre from red
                     order by red asc`;
        const [rh] = await pool.query(h)

        return rh
    }

    listarDatosFormularioPorRed = async (datos) => {
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


    // CONSOLIDADO POR DEPARTAMENTO
    listarDatosFormularioEstConsolidado = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                    inner join mes m on m.id = v.mes
                    inner join entrada i on i.id_ = v.input
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /// DATOS DE LAS VARIABLES DE MUNICIPIO
    // por municipio
    listarDatosFormularioMunicipioporMunicipio = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                    inner join mes m on m.id = v.mes
                    inner join entrada i on i.id_ = v.input
                    
                    WHERE v.mun = ${pool.escape(datos.mun)}  
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


    // por red
    listarDatosFormularioMunicipioporRed = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                    inner join mes m on m.id = v.mes
                    inner join entrada i on i.id_ = v.input
                    inner join municipio mn on mn.id = v.mun 
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


    // consolidado
    listarDatosFormularioMunicipioporConsolidado = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                inner join mes m on m.id = v.mes
                inner join entrada i on i.id_ = v.input
                WHERE  v.variable = ${pool.escape(datos.variable)}  
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


    // FORMULARIO DE REDES

    // por redes


    // por red
    listarDatosFormularioRedporRed = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                inner join mes m on m.id = v.mes
                inner join entrada i on i.id_ = v.input 
                WHERE v.red = ${pool.escape(datos.red)}  
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

    // consolidado
    listarDatosFormularioRedesConsolidado = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                inner join mes m on m.id = v.mes
                inner join entrada i on i.id_ = v.input
                WHERE  v.variable = ${pool.escape(datos.variable)}  
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


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // REPORTES PARA EL REPORTE DINAMICO


    listarTodosRedesDinamico = async () => {
        const h =
            `select id , red as nombre, 3 as numero from red
                 order by red asc`;
        const [rh] = await pool.query(h)

        return rh
    }

    listarTodosMunicipiosDinamicos = async () => {
        const h =
            `select cod as id , municipio as nombre, 4 as numero from municipio 
       
                 order by municipio asc`;
        const [rh] = await pool.query(h)

        return rh
    }

    listarTodosHospitalDinamico = async () => {
        const h = `select e.cod as id, concat(establecimiento,' (', m.municipio, ')') as nombre, 5 as numero from establecimiento e
                    inner join municipio m on m.id = e.municipio
                    WHERE e.eliminado = 0 order by m.municipio asc`;
        const [rh] = await pool.query(h)
        return rh
    }


    // PARA REPORTES DINAMICOS
    // por establecimiennto
    listarDatosTodosVariableEstablecimiento = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
            inner join mes m on m.id = v.mes
            inner join entrada i on i.id_ = v.input
            inner join establecimiento e on e.id = v.establecimiento
            WHERE e.cod = ${pool.escape(datos.est)}  
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
            inner join establecimiento e on e.id = v.establecimiento
            WHERE e.cod = ${pool.escape(datos.est)} 
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

    // por municipio
    listarDatosTodosVariableEstablecimiento_nivel_4 = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                inner join mes m on m.id = v.mes
                inner join entrada i on i.id_ = v.input
                inner join establecimiento e on e.id = v.establecimiento
                inner join municipio mn on mn.id = e.municipio
                WHERE mn.cod = ${pool.escape(datos.est)}  
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
    listarDatosVariableElegidoEstablecimiento_nivel_4 = async (datos) => {
        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                inner join mes m on m.id = v.mes
                inner join entrada i on i.id_ = v.input
                inner join establecimiento e on e.id = v.establecimiento
                inner join municipio mn on mn.id = e.municipio
                WHERE mn.cod = ${pool.escape(datos.est)} 
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


    // por red
    listarDatosTodosVariableEstablecimiento_nivel_3 = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                inner join mes m on m.id = v.mes
                inner join entrada i on i.id_ = v.input
                inner join establecimiento e on e.id = v.establecimiento
                inner join municipio mn on mn.id = e.municipio
                inner join red r on r.id = mn.red
                WHERE r.id = ${pool.escape(datos.est)}  
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
    listarDatosVariableElegidoEstablecimiento_nivel_3 = async (datos) => {
        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                inner join mes m on m.id = v.mes
                inner join entrada i on i.id_ = v.input
                inner join establecimiento e on e.id = v.establecimiento
                inner join municipio mn on mn.id = e.municipio
                inner join red r on r.id = mn.red
                WHERE r.id = ${pool.escape(datos.est)}  
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


    // consolidado
    listarDatosTodosVariableEstablecimiento_consolidado = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                inner join mes m on m.id = v.mes
                inner join entrada i on i.id_ = v.input
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

    // un indicador en especifico
    listarDatosVariableElegidoEstablecimiento_consolidado = async (datos) => {
        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
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


    /////////////////////////////
    // FORMULARIOS DE MUNICIPIO

    // por municipio
    listarDatosTodosVariablemun_nivel_4 = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                    inner join mes m on m.id = v.mes
                    inner join entrada i on i.id_ = v.input
                    inner join municipio mn on mn.id = v.mun
                    WHERE mn.cod = ${pool.escape(datos.est)}  
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
    listarDatosVariableElegidomun_nivel_4 = async (datos) => {
        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                    inner join mes m on m.id = v.mes
                    inner join entrada i on i.id_ = v.input
                    inner join municipio mn on mn.id = v.mun
                    WHERE mn.cod = ${pool.escape(datos.est)} 
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


    // por red
    listarDatosTodosVariablemun_nivel_3 = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                    inner join mes m on m.id = v.mes
                    inner join entrada i on i.id_ = v.input
                    inner join municipio mn on mn.id = v.mun
                    inner join red r on r.id = mn.red
                    WHERE r.id = ${pool.escape(datos.est)}  
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
    listarDatosVariableElegidomun_nivel_3 = async (datos) => {
        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                    inner join mes m on m.id = v.mes
                    inner join entrada i on i.id_ = v.input
                    inner join municipio mn on mn.id = v.mun
                    inner join red r on r.id = mn.red
                    WHERE r.id = ${pool.escape(datos.est)}  
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


    // consolidado
    listarDatosTodosVariablemun_consolidado = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                    inner join mes m on m.id = v.mes
                    inner join entrada i on i.id_ = v.input
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

    // un indicador en especifico
    listarDatosVariableElegidomun_consolidado = async (datos) => {
        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
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








    //////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////

    // FORMULARIOS DE RED

    // por red
    listarDatosTodosVariablered_nivel_3 = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                        inner join mes m on m.id = v.mes
                        inner join entrada i on i.id_ = v.input
                        WHERE v.red = ${pool.escape(datos.est)}  
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
    listarDatosVariableElegidored_nivel_3 = async (datos) => {
        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                        inner join mes m on m.id = v.mes
                        inner join entrada i on i.id_ = v.input
                        WHERE v.red = ${pool.escape(datos.est)}  
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


    // consolidado
    listarDatosTodosVariablered_consolidado = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                        inner join mes m on m.id = v.mes
                        inner join entrada i on i.id_ = v.input
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

    // un indicador en especifico
    listarDatosVariableElegidored_consolidado = async (datos) => {
        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
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


    //////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////

    // FORMULARIOS DE AREA

    listarDatosTodosVariablearea_consolidado = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                        inner join mes m on m.id = v.mes
                        inner join entrada i on i.id_ = v.input
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

    // un indicador en especifico
    listarDatosVariableElegidoarea_consolidado = async (datos) => {
        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
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






















































































    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////
    // por red
    listarDatosTodosVariableConsolidadored = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
            inner join mes m on m.id = v.mes
            inner join entrada i on i.id_ = v.input
            inner join establecimiento e on e.id = v.establecimiento
            inner join municipio mun on mun.id = e.municipio
            inner join red r on r.id = mun.red 
            WHERE r.id = ${pool.escape(datos.sred)}  
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
    listarDatosVariableElegidoConsolidadored = async (datos) => {
        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
            inner join mes m on m.id = v.mes
            inner join entrada i on i.id_ = v.input
            inner join establecimiento e on e.id = v.establecimiento
            inner join municipio mun on mun.id = e.municipio
            inner join red r on r.id = mun.red 
            WHERE r.id = ${pool.escape(datos.sred)} 
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


    // por municipio

    listarDatosTodosVariableConsolidadomun = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
            inner join mes m on m.id = v.mes
            inner join entrada i on i.id_ = v.input
            inner join establecimiento e on e.id = v.establecimiento
            inner join municipio mun on mun.id = e.municipio
            WHERE mun.id = ${pool.escape(datos.mun)}  
            and v.variable = ${pool.escape(datos.variable)}  
            and v.gestion = ${pool.escape(datos.gestion)}   and m.num >= ${pool.escape(datos.mes1)}  and m.num <= ${pool.escape(datos.mes2)}  and i.estado = 1
            GROUP by v.input order by i.ordengen asc;`;
        const [rows1] = await pool.query(sql1)
        const sql2 =
            `SELECT ip.id_ as input, ind.id as indicador, 0 as valor
                FROM  entrada ip 
                inner join indicador ind on ind.id = ip.indicador_
                where ip.variable =${pool.escape(datos.variable)} and ip.estado = 1 and ind.estado = 1
                ORDER BY ip.ordengen  ASC `;

        const [rows2] = await pool.query(sql2)
        console.log(rows1)

        return [rows1, rows2]
    }

    // un indicador en especifico
    listarDatosVariableElegidoConsolidadomun = async (datos) => {
        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
            inner join mes m on m.id = v.mes
            inner join entrada i on i.id_ = v.input
            inner join establecimiento e on e.id = v.establecimiento
            inner join municipio mun on mun.id = e.municipio
            WHERE mun.id = ${pool.escape(datos.mun)}  
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





    // reportes variables del municipio

    listarDatosTodosVariableM = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor 
        from valor v
        inner join mes m on m.id = v.mes
        inner join entrada i on i.id_ = v.input
        WHERE v.mun = ${pool.escape(datos.mun)}  and v.variable = ${pool.escape(datos.variable)}  
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

    // formularios de municipio
    listarDatosVariableElegidoM = async (datos) => {
        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor 
        from valor v
        inner join mes m on m.id = v.mes
        inner join entrada i on i.id_ = v.input
        WHERE v.mun = ${pool.escape(datos.mun)} 
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
















    //listar datos por formulario por hospital

    listarDatosFormularioPorHospital = async (datos) => {

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                    inner join mes m on m.id = v.mes
                    inner join entrada i on i.id_ = v.input
                    inner join establecimiento e on e.id = v.establecimiento
                    WHERE e.cod = ${pool.escape(datos.est)}  
                    and v.variable = ${pool.escape(datos.variable)}  
                    and v.gestion = ${pool.escape(datos.gestion)}   and m.num >= ${pool.escape(datos.mes1)}  and m.num <= ${pool.escape(datos.mes2)}  and i.estado = 1
                    GROUP by v.input order by i.ordengen asc;`;
        // console.log(sql1)
        const [rows1] = await pool.query(sql1)
        // console.log(rows1, 'datos de la pirmera lista')

        const sql2 =
            `SELECT ip.id_ as input, ind.id as indicador, 0 as valor
            FROM  entrada ip 
            inner join indicador ind on ind.id = ip.indicador_
            where ip.variable =${pool.escape(datos.variable)} and ip.estado = 1 and ind.estado = 1
            ORDER BY ip.ordengen  ASC `;

        const [rows2] = await pool.query(sql2)
        return [rows1, rows2]
    }


    //listar datos por formulario consolidado por municipio



    listarDatosFormularioConsolidado = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                    inner join mes m on m.id = v.mes
                    inner join entrada i on i.id_ = v.input
                    inner join establecimiento e on e.id = v.establecimiento
                    inner join municipio mn on mn.id = e.municipio
                    inner join red r on r.id = mn.red
                    WHERE r.id = ${pool.escape(datos.sred)}  
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
        console.log(rows1, 'valores de input')

        return [rows1, rows2]
    }


































    //listar datos por formulario 

    listarDatosFormularioMunicipio = async (datos) => {

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                        inner join mes m on m.id = v.mes
                        inner join entrada i on i.id_ = v.input
                        inner join municipio mun on mun.id = v.mun
                        WHERE mun.id = ${pool.escape(datos.mun)}  
                        and v.variable = ${pool.escape(datos.variable)}  
                        and v.gestion = ${pool.escape(datos.gestion)}   and m.num >= ${pool.escape(datos.mes1)}  and m.num <= ${pool.escape(datos.mes2)}  and i.estado = 1
                        GROUP by v.input order by i.ordengen asc;`;
        // console.log(sql1)
        const [rows1] = await pool.query(sql1)
        console.log(rows1, 'datos de la pirmera lista')

        const sql2 =
            `SELECT ip.id_ as input, ind.id as indicador, 0 as valor
                FROM  entrada ip 
                inner join indicador ind on ind.id = ip.indicador_
                where ip.variable =${pool.escape(datos.variable)} and ip.estado = 1 and ind.estado = 1
                ORDER BY ip.ordengen  ASC `;

        const [rows2] = await pool.query(sql2)
        return [rows1, rows2]
    }

    listarDatosFormularioMunicipioConsolidado = async (datos) => {
        // console.log(datos, 'una variable')

        const sql1 =
            `select v.id, v.variable, v.indicador, v.input as idinput, i.input,  sum(v.valor) as valor from valor v
                        inner join mes m on m.id = v.mes
                        inner join entrada i on i.id_ = v.input
                        inner join municipio mn on mn.id = v.mun
                        inner join red r on r.id = mn.red
                        WHERE r.id = ${pool.escape(datos.sred)}  
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
        console.log(rows1, 'valores de input')

        return [rows1, rows2]
    }


}


