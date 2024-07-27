import pool from '../database.js'

export async function createFactura(id_usuario,cliente, zapatos) {
    console.log(zapatos)

    // retorna el id de la factura
    const numeroFactura = await initFactura(id_usuario, cliente, zapatos)


    // arreglar esto
    for (let i = 0; i < zapatos.length; i++) {
        const [result] = await pool.query(`
            insert into detalles ( id_producto,cantidad, precio )
            values (?,?,?)`,
            [
                zapatos[i].id, zapatos[i].cantidad, zapatos[i].precio
            ]
        )
        resultados.push(result.insertId)
    }
    const [rows] = await pool.query("select * from inventario where stock > 0;")




    // crea la factura
    async function initFactura(id_usuario, cliente, zapatos){
        let total = 0;
        var newDate = new Date()

        for (let i = 0; i < zapatos.length; i++) {
            const precio = zapatos[i].precio
            total += precio
        }
        
        const fecha = newDate.getDate()
    
        const query = `insert into facturas (id_usuario, cliente, fecha, total) values (?,?,?,?)`
    
        const [result] = await pool.query(query,[id_usuario,cliente,fecha,total])
        return result.insertId
    }



    // for (let i = 0; i < zapatos.length; i++) {
    //     const [result] = await pool.query(`
    //         insert into detalles ( id_producto,cantidad, precio )
    //         values (?,?,?)`,
    //         [
    //             zapatos[i].id, zapatos[i].cantidad, zapatos[i].precio
    //         ]
    //     )
    //     resultados.push(result.insertId)
    // }
    //const [rows] = await pool.query("select * from inventario where stock > 0;")

}