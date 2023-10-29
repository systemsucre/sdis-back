import express from "express";
import pool from '../modelo/bdConfig.js'
import { KEY, CLAVEGMAIL } from '../config.js'

import jwt from 'jsonwebtoken'
// Admiministrador

import est from "../controlador/est.js";
import usuario from "../controlador/usuario.js";
import gestion from "../controlador/gestion.js";
import miPerfil from '../controlador/miPerfil.js'

import mes from '../controlador/mes.js'
import variable from '../controlador/variable.js'

// ESTABLECIMIENTOS
import formulario5 from '../controlador/formulario/formulario5.js'
import reportes5 from '../controlador/reportes5.js'


//MUNICIPIOS
import formulario4 from '../controlador/formulario/formulario4.js'
import reportes4 from '../controlador/reportes4.js'
import opinf4 from '../controlador/opein/opeinf4.js'


//RED
import formulario3 from '../controlador/formulario/formulario3.js'
import reportes3 from '../controlador/reportes3.js'
import opinf3 from '../controlador/opein/opeinf3.js'

// AREA
import formulario6 from '../controlador/formulario/formulario6.js'
import reportes6 from '../controlador/reportes6.js'
import opinf6 from '../controlador/opein/opeinf6.js'




// SEDES
import formulario2 from '../controlador/formulario/formulario2.js'
import reportes2 from '../controlador/reportes2.js'
import opinf2 from '../controlador/opein/opeinf2.js'


// archivos publicos
import rutasPublicas from "../controlador/Public/public.js";




import nodemailer from "nodemailer";

const rutas = express();

// +*********************************************************** login****************************************


// ruta de autentidicacion
rutas.get('/', async (req, res) => {

    try {
        const sql = `SELECT p.id, UPPER(r.rol) as rol, r.nivel as numero, p.variable,
        p.username, concat(UPPER(left(p.nombre,1)),LOWER(SUBSTRING(p.nombre,2))) as nombre, 
        concat(UPPER(left(p.apellido1,1)),LOWER(SUBSTRING(p.apellido1,2))) as apellido, p.apellido1, p.apellido2,
        m.id as idmunicipio, m.municipio, e.id as idestablecimiento, e.establecimiento, re.id as idred, re.red as red, ss.ssector, a.variable as area
        from usuario p 
        inner join rol r on p.rol = r.id
        left join establecimiento e on e.id = p.establecimiento
        left join ssector ss on ss.id = e.ssector
        left join municipio m on m.id = p.mun
        left join red re on re.id = p.red
        left join variable a on a.id = p.variable
        where p.username = ${pool.escape(req.query.intel)} and p.pass = ${pool.escape(req.query.viva)} and p.estado = 1 and p.eliminado = 0`;
        const [result] = await pool.query(sql)
        // console.log(result, 'iniciio de sesion', sql)
        if (result.length === 1) {

            let fecha = new Date();
            const payload = {
                "usuario": result[0].username,
                "ap1": result[0].apellido1,
                "ap2": result[0].apellido2,
                "name": result[0].nombre,
                "municipio": result[0].municipio,
                "esta": result[0].establecimiento,
                "red": result[0].idred,
                "fecha": fecha,
            }
            const token = jwt.sign(payload, KEY, {
                expiresIn: "14d"
            })

            const usuario = result[0].id

            const datos = {
                token,
                usuario,
                est: result[0].idestablecimiento,
                mun: result[0].idmunicipio,
                red: result[0].idred,
                var: result[0].variable,
                numero: result[0].numero
            }

            const [sesion] = await pool.query(`INSERT INTO sesion SET ?`, datos)
            // console.log('dentro del bloque', sesion)

            if (sesion.insertId > 0) {
                return res.json({
                    'token': token,
                    'username': result[0].username,
                    'nombre': result[0].nombre,
                    'apellido': result[0].apellido,
                    'rol': result[0].rol,
                    'numRol': result[0].numero,
                    "establecimiento": result[0].establecimiento,
                    "municipio": result[0].municipio,
                    "red": result[0].red,
                    "ssector": result[0].ssector,
                    "area": result[0].area,
                    ok: true,
                    msg: 'Acceso correcto'
                })
            }
            else {
                return res.json({ msg: 'Intente nuevamente ', ok: false })
            }
        }
        else {
            return res.json({ msg: 'El usuario no existe !', ok: false })
        }
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'El servidor no responde !', ok: false })
    }
})


