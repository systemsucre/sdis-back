
import pool from './bdConfig.js'

export class Est {


    listar = async () => {
        const sql =
            `SELECT e.id, e.establecimiento, m.municipio, r.id as idrol, r.rol, m.id as idmunicipio FROM establecimiento e
            inner join municipio m on m.id = e.municipio
            inner join rol r on r.id = e.rol
            where e.eliminado = 0
         ORDER by e.id DESC limit 10`;
        const [rows] = await pool.query(sql)

        const sql_ =
            `SELECT count(id) as cantidad from establecimiento where eliminado = false`;
        const [rows_] = await pool.query(sql_)

        return [rows, rows_[0].cantidad]
    }

    listarMunic = async () => {
        const sql =
            `SELECT id, municipio as nombre FROM municipio;`
        const [rows] = await pool.query(sql)

        const sql_ =
            `SELECT id, rol as nombre FROM rol where nivel >1;`
        const [rows_] = await pool.query(sql_)

        return [rows, rows_]
    }


    insertar = async (datos) => {
        const sqlExists = `SELECT * FROM establecimiento WHERE establecimiento = ${pool.escape(datos.establecimiento)}`;

        const [result] = await pool.query(sqlExists)

        if (result.length === 0) {
            await pool.query("INSERT INTO establecimiento SET  ?", datos)
            return await this.listar()
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
            const data = {
                municipio: datos.municipio, rol: datos.nivel,
                establecimiento: datos.establecimiento, creado: datos.modificado, modificado: datos.modificado, usuario: datos.usuario
            }
            const nuevo = await pool.query("INSERT INTO establecimiento SET  ?", data)

            let idNuevo = nuevo[0].insertId
            if (idNuevo) {
                const sql = `UPDATE usuario SET
                        establecimiento = ${pool.escape(idNuevo)},
                        rol = ${pool.escape(datos.nivel)}
                        WHERE establecimiento = ${pool.escape(datos.id)}`;
                pool.query(sql);

                const sesion = `select u.id from usuario u 
                        inner join establecimiento e on e.id=u.establecimiento
                        WHERE e.id = ${pool.escape(datos.id)}`;
                const [fs] = await pool.query(sesion);

                fs.forEach(e => {
                    const sqldelete = `delete from sesion
                        WHERE usuario = ${pool.escape(e.id)}`;
                    pool.query(sqldelete);
                })

                const sql_ = `UPDATE establecimiento SET
                        eliminado = true
                        WHERE id = ${pool.escape(datos.id)}`;
                await pool.query(sql_);
                return await this.listar()

            } else { return { existe: 2 } }
        } else { return { existe: 1 } }
    }




    listarSiguiente = async (id) => {
        const sql =
            `SELECT e.id, e.establecimiento,  m.municipio, r.id as idrol, r.rol, m.id as idmunicipio FROM establecimiento e
            inner join municipio m on m.id = e.municipio
            inner join rol r on r.id = e.rol
            WHERE e.id < ${pool.escape(id)} and e.eliminado = false ORDER by e.id DESC  limit 7`;
        const [rows] = await pool.query(sql)
        return rows
    }



    listarAnterior = async (id) => {
        const sql =
            `SELECT e.id, e.establecimiento, m.municipio, r.id as idrol,  r.rol, m.id as idmunicipio FROM establecimiento e
            inner join municipio m on m.id = e.municipio
            inner join rol r on r.id = e.rol
            WHERE e.id > ${pool.escape(id)} and e.eliminado = false limit 7`;
        const [rows] = await pool.query(sql)
        rows.reverse()
        return rows
    }







    buscar = async (dato) => {
        const sql =
            `SELECT e.id, e.establecimiento,  m.municipio, r.id as idrol,  r.rol, m.id as idmunicipio FROM establecimiento e
            inner join municipio m on m.id = e.municipio
            inner join rol r on r.id = e.rol
            where e.establecimiento like '${dato}%' and e.eliminado = false`;
        const [rows] = await pool.query(sql)
        return rows
    }



    eliminar = async (id) => {
        const sql = `update establecimiento set eliminado = true
        WHERE id =  ${pool.escape(id)}`;
        await pool.query(sql)
        return await this.listar()
    }

}