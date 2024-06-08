import express, { json } from 'express'
import route from './src/routes/routes'
import errorMiddleware from './src/middlewares/errorMiddleware'
const port = process.env.PORT ?? 3000


const app = express()


app.use(json())
app.use(route)
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Servidor aberto http://localhost:${port}`)
})