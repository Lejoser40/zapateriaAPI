import pool from '../database.js'

export async function getUsuarios() {
    const [rows] = await pool.query("SELECT * FROM usuarios")
    return rows
}

export async function getUser(id){
    const [rows] = await pool.query(`
        SELECT * 
        FROM usuarios
        WHERE id = ?`
        ,  [id])
    return rows
}

export async function createUser(nombre, apellido, DNI, telefono, email, rol){
    const [result] = await pool.query(`
        insert into usuarios (
        nombre,apellido,
        DNI,telefono,
        email,rol)
        values (?,?,?,?,?,?)`,
        [
            nombre, apellido, DNI,
            telefono, email, rol
        ]
    )
    return getUser(result.insertId);
}