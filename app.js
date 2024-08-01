import express from 'express'
import cors from 'cors'
import session from 'express-session'
//import { Dotenv } from 'dotenv'

import usuariosRoute from './routes/usuarios.js'
import loginsRoute from './routes/logins.js'
import inventarioRoute from './routes/inventario.js'
import contabilidadRoute from './routes/contabilidad.js'
import facturacion from './routes/facturacion.js'
import { isAuthenticated } from './middleware/isAuthenticated.js'

const app = express()
const PORT = process.env.PORT

// app.use(cors())
app.use(session({
    secret: '12345',
    saveUninitialized: true,
    cookie: {
        maxAge: 60000 * 60
    }
}))
app.use(express.json())
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
        // methods: ["GET", "POST"]
    })
)

app.use('/logins', loginsRoute)

// app.use(isAuthenticated)

app.use('/usuarios', usuariosRoute)
app.use('/inventario', inventarioRoute)
app.use('/contabilidad', contabilidadRoute)
app.use('/facturacion', facturacion)


app.use((err, req, res, next) => {
    res.status(500).send({error:'Something broke 💩!'})
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

// function holaMundo(req,res,next) {
//     console.log('holamundo')
//     next()
// }