
import pool from './bdConfig.js'

export class Mes {


    // METODOS

    listarInicio = async (gestion) => {
        const sql =
            `SELECT m.id, concat(m.mes," (",g.gestion,")") as mes ,m.estado, DATE_FORMAT(m.ini,"%Y-%m-%d %H:%m:%s") as ini,  DATE_FORMAT(m.fin,"%Y-%m-%d %H:%m:%s") as fin 
            FROM mes m
            inner join gestion g on g.id = m.gestion
            where m.eliminado =  false and g.gestion = ${pool.escape(gestion)} ORDER BY m.ini ASC`;
        const [rows] = await pool.query(sql)
        const sql_ =
            `SELECT count(m.id) as cantidad FROM mes m 
            inner join gestion g on g.id = m.gestion
            where m.eliminado =  false and g.gestion = ${pool.escape(gestion)} `;
        const [rows_] = await pool.query(sql_)
        return [rows, rows_[0].cantidad]
    }

    listarGestion = async () => {
        const sql =
            `SELECT id, gestion as nombre FROM gestion where estado = 1 and eliminado = false ORDER BY id ASC `;
        const [rows] = await pool.query(sql)
        return rows
    }

    listar = async (gestion) => {
        const sql =
            `SELECT m.id, concat(m.mes," (",g.gestion,")") as mes ,m.estado, DATE_FORMAT(m.ini,"%Y-%m-%d %H:%m:%s") as ini,  DATE_FORMAT(m.fin,"%Y-%m-%d %H:%m:%s") as fin 
            FROM mes m
            inner join gestion g on g.id = m.gestion
            where m.eliminado =  false and g.id = ${pool.escape(gestion)} ORDER BY m.ini ASC`;
        const [rows] = await pool.query(sql)
        const sql_ =
            `SELECT count(m.id) as cantidad FROM mes m 
            inner join gestion g on g.id = m.gestion
            where m.eliminado =  false and g.id = ${pool.escape(gestion)}`;
        const [rows_] = await pool.query(sql_)
        return [rows, rows_[0].cantidad]
    }

    insertar = async (datos) => {
        const mes =
            `SELECT * from mes where
                mes = ${pool.escape(datos.mes)}`;
        const [rowsmes] = await pool.query(mes)
        if (rowsmes.length === 0) {

            await pool.query("INSERT INTO mes SET  ?", datos)

            return await this.listar()

        } else {
            return { existe: 2 }
        }

    }


    buscar = async (dato) => {
        const sql =
            `SELECT m.id, concat(m.mes," (",g.gestion,")") as mes ,m.estado, DATE_FORMAT(m.ini,"%Y-%m-%d %H:%m:%s") as ini, 
             DATE_FORMAT(m.fin,"%Y-%m-%d %H:%m:%s") as fin 
            FROM mes m where m.mes like "${dato}%" and eliminado = false`;
        // console.log(sql)
        const [rows] = await pool.query(sql)
        // console.log(rows, 'registro en el modelos')

        return rows
    }


    actualizar = async (datos) => {
        const sql_ = `select g.id from gestion g inner join mes m on g.id = m.gestion
        WHERE m.id =  ${pool.escape(datos.id)}`;
        let [gestion] = await pool.query(sql_)

        const sql = `UPDATE mes SET
                ini = ${pool.escape(datos.f1 + ' ' + datos.h1)},
                fin = ${pool.escape(datos.f2 + ' ' + datos.h2)},
                modificado = ${pool.escape(datos.modificado)},
                usuario = ${pool.escape(datos.usuario)}
                WHERE id = ${pool.escape(datos.id)}`;
        await pool.query(sql);

        return await this.listar(gestion[0].id)

    }

    activar = async (datos) => {
        const sql_ = `select g.id from gestion g inner join mes m on g.id = m.gestion
        WHERE m.id =  ${pool.escape(datos.id)}`;
        let [gestion] = await pool.query(sql_)

        const sql = `update mes set estado = true, modificado=${pool.escape(datos.modificado)}, usuario=${pool.escape(datos.usuario)}
        WHERE id =  ${pool.escape(datos.id)}`;
        await pool.query(sql)
        return await this.listar(gestion[0].id)
    }
    desactivar = async (datos) => {
        const sql_ = `select g.id from gestion g inner join mes m on g.id = m.gestion
        WHERE m.id =  ${pool.escape(datos.id)}`;
        let [gestion] = await pool.query(sql_)
        const sql = `update mes set estado = false, modificado=${pool.escape(datos.modificado)}, usuario=${pool.escape(datos.usuario)}
        WHERE id =  ${pool.escape(datos.id)}`;
        await pool.query(sql)
        return await this.listar(gestion[0].id)
    }

}