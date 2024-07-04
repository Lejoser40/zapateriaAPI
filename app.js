import express from 'express'
import usuariosRoute from './routes/usuarios.js'
import loginsRoute from './routes/logins.js'
import cors from 'cors'
//import { Dotenv } from 'dotenv'

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
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