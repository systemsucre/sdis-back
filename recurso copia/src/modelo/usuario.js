
import pool from './bdConfig.js'

export class Usuario {

    // METODOS


    listarActivos = async (id, cantidad) => {

        const sql =
            `SELECT u.id, concat(u.nombre,' ',
            u.apellido1) as titular, u.celular, e.establecimiento as hospital, u.username, u.estado, u.eliminado
            from usuario u 
            inner join establecimiento e on e.id = u.establecimiento
            where u.estado = 1 and u.id != ${pool.escape(id)}
            ORDER by u.id DESC limit ${pool.escape(cantidad)}`;
        // console.log('ok', sql)
        const [rows] = await pool.query(sql)
        const cant =
            `SELECT count(id) as cantidad from usuario
            where estado = 1 and id != ${pool.escape(id)}
            `;
        const [cat1] = await pool.query(cant)
        // console.log(rows, 'lista')
        return [rows, cat1[0].cantidad]
    }

    listarNoActivos = async (id, cantidad) => {
        const sql =
            `SELECT u.id, concat(u.nombre,' ',
            u.apellido1) as titular, u.celular, e.establecimiento as hospital, u.username, u.estado, u.eliminado
            from usuario u 
            inner join establecimiento e on e.id = u.establecimiento
            where u.estado = 0 and u.id != ${pool.escape(id)}
            ORDER by u.id DESC limit ${pool.escape(cantidad)}`;
        const [rows] = await pool.query(sql)
        const cant =
            `SELECT count(id) as cantidad from usuario
            where estado = 0 and id != ${pool.escape(id)}
            `;
        const [cat1] = await pool.query(cant)
        // console.log(rows, 'lista')
        return [rows, cat1[0].cantidad]
    }
    ver = async (id) => {
        let sqlUser = `select u.id, u.nombre, u.apellido1, 
            u.apellido2,u.username,  u.correo,u.eliminado,
            u.celular, 
            u.estado,
            r.id as idrol, r.rol as rol, e.id as idestablecimiento, e.establecimiento
            from usuario u
            inner join establecimiento e on e.id = u.establecimiento
            left join rol r on r.id = u.rol
            where u.id = ${pool.escape(id)}`

        const [result] = await pool.query(sqlUser)
        // console.log(result)

        return result
    }

    listarRol = async () => {
        const sql =
            `SELECT id as id, rol as nombre from rol`;
        const [rows] = await pool.query(sql)
        return rows
    }

    listarHospital = async () => {
        const sql =
            `SELECT id, establecimiento as nombre from establecimiento where eliminado = false order by establecimiento asc`;
        const [rows] = await pool.query(sql)
        return rows
    }











    buscar = async (dato, user) => {
        // console.log('los datos han llegado', dato)
        const sql =
            `SELECT u.id, concat(u.nombre,' ',
            u.apellido1) as titular, u.celular, e.establecimiento as hospital, u.username, u.estado 
            from usuario u 
            inner join establecimiento e on e.id = u.establecimiento
            where (u.nombre like '${dato}%' or
            u.correo like '${dato}%' or
            u.apellido1  like '${dato}%' or
            u.apellido2  like '${dato}%') and estado = 1 and u.id != ${pool.escape(user)}
            ORDER by u.id`;
        const [rows] = await pool.query(sql)
        return rows
    }
    buscar_ = async (dato, user) => {
        // console.log('los datos han llegado', dato)
        const sql =
            `SELECT u.id, concat(u.nombre,' ',
            u.apellido1) as titular, u.celular, e.establecimiento as hospital, u.username, u.estado 
            from usuario u 
            inner join establecimiento e on e.id = u.establecimiento
            where (u.nombre like '${dato}%' or
            u.correo like '${dato}%' or
            u.apellido1  like '${dato}%' or
            u.apellido2  like '${dato}%') and estado = 0 and u.id != ${pool.escape(user)}
            ORDER by u.id`;
        const [rows] = await pool.query(sql)
        return rows
    }
    listarSiguiente = async (id, user, cantidad) => {
        const sql =
            `SELECT u.id, concat(u.nombre,' ',
            u.apellido1) as titular, u.celular, e.establecimiento as hospital, u.username, u.estado 
            from usuario u 
            inner join establecimiento e on e.id = u.establecimiento
            where  u.estado = 1 and u.id != ${pool.escape(user)}
            and u.id < ${pool.escape(id)} ORDER by id DESC  limit ${pool.escape(cantidad)}`;
        const [rows] = await pool.query(sql)
        return rows
    }
    listarAnterior = async (id, user, cantidad) => {
        const sql =
            `SELECT u.id, concat(u.nombre,' ',
            u.apellido1) as titular, u.celular, e.establecimiento as hospital, u.username, u.estado 
            from usuario u 
            inner join establecimiento e on e.id = u.establecimiento
            
            WHERE u.id > ${pool.escape(id)} and u.estado = 1  and u.id != ${pool.escape(user)}
            limit ${pool.escape(cantidad)}`;
        const [rows] = await pool.query(sql)
        rows.reverse()
        return rows
    }