rutas.post('/logout', (req, res) => {
    try {
        const sql = `delete from sesion where token = ${pool.escape(req.body.token)} `
        pool.query(sql)
    } catch (error) {

    }

})



rutas.get('/listarestablecimiento', async (req, res) => {
    try {
        const sql =
            `SELECT id, establecimiento as nombre FROM establecimiento where eliminado = false order by establecimiento asc`;
        const [rows] = await pool.query(sql)
        return res.json(rows)
    } catch (error) {

    }

})

rutas.get('/olvideMiContrasena', async (req, res) => {
    // console.log('llego', req.query.correo)
    let correo = req.query.correo
    const sqlInfo = `SELECT correo, nombre, apellidoPaterno, apellidoMaterno from usuario where correo = ${pool.escape(correo)}`;
    const [info] = await pool.query(sqlInfo)
    const sqlInfoHospital = `SELECT correo from hospital`;
    const [infoHospital] = await pool.query(sqlInfoHospital)

    // console.log(info[0].correo !== undefined)
    if (info.length === 1 && infoHospital.length === 1) {



        let ale = Math.floor((Math.random() * (10000 - 1000 + 1)) + 1000);
        const sql = `UPDATE usuario SET
        codigo = ${pool.escape(ale)}
        WHERE correo = ${pool.escape(correo)}`;
        const [info1] = await pool.query(sql)


        if (info1.affectedRows > 0) {

            let jConfig = {
                "host": "smtp.gmail.com",
                "port": "465",
                "secure": true,
                "auth": {
                    "user": infoHospital[0].correo,
                    "pass": CLAVEGMAIL
                }
            };
            console.log(infoHospital[0].correo, 'correo electronico')
            let email = {
                from: infoHospital[0].correo,  //remitente
                to: info[0].correo,  //destinatario
                subject: "CODIGO DE RECUPRACION",  //asunto del correo
                html: ` 
                    <div> 
                    <p>Hola ${info[0].nombre + ' ' + info[0].apellidoPaterno + ' ' + info[0].apellidoMaterno} </p> 
                    <p>Esto es su codigo de recupracion de su contraseña</p> 
                    <h4>${ale}</h4> 
                    </div> 
                `
            };

            let createTransport = nodemailer.createTransport(jConfig);
            createTransport.sendMail(email, function (error, info) {
                if (error) {
                    res.json({ ok: false, msg: "Error al enviar email" });
                } else {
                    res.json({ ok: true, msg: "Correo enviado correctamente" });
                }
                createTransport.close();
            });
        }
    }
    else {
        res.json({ ok: false, msg: 'CORREO NO REGISTRADO' })
    }
})

rutas.get('/codigo', async (req, res) => {
    console.log('llego', req.query.correo, req.query.codigo)
    let correo = req.query.correo
    let codigo = req.query.codigo
    const sqlInfo = `SELECT correo, nombre, apellidoPaterno, apellidoMaterno, codigo from usuario where correo = ${pool.escape(correo)} and codigo = ${pool.escape(codigo)}`;
    const [info] = await pool.query(sqlInfo)
    if (info.length === 1) {
        res.json({ ok: true });
    }
    else {
        res.json({ ok: false, msg: 'EL CODIGO QUE INGRESO NO ES EL CORRECTO' })
    }
})
rutas.get('/nuevaContrasena', async (req, res) => {
    console.log('llego', req.query.correo, req.query.pass)
    let correo = req.query.correo
    let pass = req.query.pass
    const sql = `UPDATE usuario SET
    pass = ${pool.escape(pass)}
    WHERE correo = ${pool.escape(correo)}`;
    const [info] = await pool.query(sql)
    console.log(info.affectedRows)
    if (info.affectedRows > 0) {
        res.json({ ok: true });
    }
    else {

        const sql = `UPDATE usuario SET
        codigo = ${pool.escape(null)}
        WHERE correo = ${pool.escape(correo)}`;
        await pool.query(sql)
        res.json({ ok: false, msg: 'OPERACION FALLIDA, VUELVA A EMPEZAR' })
    }
})






//VERIFICACION DE LA SESION QUE ESTA ALMACENADA EN LA BD
const verificacion = express();

