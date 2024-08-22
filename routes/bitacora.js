import express from 'express'
import { getAll, getToday } from '../utils/bitacoraUtils.js';

const router = express.Router();

router.get("/", async (req, res) => {
    const bitacora = await getAll()
    res.send(bitacora)
})

router.get("/today", async (req, res) => {
    const bitacora = await getToday()
    res.send(bitacora)
})

export default router