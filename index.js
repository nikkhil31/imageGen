import express from 'express'
import cors from 'cors'

import apiRouter from './app/routes/apiRoutes.js'
import pool from "./app/config/postgresql.js"

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use(cors({
  origin: '*'
}));

pool.connect()

app.get('/', (req, res) => res.send('Welcome'))
app.get('/ping', (req, res) => res.send('pong'))


app.use('/api/', apiRouter)

app.all('*', function (req, res) {
  return res.send('not found')
})

app.use((err, req, res) => {
  if (err.name == 'UnauthorizedError') {
    return res.send('error')
  }
})




export default app


