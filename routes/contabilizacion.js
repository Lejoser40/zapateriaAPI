import express from 'express'

const router = express.Router();

router.get("/", async (req, res) => {
    const usuarios = await getUsuarios()
    res.send(usuarios)
})

router.post("/", async (req, res) => {
    const { nombre, apellido, DNI, telefono, email, rol } = req.body
    const usuario = await createUser(nombre, apellido, DNI, telefono, email, rol)
    res.status(201).send(usuario)
})


export default router