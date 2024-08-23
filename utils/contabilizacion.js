import pool from '../database.js'

export async function getUsuarios() {
    const [rows] = await pool.query(`SELECT *
        FROM usuarios
        left JOIN logins ON usuarios.id = logins.id_usuario
        where logins.eliminado = false`)
    return rows
}