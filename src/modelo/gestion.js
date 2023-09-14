
import pool from './bdConfig.js'

export class Gestion {

    // METODOS

    listar = async () => {
        const sql =
            `SELECT g.id, g.gestion, g.estado, count(m.id) as meses FROM gestion g
            left join mes m on g.id = m.gestion
            where g.eliminado = false GROUP by g.id;`;
        const [rows] = await pool.query(sql)
        const sql_ =
            `SELECT count(id) as cantidad FROM gestion where eliminado = false`;
        const [rows_] = await pool.query(sql_)
        return [rows, rows_[0].cantidad]
    }



    insertar = async (datos) => {
        const sqlExists =
            `SELECT * FROM gestion WHERE gestion = ${pool.escape(datos.gestion)}`;

        const [result] = await pool.query(sqlExists)

        if (result.length === 0) {

            const [row] = await pool.query("INSERT INTO gestion SET  ?", datos)
            let codigo = row.insertId
            const sqlUpdate = `update gestion set codigo = ${pool.escape('T-' + codigo)} where id = ${pool.escape(codigo)}`
            await pool.query(sqlUpdate)
            return await this.listar()


        } else {
            return {
                existe: 1,
            }
        }
    }


    actualizar = async (datos) => {
        const sqlExists =
            `SELECT * FROM gestion WHERE gestion = ${pool.escape(datos.gestion)} and id != ${pool.escape(datos.id)}`;

        const [result] = await pool.query(sqlExists)

        if (result.length === 0) {

            const sql = `UPDATE gestion SET
                    gestion = ${pool.escape(datos.gestion)},
                    estado = ${pool.escape(datos.estado)},
                    modificado = ${pool.escape(datos.modificado)},
                    usuario = ${pool.escape(datos.usuario)}
                    WHERE id = ${pool.escape(datos.id)}`;

            const [resultado] = await pool.query(sql);
            if (resultado.affectedRows === 0) {
                return {
                    existe: 0,
                }
            }
            return await this.listar()

        } else {
            return {
                existe: 1,
            }
        }
    }

    activar = async (datos) => {
        const sql_ =
            `SELECT count(m.id) as meses, g.gestion FROM gestion g
            left join mes m on g.id = m.gestion
            where g.id = ${pool.escape(datos.id)}  GROUP by g.id;  `;
        const [rows_] = await pool.query(sql_)
        let gestion = rows_[0].gestion
        if (rows_[0].meses > 0) {
            const sql = `update gestion set estado = true, modificado = ${pool.escape(datos.modificado)}, usuario =${pool.escape(datos.usuario)}
                         WHERE id =  ${pool.escape(datos.id)}`;
            await pool.query(sql)
            return await this.listar()
        } else {
            let meses = [
            { mes: 'ENERO', ini: gestion + '-01-01 19:08:38', fin: gestion + '-01-10 19:08:38', modificado: datos.modificado, usuario: datos.usuario, gestion: datos.id },
            { mes: 'FEBRERO', ini: gestion + '-02-01 19:08:38', fin: gestion + '-02-10 19:08:38', modificado: datos.modificado, usuario: datos.usuario, gestion: datos.id },
            { mes: 'MARZO', ini: gestion + '-03-01 19:08:38', fin: gestion + '-03-10 19:08:38', modificado: datos.modificado, usuario: datos.usuario, gestion: datos.id },
            { mes: 'ABRIL', ini: gestion + '-04-01 19:08:38', fin: gestion + '-04-10 19:08:38', modificado: datos.modificado, usuario: datos.usuario, gestion: datos.id },
            { mes: 'MAYO', ini: gestion + '-05-01 19:08:38', fin: gestion + '-05-10 19:08:38', modificado: datos.modificado, usuario: datos.usuario, gestion: datos.id },
            { mes: 'JUNIO', ini: gestion + '-06-01 19:08:38', fin: gestion + '-06-10 19:08:38', modificado: datos.modificado, usuario: datos.usuario, gestion: datos.id },
            { mes: 'JULIO', ini: gestion + '-07-01 19:08:38', fin: gestion + '-07-10 19:08:38', modificado: datos.modificado, usuario: datos.usuario, gestion: datos.id },
            { mes: 'AGOSTO', ini: gestion + '-08-01 19:08:38', fin: gestion + '-08-10 19:08:38', modificado: datos.modificado, usuario: datos.usuario, gestion: datos.id },
            { mes: 'SEPTIEMBRE', ini: gestion + '-09-01 19:08:38', fin: gestion + '-09-10 19:08:38', modificado: datos.modificado, usuario: datos.usuario, gestion: datos.id },
            { mes: 'OCTUBRE', ini: gestion + '-10-01 19:08:38', fin: gestion + '-10-10 19:08:38', modificado: datos.modificado, usuario: datos.usuario, gestion: datos.id },
            { mes: 'NOVIEMBRE', ini: gestion + '-11-01 19:08:38', fin: gestion + '-11-10 19:08:38', modificado: datos.modificado, usuario: datos.usuario, gestion: datos.id },
            { mes: 'DICIEMBRE', ini: gestion + '-12-01 19:08:38', fin: gestion + '-12-10 19:08:38', modificado: datos.modificado, usuario: datos.usuario, gestion: datos.id }]

            meses.forEach(async e=>{
                await pool.query("INSERT INTO mes SET  ?", e)
            })
            const sql = `update gestion set estado = true, modificado = ${pool.escape(datos.modificado)}, usuario =${pool.escape(datos.usuario)}
                         WHERE id =  ${pool.escape(datos.id)}`;
            await pool.query(sql)
            return await this.listar()
        }
        
    }
    desactivar = async (datos) => {
        const sql = `update gestion set estado = false, modificado = ${pool.escape(datos.modificado)}, usuario =${pool.escape(datos.usuario)}
        WHERE id =  ${pool.escape(datos.id)}`;
        await pool.query(sql)
        return await this.listar()
    }
}