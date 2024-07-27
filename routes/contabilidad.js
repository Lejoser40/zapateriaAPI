import express from 'express'
import { getContabilidad } from '../utils/contabilidaUtils.js'

const router = express.Router()

router.get('/', async (req, res) => {
    const contabilidad = await getContabilidad()
    res.send(contabilidad)
})

export default router