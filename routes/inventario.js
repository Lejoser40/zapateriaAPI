import express from 'express'
import { add, getAll, getDisponibles } from '../utils/inventarioUtils.js'

const router = express.Router()

router.post('/', async (req, res) => {
    const { producto, descripcion, precio, stock } = req.body
    const zapato = await add(producto, descripcion, precio, stock)
    res.send(zapato)
})

router.get('/disponibles', async (req, res) => {
    const inventario = await getDisponibles()
    res.send(inventario)
})

router.get('/all', async (req, res) => {
    const inventario = await getAll()
    res.send(inventario)
})

export default router