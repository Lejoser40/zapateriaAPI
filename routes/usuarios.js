import { getUsuarios,getUser,createUser } from "../middleware/usuariosMI.js"
import express from 'express'

const router = express.Router();

router.get("/", async (req, res) => {
    const usuarios = await getUsuarios()
    res.send(usuarios)
})

router.get("/:id", async (req, res) => {
    const id = req.params.id
    const usuario = await getUser(id)
    res.send(usuario)
})


router.post("/", async (req, res) => {
    const { nombre, apellido, DNI, telefono, email, rol } = req.body
    const usuario = await createUser(nombre, apellido, DNI, telefono, email, rol)
    res.status(201).send(usuario)
})

export default router