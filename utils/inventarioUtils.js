import pool from '../database.js'

export async function getDisponibles() {
    const [rows] = await pool.query("select * from inventario where stock > 0;")
    return rows
}

export async function getAll() {
    const [rows] = await pool.query("select * from inventario")
    return rows
}

export async function add(producto, descripcion, precio, stock) {
    const query = `INSERT INTO inventario (producto ,descripcion ,precio, stock ) VALUES(?,?,?,?)`
    try{
        const [rows] = await pool.query(query,[producto, descripcion, precio, stock])
        return rows
    }catch(err){
        console.log(rows)
        return err
    }
}