import express from 'express'
import usuariosRoute from './routes/usuarios.js'
import loginsRoute from './routes/logins.js'
import cors from 'cors'
import session from 'express-session'
//import { Dotenv } from 'dotenv'

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 * 60
    }
}))
app.use(express.json())
app.use(holaMundo)
/*app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST"]
    })
)*/

app.use('/usuarios', usuariosRoute)
app.use('/logins', loginsRoute)

app.use((err, req, res, next) => {
    res.status(500).send('Something broke 💩!')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

function holaMundo(req,res,next) {
    console.log('holamundo')
    next()
}