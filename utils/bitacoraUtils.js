import pool from '../database.js'

export async function addBitacora(id_usuario,username,accion){
    const fecha = new Date();

    await pool.query(`insert into bitacora 
                    (id_usuario,usuario,accion,fecha) 
                    values (?,?,?,?)`,
                    [id_usuario,username,accion,fecha])
}