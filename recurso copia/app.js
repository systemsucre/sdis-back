import express from 'express'

import cors from 'cors'

import rutas from "./src/rutas/rutas.js"
import {PORT} from "./src/config.js"


const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use("/servernet_/",rutas)

app.listen(PORT,()=>{
    console.log("servidor corriendo en: ", PORT)
});