verificacion.use((req, res, next) => {
    // console.log('verificacion')

    try {
        const bearerHeader = req.headers['authorization'];

        if (typeof bearerHeader !== 'undefined') {
            const bearetoken = bearerHeader.split(" ")[1];
            // console.log('pasa la primera condicional, se ha obtenido los encabezados', bearetoken )

            jwt.verify(bearetoken, KEY, async (errtoken, authData) => {
                if (errtoken) {
                    // console.log('error en la verificacion token alterado: ', bearetoken)
                    pool.query('delete from sesion where token = ?', [bearetoken])
                    return res.json({ ok: false, msg: 'Su token a expirado, cierre sesion y vuelva a iniciar sesion' })
                }

                // console.log('pasa la verificacion del token', bearetoken)
                const sql = `SELECT usuario, est as sest, mun as smun, red as sred,var as svar, numero from sesion s 
               
                where token  = ${pool.escape(bearetoken)}`;
                const [result] = await pool.query(sql)
                if (result.length > 0) {
                    req.body.usuario = await result[0].usuario
                    req.body.rol = await result[0].numero
                    req.body.sest = await result[0].sest
                    req.body.smun = await result[0].smun
                    req.body.svar = await result[0].svar
                    req.body.sred = await result[0].sred
                    next()
                }
                else {
                    return res.json({ ok: false, sesion: false, msg: 'El Servidor no puede identificar su autencidad, cierre sesion y vuelva a intentar' })
                }
            })
        }
        else {
            return res.json({ ok: false, sesion: false, msg: 'El Servidor no puede interpretar su autenticidad' })
        }
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, sesion: false, msg: 'Error en el servidor' })
    }
})


const rolesAdmin = (req, res, next) => {
    if (parseInt(req.body.rol) === 1) {
        next()
    } else return res.json({ ok: false, msg: 'Esta Funcionalidad no esta destinado para su rol' })
}

const rolesAdminSEDES = (req, res, next) => {
    // console.log(req.body.rol)
    if (parseInt(req.body.rol) === 2 || parseInt(req.body.rol) === 1) {
        next()
    } else return res.json({ ok: false, msg: 'Esta Funcionalidad no esta destinado para su rol' })
}
const rolesArea = (req, res, next) => {
    if (parseInt(req.body.rol) === 6) {
        next()
    } else return res.json({ ok: false, msg: 'Esta Funcionalidad no esta destinado para su rol' })
}


const rolesSedes = (req, res, next) => {
    if (parseInt(req.body.rol) === 2) {
        next()
    } else return res.json({ ok: false, msg: 'Esta Funcionalidad no esta destinado para su rol' })
}

const rolesRed = (req, res, next) => {
    if (parseInt(req.body.rol) === 3) {
        next()
    } else return res.json({ ok: false, msg: 'Esta Funcionalidad no esta destinado para su rol' })
}

const rolesMun = (req, res, next) => {
    if (parseInt(req.body.rol) === 4) {
        next()
    } else return res.json({ ok: false, msg: 'Esta Funcionalidad no esta destinado para su rol' })
}
const rolesEst = (req, res, next) => {
    if (parseInt(req.body.rol) === 5) {
        next()
    } else return res.json({ ok: false, msg: 'Esta Funcionalidad no esta destinado para su rol' })
}


rutas.use("/usuarios", verificacion, rolesAdmin, usuario)
rutas.use("/est", verificacion, rolesAdmin, est)
rutas.use("/gestion", verificacion, rolesAdmin, gestion)
rutas.use("/variable", verificacion, rolesAdmin, variable)

rutas.use("/mes", verificacion, rolesAdminSEDES, mes)

// sedes
rutas.use("/formulario2", verificacion, rolesSedes, formulario2)
rutas.use("/reportes2", verificacion, rolesSedes, reportes2)
rutas.use("/opeinf2", verificacion, rolesSedes, opinf2)

// AREA
rutas.use("/formulario6", verificacion, rolesArea, formulario6)
rutas.use("/reportes6", verificacion, rolesArea, reportes6)
rutas.use("/opeinf6", verificacion, rolesArea, opinf6)


//red
rutas.use("/formulario3", verificacion, rolesRed, formulario3)
rutas.use("/reportes3", verificacion, rolesRed, reportes3)
rutas.use("/opeinf3", verificacion, rolesRed, opinf3)


//municipios
rutas.use("/formulario4", verificacion, rolesMun, formulario4)
rutas.use("/reportes4", verificacion, rolesMun, reportes4)
rutas.use("/opeinf4", verificacion, rolesMun, opinf4)

//establecimientos
rutas.use("/registro", verificacion, rolesEst, formulario5)
rutas.use("/reportes5", verificacion, rolesEst, reportes5)


rutas.use("/miPerfil", verificacion, miPerfil)
rutas.use('/public', rutasPublicas)






export default rutas;