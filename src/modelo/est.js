
import pool from './bdConfig.js'

export class Est {


    listar = async (cantidad) => {
        const sql =
            `SELECT e.id, e.establecimiento,e.cod, m.municipio, m.id as idmunicipio,   s.id as idssector, s.ssector, e.eliminado FROM establecimiento e
            inner join municipio m on m.id = e.municipio
            inner join ssector s on s.id = e.ssector
         order by e.id desc limit ${pool.escape(cantidad)}`;
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
        const sql1 =
            `SELECT id, ssector as nombre FROM ssector`
        const [rows1] = await pool.query(sql1)


        return [rows, rows1]
    }


    insertar = async (datos, cantidad) => {

        const sqlExists = `SELECT * FROM establecimiento WHERE establecimiento = ${pool.escape(datos.establecimiento)}`;
        const [result] = await pool.query(sqlExists)

        if (result.length === 0) {
            const [result] = await pool.query("INSERT INTO establecimiento SET  ?", datos)
            if (result.insertId > 0) {
                let cod = 'H-' + result.insertId
                const sql_ = `UPDATE establecimiento SET
                            cod = ${pool.escape(cod)}
                            WHERE id = ${pool.escape(result.insertId)}`;
                await pool.query(sql_);
                return await this.listar(cantidad)
            } else return { existe: 1 }

        } else {
            return {
                existe: 1,
            }
        }
    }

    actualizar = async (datos) => {
        const sqlExists =
            `SELECT * FROM establecimiento WHERE establecimiento = ${pool.escape(datos.establecimiento)} and id !=${pool.escape(datos.id)}`;
        const [result] = await pool.query(sqlExists)
        if (result.length === 0) {

            const sql_ = `UPDATE establecimiento SET
                        municipio = ${pool.escape(datos.municipio)},
                        establecimiento = ${pool.escape(datos.establecimiento)},
                        ssector = ${pool.escape(datos.ssector)},
                        modificado = ${pool.escape(datos.modificado)},
                        usuario = ${pool.escape(datos.usuario)},
                        eliminado = ${pool.escape(datos.estado)}
                        WHERE id = ${pool.escape(datos.id)}`;
            await pool.query(sql_);

            if (datos.estado == 1) {
                const sqlUsers =
                    `SELECT u.id FROM usuario u 
                inner join establecimiento e on e.id = u.establecimiento 
                WHERE id = ${pool.escape(datos.id)}`;
                const [result] = await pool.query(sqlUsers)
                result.forEach(async e => {
                    const sqlUsers =
                        `update usuario set estado = 0 where  id =  ${pool.escape(e.id)}`;
                    await pool.query(sqlUsers)
                    const sqlSesion =
                        `delete from sesion where  usuario =  ${pool.escape(e.id)}`;
                    await pool.query(sqlSesion)
                })
            }
            return await this.listar(datos.cantidad)

        } else { return { existe: 1 } }
    }




    listarSiguiente = async (id, cantidad) => {
        // console.log(id, 'siguiente')
        const sql =
            `SELECT e.id, e.establecimiento,e.cod,  m.municipio,  m.id as idmunicipio,  s.id as idssector, s.ssector, e.eliminado FROM establecimiento e
            inner join municipio m on m.id = e.municipio
            inner join ssector s on s.id = e.ssector
            WHERE e.id < ${pool.escape(id)} ORDER by e.id DESC  limit ${pool.escape(cantidad)}`;
        const [rows] = await pool.query(sql)
        return rows
    }



    listarAnterior = async (id, cantidad) => {
        console.log(id, 'llamanda funcion anterior establecimientos')

        const sql =
            `SELECT e.id, e.establecimiento,e.cod, m.municipio, m.id as idmunicipio,  s.id as idssector, s.ssector, e.eliminado FROM establecimiento e
            inner join municipio m on m.id = e.municipio
            inner join ssector s on s.id = e.ssector
            WHERE e.id > ${pool.escape(id)} limit ${pool.escape(cantidad)}`;
        const [rows] = await pool.query(sql)
        rows.reverse()
        return rows
    }







    buscar = async (dato) => {
        const sql =
            `SELECT e.id, e.establecimiento, e.cod, m.municipio,  m.id as idmunicipio, s.id as idssector, s.ssector, e.eliminado FROM establecimiento e
            inner join municipio m on m.id = e.municipio
            inner join ssector s on s.id = e.ssector
            where e.establecimiento like '${dato}%'`;
        const [rows] = await pool.query(sql)
        return rows
    }

}