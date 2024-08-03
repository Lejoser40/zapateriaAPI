import express from 'express'
import { createFactura, facturar, getAllFacturas, getInformes } from '../utils/facturacionUtils.js'

const router = express.Router()

router.post("/", async (req, res) => {
    const user = req.session.userId

    console.log('--------------')
    console.log(req.session)
    console.log(req.session.id)

    const { cliente, zapatos } = req.body
    console.log('cleinte :' + cliente)
    console.log('zapatos :' + zapatos)
    const numeroFactura = await createFactura(user, cliente, zapatos)
    res.send({ numerofactura: numeroFactura, nombre: cliente })
})

router.get("/", async (req, res) => {
    const facturas = await getAllFacturas()
    res.send(facturas)
})

router.put("/", async (req, res) => {
    const { id, total, colones, dolares, tarjeta } = req.body
    const vuelto = await facturar(id, total, colones, dolares, tarjeta)
    res.send({vuelto: vuelto})
})

router.get("/informes", async (req, res) => {
    const user = req.session.userId
    const informes = await getInformes(user)
    res.send(informes)
})


export default router