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
            resultados.push(result)
        } catch (err) {
            console.log(err)
        }
    }

    // console.log('aaaaaaaaaaaaa')
    console.log(resultados)

    return numeroFactura



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

        const query = `insert into facturas (id_usuario, cliente, fecha, total) values (?,?,?,?)`

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