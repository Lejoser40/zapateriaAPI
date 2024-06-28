import pool from '../database.js'
import bcrypt from 'bcrypt'

export async function getLogins() {
    const [rows] = await pool.query("SELECT * FROM logins")
    return rows
}

export async function getLogin(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM logins
        WHERE id = ?`
        , [id])
    return rows
}

export async function getLog(username, password) {
    const [user] = await pool.query(`SELECT * FROM logins WHERE username = ?`, [username]);

    // comprobar si el usuario existe y no esta eliminado
    if (user[0] == null || user[0].eliminado == 1) {
        const err = {error : 'user dont exist'}
        return {
            data: err,
            code: 404
        }
    }

    // comprobar que no este inhabilidato
    if(user[0].inhabilidato == 1){
        const err = {error : 'user disabled'}
        return { data: err, code: 406 }
    }

    try {
        if (await bcrypt.compare(password, user[0].password)) {
            const usr = {
                id_usuario: user[0].id_usuario,
                username: user[0].username,
                inhabilidato: user[0].inhabilidato,
                eliminado: user[0].eliminado,
                acceso: user[0].acceso
            }
            return {
                data: usr,
                code: 200
            }
        }
        const err = {error : 'Not allowd'}
        return { data: err, code: 406 }
    } catch {
        const err = {error : 'error 💩'}
        return { error: err, code: 400 }
    }

}

export async function createLogin(id_usuario, username, password, inhabilidato, eliminado, acceso) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const [result] = await pool.query(`
            insert into logins (
            id_usuario,username,
            password,inhabilidato,
            eliminado,acceso)
            values (?,?,?,?,?,?)`,
            [
                id_usuario, username, hashedPassword,
                inhabilidato, eliminado, acceso
            ]
        )
        const login = getLogins(result.insertId)
        return {data: login, code: 201}
    } catch {
        return ('Error 💩!')
    }
}