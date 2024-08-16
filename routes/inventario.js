import express from 'express'
import { add, getAll, getDisponibles, update } from '../utils/inventarioUtils.js'

const router = express.Router()

router.post('/', async (req, res) => {
    const { producto, descripcion, precio, stock } = req.body
    const zapato = await add(producto, descripcion, precio, stock)
    res.send(zapato)
})

router.put('/', async (req, res) => {
    const { id,producto, descripcion, precio, stock } = req.body
    const zapato = await update(id,producto, descripcion, precio, stock)
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