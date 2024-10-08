import express from 'express'
import { getLogins,getLog,createLogin, updateLogin, setEliminado } from '../utils/loginsMI.js'
import { addBitacora } from '../utils/bitacoraUtils.js'

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
    if(code == 200){
        req.session.isLoggedIn = true;
        req.session.userId = data[0].id;
        req.session.user = data[0].nombre;
        console.log(req.session)
        console.log(req.session.id)
    }
    res.status(code).send(data)
})

router.post('/logout', async (req, res) => {
    const usuario = req.session.user
    const id = req.session.userId
    await addBitacora(id,usuario,'cierre de session')
    req.session.destroy();
    res.send({msg:'session cerrada'})
});

router.post("/", async (req, res) => {
    const { id_usuario,username,password,inhabilidato } = req.body
    const {data, code} = await createLogin(id_usuario,username,password,inhabilidato)
    res.status(code).send(data)
})

router.put("/", async (req, res) => {
    const { id_usuario,username,inhabilidato } = req.body
    const {data, code} = await updateLogin(id_usuario,username,inhabilidato)
    res.status(code).send(data)
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    await setEliminado(id)
    res.status(200).send({msj: 'usuario Eliminado'})
})

export default router