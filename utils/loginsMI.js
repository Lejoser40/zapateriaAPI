import pool from '../database.js'
import bcrypt from 'bcrypt'
import { getUser } from './usuariosMI.js'
import { addBitacora } from './bitacoraUtils.js'

let atemps = []

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
        const err = { error: 'user dont exist' }
        return {
            data: err,
            code: 404
        }
    }

    // comprobar que no este inhabilidato
    if (user[0].inhabilidato == 1) {
        const err = { error: 'user disabled' }
        return { data: err, code: 406 }
    }

    try {
        if (await bcrypt.compare(password, user[0].password)) {
            /*const usr = {
                id_usuario: user[0].id_usuario,
                username: user[0].username,
                inhabilidato: user[0].inhabilidato,
                eliminado: user[0].eliminado,
                acceso: user[0].acceso
            }*/
            const usuario = await getUser(user[0].id_usuario)
            const accion = 'inicio de session'
            await addBitacora(usuario[0].id, usuario[0].nombre, accion)
            return {
                data: usuario,
                code: 200
            }
        }

        failedLogin(user[0].id_usuario)

        const accion = 'contraseña erronea'
        const usuario = await getUser(user[0].id_usuario)
        await addBitacora(usuario[0].id, usuario[0].nombre, accion)


        const err = { error: 'Not allowd' }
        return { data: err, code: 406 }

    } catch {
        const err = { error: 'error 💩' }
        return { error: err, code: 400 }
    }


    async function failedLogin(id_user) {

        const tempUsr = atemps.find(usuario => usuario.id == id_user)

       /* if (tempUsr) {
            //console.log(tempUsr)
            if (tempUsr.intentos < 2) {
                const index = atemps.indexOf(tempUsr)
                let newIntento = tempUsr.intentos
                newIntento = newIntento + 1
                atemps[index].intentos = newIntento
                console.log(atemps[index])
            } else {
                updateLoginInhabilitado(true, tempUsr.id)
                atemps.splice(tempUsr, 1)
                console.log('usuario inhabilitado')
                console.log(atemps)
            }
        } else {
            const user = { id: id_user, intentos: 1 }
            atemps.push(user)
            console.log(user)
        }*/

        if (!tempUsr) {
            const user = { id: id_user, intentos: 1 }
            atemps.push(user)
            console.log(user)

        } else {
            //console.log(tempUsr)
            if (tempUsr.intentos > 1) {
                updateLoginInhabilitado(true, tempUsr.id)
                atemps.splice(tempUsr, 1)
                /*console.log('usuario inhabilitado')
                console.log(atemps)*/
                return
            }
            const index = atemps.indexOf(tempUsr)
            let newIntento = tempUsr.intentos
            newIntento = newIntento + 1
            atemps[index].intentos = newIntento
            console.log(atemps[index])
        }

    }

}

export async function updateLoginInhabilitado(value, idUsuario) {
    await pool.query(`UPDATE logins SET inhabilidato = ?
                    WHERE id_usuario = ?`, [value, idUsuario])
}

export async function createLogin(id_usuario, username, password, inhabilidato,) {
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
                inhabilidato, false, 0
            ]
        )
        const login = getLogins(result.insertId)
        return { data: login, code: 201 }
    } catch {
        return ('Error 💩!')
    }
}