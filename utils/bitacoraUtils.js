import pool from '../database.js'

export async function addBitacora(id_usuario,username,accion){
    const fecha = new Date();

    await pool.query(`insert into bitacora 
                    (id_usuario,usuario,accion,fecha) 
                    values (?,?,?,?)`,
                    [id_usuario,username,accion,fecha])
}

export async function getAll(){
    
    const query = `SELECT * FROM bitacora`;

    try{
        const [result] = await pool.query(query)
        return result
    } catch(err){
        console.log(err)
    }

    return result
}

export async function getToday(){
    
    const query = `SELECT * FROM bitacora where date(fecha) = CURRENT_DATE()`;

    try{
        const [result] = await pool.query(query)
        return result
    } catch(err){
        console.log(err)
    }

    return result
}