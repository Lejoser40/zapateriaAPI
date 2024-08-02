import pool from '../database.js'

export async function createFactura(id_usuario, cliente, zapatos) {
    console.log(zapatos)

    let resultados = []

    // console.log('aaaaaaaaaaaaaaa')

    // console.log(`id_usuario: ${id_usuario}`)
    // console.log(`id_usuario: ${cliente}`)

    const numeroFactura = await initFactura(id_usuario, cliente, zapatos)

    console.log(`factura: ${numeroFactura}`)


    // arreglar esto
    for (let i = 0; i < zapatos.length; i++) {
        const query = `insert into detalles ( id_factura,id_producto,cantidad, precio ) values (?,?,?,?)`
        try {
            const [result] = await pool.query(query, [numeroFactura, zapatos[i].id, zapatos[i].cantidad, zapatos[i].precio])
            resultados.push(result.insertId)
            resInventario(zapatos[i].id)
        } catch (err) {
            console.log(err)
        }
    }

    // console.log('aaaaaaaaaaaaa')
    console.log(resultados)

    return numeroFactura



    async function resInventario(id){
        try{
            const query = `UPDATE inventario SET stock = stock - 1 WHERE id = ?;`
            await pool.query(query, [id])
        } catch (err){
            console.log(err)
        }
    }

    // crea la factura
    async function initFactura(id_usuario, cliente, zapatos) {
        // console.log('asdsadsadsa')
        let total = 0;
        var newDate = new Date()
        let result

        for (let i = 0; i < zapatos.length; i++) {
            const precio = zapatos[i].precio
            total += precio
        }

        const query = `insert into facturas (id_usuario, cliente, fecha, total, concretada) values (?,?,?,?,false)`

        console.log('2')
        try {
            [result] = await pool.query(query, [id_usuario, cliente, newDate, total])
        } catch (err) {
            console.log(err)
        }
        console.log('3')
        return result.insertId
    }
}

export async function facturar(id, total, colones, dolares, tarjeta){
    // const query = `UPDATE facturas SET tarjeta = ?, colones = ?, dolares = ?, concretada = ? WHERE id = ?;`
    // console.log(id, total, colones, dolares, tarjeta)

    const query2 = `UPDATE facturas SET tarjeta = ?, colones = ?, dolares = ?, concretada = ? WHERE (id = ?)`
    let rows
    try{
        [rows] = await pool.query(query2,[tarjeta, colones, dolares, true, id])
    }catch(err){
        console.log(err)
    }  

    const suma = colones + dolares + tarjeta
    const vuelto = Math.abs(total - suma)
    
    return vuelto
}

export async function getAllFacturas(){
    const [rows] = await pool.query("SELECT * FROM facturas where concretada = false")

    return rows
}