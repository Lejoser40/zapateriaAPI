import express from 'express'
import { getLogins,getLog,createLogin } from '../middleware/loginsMI.js'

const router = express.Router()

router.get('/', async (req, res) => {
    const logins = await getLogins()
    res.send(logins)
})

router.get('/:username/:password', async (req, res) => {
    const username = req.params.username
    const password = req.params.password
    //const {username, password} = req.body
    const {data, code} = await getLog(username,password)
    res.status(code).send(data)
})

router.post("/", async (req, res) => {
    const { id_usuario,username,password,inhabilidato,eliminado,acceso } = req.body
    const {data, code} = await createLogin(id_usuario,username,password,inhabilidato,eliminado,acceso)
    res.status(code).send(data)
})

export default router