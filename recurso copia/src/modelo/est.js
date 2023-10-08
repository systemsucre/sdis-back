
import pool from './bdConfig.js'

export class Est {


    listar = async (cantidad) => {
        const sql =
            `SELECT e.id, e.establecimiento, m.municipio, m.id as idmunicipio, e.eliminado FROM establecimiento e
            inner join municipio m on m.id = e.municipio
         order by e.establecimiento asc limit ${pool.escape(cantidad)}`;
        const [rows] = await pool.query(sql)

        const sql_ =
            `SELECT count(id) as cantidad from establecimiento where eliminado = false`;
        const [rows_] = await pool.query(sql_)
        console.log(rows_, cantidad, 'lista')
        return [rows, rows_[0].cantidad]
    }

    listarMunic = async () => {
        const sql =
            `SELECT id, municipio as nombre FROM municipio;`
        const [rows] = await pool.query(sql)

        return rows
    }


    insertar = async (datos, cantidad) => {

        const sqlExists = `SELECT * FROM establecimiento WHERE establecimiento = ${pool.escape(datos.establecimiento)}`;
        const [result] = await pool.query(sqlExists)

        if (result.length === 0) {
            await pool.query("INSERT INTO establecimiento SET  ?", datos)
            return await this.listar(cantidad)
        } else {
            return {
                existe: 1,
            }
        }
    }

    actualizar = async (datos) => {
        const sqlExists =
            `SELECT * FROM establecimiento WHERE establecimiento = ${pool.escape(datos.establecimiento)} and id !=${pool.escape(datos.id)} and eliminado = 0 `;
        const [result] = await pool.query(sqlExists)
        if (result.length === 0) {

            const sql_ = `UPDATE establecimiento SET
                        municipio = ${pool.escape(datos.municipio)},
                        establecimiento = ${pool.escape(datos.establecimiento)},
                        modificado = ${pool.escape(datos.modificado)},
                        usuario = ${pool.escape(datos.usuario)},
                        eliminado = ${pool.escape(datos.estado)}
                        WHERE id = ${pool.escape(datos.id)}`;
            await pool.query(sql_);
            return await this.listar(datos.cantidad)

        } else { return { existe: 1 } }
    }




    listarSiguiente = async (id, cantidad) => {
        // console.log(id, 'siguiente')
        const sql =
            `SELECT e.id, e.establecimiento,  m.municipio,  m.id as idmunicipio, e.eliminado FROM establecimiento e
            inner join municipio m on m.id = e.municipio
            WHERE e.id < ${pool.escape(id)} ORDER by e.id DESC  limit ${pool.escape(cantidad)}`;
        const [rows] = await pool.query(sql)
        return rows
    }



    listarAnterior = async (id, cantidad) => {
        // console.log(id, 'anterior')

        const sql =
            `SELECT e.id, e.establecimiento, m.municipio, m.id as idmunicipio, e.eliminado FROM establecimiento e
            inner join municipio m on m.id = e.municipio
            WHERE e.id > ${pool.escape(id)} order by e.id asc limit ${pool.escape(cantidad)}`;
        const [rows] = await pool.query(sql)
        rows.reverse()
        return rows
    }







    buscar = async (dato) => {
        const sql =
            `SELECT e.id, e.establecimiento,  m.municipio,  m.id as idmunicipio, e.eliminado FROM establecimiento e
            inner join municipio m on m.id = e.municipio
            where e.establecimiento like '${dato}%'`;
        const [rows] = await pool.query(sql)
        return rows
    }

}