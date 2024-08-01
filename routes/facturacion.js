import express from 'express'
import { createFactura } from '../utils/facturacionUtils.js'

const router = express.Router()

router.post("/", async (req, res) => {
    const user = req.session.userId

    console.log('--------------')
    console.log(req.session)
    console.log(req.session.id)

    const { cliente, zapatos} = req.body
    console.log('cleinte :'+cliente)
    console.log('zapatos :'+ zapatos)
    const numeroFactura = await createFactura(user,cliente, zapatos)
    res.send({numerofactura: numeroFactura})
})

export default router