    listarSiguiente_ = async (id, user, cantidad) => {
        const sql =
            `SELECT u.id, concat(u.nombre,' ',
            u.apellido1) as titular, u.celular, e.establecimiento as hospital, u.username, u.estado 
            from usuario u 
            inner join establecimiento e on e.id = u.establecimiento
            where  u.estado = 0 and u.id != ${pool.escape(user)}
            and u.id < ${pool.escape(id)} ORDER by id DESC  limit ${pool.escape(cantidad)}`;
        const [rows] = await pool.query(sql)
        return rows
    }
    listarAnterior_ = async (id, user, cantidad) => {
        const sql =
            `SELECT u.id, concat(u.nombre,' ',
            u.apellido1) as titular, u.celular, e.establecimiento as hospital, u.username, u.estado 
            from usuario u 
            inner join establecimiento e on e.id = u.establecimiento
            
            WHERE u.id > ${pool.escape(id)} and u.estado = 0  and u.id != ${pool.escape(user)}
            limit ${pool.escape(cantidad)}`;
        const [rows] = await pool.query(sql)
        rows.reverse()
        return rows
    }











    insertar = async (datos, cantidad) => {

        const sqlexisteusername =
            `SELECT username from usuario where
                username = ${pool.escape(datos.username)}`;
        const [rows] = await pool.query(sqlexisteusername)

        if (rows.length === 0) {
            const sqlexisteC =
                `SELECT correo from usuario where
                correo = ${pool.escape(datos.correo)} and correo != 'example@sdis.ve'`;
            const [rowsCorreo] = await pool.query(sqlexisteC)

            if (rowsCorreo.length === 0) {
                await pool.query("INSERT INTO usuario SET  ?", datos)
                return await this.listarActivos(datos.usuario, cantidad)
            } else return { existe: 2 }
        }
        else return { existe: 1 }
    }


    actualizar = async (datos) => {

        const sqlexisteusername =
            `SELECT username from usuario where
                username = ${pool.escape(datos.username)} and id != ${pool.escape(datos.id)}`;
        const [rows] = await pool.query(sqlexisteusername)

        if (rows.length === 0) {
            const sqlexisteCi =
                `SELECT correo from usuario where
                correo = ${pool.escape(datos.correo)} and id != ${pool.escape(datos.id)} and correo != 'example@sdis.ve'`;
            const [rowsCi] = await pool.query(sqlexisteCi)

            if (rowsCi.length === 0) {
                const sql = `UPDATE usuario SET
                rol = ${pool.escape(datos.rol)},
                establecimiento = ${pool.escape(datos.hospital)},
                nombre = ${pool.escape(datos.nombre)},
                apellido1 = ${pool.escape(datos.ape1)},
                apellido2 = ${pool.escape(datos.ape2)},
                celular = ${pool.escape(datos.celular)},
                correo = ${pool.escape(datos.correo)},
                eliminado=${pool.escape(datos.estado)},
                modificado = ${pool.escape(datos.modificado)},
                usuario = ${pool.escape(datos.usuario)}
                WHERE id = ${pool.escape(datos.id)}`;

                await pool.query(sql)
                const sesion =
                    `delete from sesion where
                    usuario = ${pool.escape(datos.id)}`;
                await pool.query(sesion)

                return await this.ver(datos.id)
            } else return { existe: 2 }
        }
        else return { existe: 1 }
    }


    registrarme = async (datos) => {

        const sqlexisteusername =
            `SELECT username from usuario where
                username = ${pool.escape(datos.username)}`;
        const [rows] = await pool.query(sqlexisteusername)

        if (rows.length === 0) {
            const sqlexisteCorreo =
                `SELECT correo from usuario where
                correo = ${pool.escape(datos.correo)} and correo != 'example@sdis.ve'`;
            const [rowsCorreo] = await pool.query(sqlexisteCorreo)

            if (rowsCorreo.length === 0) {
                const resultado = await pool.query("INSERT INTO usuario SET  ?", datos)
                return resultado
            } else return { existe: 2 }
        }
        else return { existe: 1 }
    }





