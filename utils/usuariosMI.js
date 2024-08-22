import pool from '../database.js'

export async function getUsuarios() {
    const [rows] = await pool.query(`SELECT *
        FROM usuarios
        left JOIN logins ON usuarios.id = logins.id_usuario
        where logins.eliminado = false`)
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

    try{
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
    }catch(err){
        console.log(err)
    }

    return getUser(result.insertId);
}

export async function updateUser(id, nombre, apellido, DNI, telefono, email, rol){
 
    const query = `UPDATE usuarios
    SET
    nombre = ?,
    apellido = ?,
    DNI = ?,
    telefono = ?,
    email = ?,
    rol = ?
    WHERE id = ?`

    try{
        const [result] = await pool.query(query,
            [
                nombre, apellido, DNI,
                telefono, email, rol, id
            ]
        )
        return getUser(result.insertId);
    }catch(err){
        console.log(err)
    }

    return getUser(result.insertId);
}