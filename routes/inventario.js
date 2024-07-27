import express from 'express'
import { getDisponibles } from '../utils/inventarioUtils.js'

const router = express.Router()

router.get('/disponibles', async (req, res) => {
    const inventario = await getDisponibles()
    res.send(inventario)
})

export default router