    cambiarMiContraseña = async (datos) => {
        const sqlExists = `SELECT * FROM usuario WHERE 
            pass = ${pool.escape(datos.pass1)} 
            and id = ${pool.escape(datos.usuario)}`;
        const [result] = await pool.query(sqlExists)

        if (result.length > 0) {

            const sql = `UPDATE usuario SET
                pass = ${pool.escape(datos.pass2)}, modificado = ${pool.escape(datos.modificado)}, usuario = ${pool.escape(datos.usuario)}
                WHERE id = ${pool.escape(datos.usuario)}`;

            await pool.query(sql);
            return true

        } else return false
    }



    recet = async (datos) => {
        const sqlExists = `delete from sesion where
            usuario = ${pool.escape(datos.id)}`;
        await pool.query(sqlExists)

        const sql = `UPDATE usuario SET
                pass = ${pool.escape(datos.otros)},
                usuario = ${pool.escape(datos.usuario)},
                modificado = ${pool.escape(datos.modificado)}
                WHERE id = ${pool.escape(datos.id)}`;
        await pool.query(sql);
        const sesion =
            `delete from sesion where
                    usuario = ${pool.escape(datos.id)}`;
        await pool.query(sesion)
        return true
    }

    validar = async (datos) => {

        const sqlexisteusername =
            `SELECT username from usuario where
                username = ${pool.escape(datos.username)} and id != ${pool.escape(datos.id)}`;
        const [rows] = await pool.query(sqlexisteusername)

        if (rows.length === 0) {
            const sqlexisteCi =
                `SELECT correo from usuario where
                correo = ${pool.escape(datos.correo)} and id != ${pool.escape(datos.id)} and correo != 'example@sdis.ve'`;
            const [rowsCi] = await pool.query(sqlexisteCi)

            if (rowsCi.length === 0) {
                const sql = `UPDATE usuario SET
                rol = ${pool.escape(datos.rol)},
                establecimiento = ${pool.escape(datos.hospital)},
                nombre = ${pool.escape(datos.nombre)},
                apellido1 = ${pool.escape(datos.ape1)},
                apellido2 = ${pool.escape(datos.ape2)},
                celular = ${pool.escape(datos.celular)},
                correo = ${pool.escape(datos.correo)},
                estado=1,
                modificado = ${pool.escape(datos.modificado)},
                usuario = ${pool.escape(datos.usuario)}
                WHERE id = ${pool.escape(datos.id)}`;

                await pool.query(sql)
                const sesion =
                    `delete from sesion where
                    usuario = ${pool.escape(datos.id)}`;
                await pool.query(sesion)
                return await this.listarNoActivos(datos.usuario, datos.cantidad)
            } else return { existe: 2 }
        } else return { existe: 2 }

    }



    actualizarMiPerfil = async (datos) => {
        const sqlExists = `SELECT * FROM usuario WHERE 
            correo = ${pool.escape(datos.correo)} 
            and id !=${pool.escape(datos.usuario)}`;
        const [result] = await pool.query(sqlExists)
        if (result.length === 0) { 

            const sql = `UPDATE usuario SET
            nombre = ${pool.escape(datos.nombre)},
            apellido1 = ${pool.escape(datos.ape1)},
            apellido2 = ${pool.escape(datos.ape2)},
            celular = ${pool.escape(datos.celular)},
            correo = ${pool.escape(datos.correo)},
            modificado = ${pool.escape(datos.modificado)},
            usuario = ${pool.escape(datos.usuario)}
            WHERE id = ${pool.escape(datos.usuario)}`;
            await pool.query(sql);
            return await this.miPerfil(datos.usuario)
        } else return { existe: 1 }
    }

    miPerfil = async (id) => {
        let sqlUser = `select u.id, u.nombre, u.apellido1, 
            u.apellido2,u.username, u.correo,
            u.celular, 
            u.estado,
            r.rol as rol,  e.establecimiento
            from usuario u
            inner join establecimiento e on e.id = u.establecimiento
            left join rol r on r.id = u.rol
            where u.id = ${pool.escape(id)}`
        const [rows] = await pool.query(sqlUser)
        return rows
    }

}