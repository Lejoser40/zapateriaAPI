import pool from '../database.js'

export async function getDisponibles() {
    const [rows] = await pool.query("select * from inventario where stock > 0;")
    return rows
}