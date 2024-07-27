import pool from '../database.js'

export async function getContabilidad() {
    const [rows] = await pool.query("select iva, cambio_dolar from contabilidad")
    return rows
}