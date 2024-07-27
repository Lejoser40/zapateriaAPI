import express from 'express'
import { createFactura } from '../utils/facturacionUtils.js'

const router = express.Router()

router.post("/", async (req, res) => {
    const user = req.session.userId
    const { cliente, zapatos} = req.body
    console.log('sdads')
    await createFactura(user,cliente, zapatos)
    res.send('dssadsad')
})

export default router