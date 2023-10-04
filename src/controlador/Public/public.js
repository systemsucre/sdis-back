import { Router } from "express"
import { Usuario } from '../../modelo/usuario.js'
import { registrarme } from '../../validacion/usuario.js'
// import nodemailer from "nodemailer";
// import { CLAVEGMAIL } from '../../config.js'
// import pool from '../../modelo/bdConfig.js'

//const modelo from "../modelo/usuario.js"
// desde esta plantilla se importa las funcionalidades de los controladores de los modulos


const rutas = Router()

const usuario = new Usuario()



rutas.get("/registrarme", registrarme, async (req, res) => {

    console.log('datos: ', req.query)

    const { username, otros, hospital, nombre, ape1,
        ape2, celular, correo, creado } = req.query
    const datos = {
        username,
        pass: otros,
        establecimiento:hospital,
        nombre,
        apellido1:ape1,
        apellido2:ape2,
        celular,
        correo,
        estado:0,
        creado,
        usuario: 0
    }
    try {
        const resultado = await usuario.registrarme(datos)

        if (resultado.existe === 1)
            return res.json({ ok: false, msg: 'Este usuario ya esta registrado' })
        if (resultado.existe === 2)
            return res.json({ ok: false, msg: 'Este correo ya esta registrado' })
        return res.json({ ok: true, msg: "Espere que el administrador valide su nueva cuenta" });

        // const empresa = `SELECT correo, telefono from empresa`;
        // const [infoEmpresa] = await pool.query(empresa)

        // if (infoEmpresa.length === 1) {

        //     let jConfig = {
        //         "host": "smtp.gmail.com",
        //         "port": "465",
        //         "secure": true,
        //         "auth": {
        //             "user": infoEmpresa[0].correo,
        //             "pass": CLAVEGMAIL
        //         }
        //     };
        //     console.log(infoEmpresa[0].correo, 'correo electronico')
        //     let email = {
        //         from: infoEmpresa[0].correo,  //remitente
        //         to: correo,  //destinatario
        //         subject: "EMPRESA COBURCA",  //asunto del correo
        //         html: ` 
        //             <div> 
        //             <p>Hola ${nombre + ' ' + apellido1 + ' ' + apellido2} </p> 
        //             <p>Su cuenta en el sistema de la Empresa Coburca ha sido creada con éxito.</p> 
        //             <p>En las próximas horas se hara la correspondiente validacion para otorgarle el acceso al sistema.</p> 

        //             <h3>Sus credenciales de acceso son:</h3>
        //             <h4>${'Usuario:'+username}</h4> 
        //             <h4>${'Contraseña:'+xyz}</h4> 

        //             <p>Para mas informacion contactese con el administrador de Area de Informatica.</p> 
        //             <p>Tel/cel: ${infoEmpresa[0].telefono}</p> 

        //             </div> 
        //         `
        //     };

        //     let createTransport = nodemailer.createTransport(jConfig);
        //     createTransport.sendMail(email, function (error, info) {

        //         createTransport.close();
        //     });
        //     res.json({ ok: true, msg: "Su cuenta ha sido creado correctamente, para mas informacion revise su correo " });
        // }
        // else {
        //     res.json({ ok: false, msg: 'CORREO NO REGISTRADO' })
        // }

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Error en el Servidor', ok: false })
    }
})


















export default rutas;