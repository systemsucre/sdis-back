import {config} from 'dotenv'
config()

export const PORT = process.env.PORT || 3001

export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_DATABASE = process.env.DB_DATABASE || 'sdis1';
export const DB_PORT = process.env.DB_PORT || 3306;
export const KEY = process.env.KEY || 'KEY2023'
export const CLAVEGMAIL = process.env.CLAVEGMAIL || 'frqhuvfcwdccomfh'

// export const DB_HOST = process.env.DB_HOST || 'mysql-consultoria.alwaysdata.net';
// export const DB_USER = process.env.DB_USER || '324021_sedes';
// export const DB_PASSWORD = process.env.DB_PASSWORD || 'Ag//5556//';
// export const DB_DATABASE = process.env.DB_DATABASE || 'consultoria_sdis1';
// export const DB_PORT = process.env.DB_PORT || 3306;
// export const KEY = process.env.KEY || 'KEY2023'
// export const CLAVEGMAIL = process.env.CLAVEGMAIL || 'frqhuvfcwdccomfh'



