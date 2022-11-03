// TODO Implement winston & morgan logger

import express from 'express'
import cors from 'cors'
import { addRoutes } from './routes/routes.js'
import { payload } from './utilities/payload.js'

const app = express()

const corsOptions = {
  origin: 'http://localhost:8081',
}
app.use(cors(corsOptions))

// app.use(logger('dev'))

// Only during dev...
app.get('/', (request, response) => {
  response.redirect('/api')
})

app.get('/api', (request, response) => {
  response.json({ message: 'Welcome to Climate Watch UK API' })
})

addRoutes(app)

app.use((error, request, response, next) => {
  response.status(error.status || 500)
  response.json(payload.error(error.message))
})

app.use((request, response) => {
  response.status(404)
  response.json(payload.error(`Not found! [404]`))
})

process.on('uncaughtException', (error) => {
  console.error('UNCAUGHT EXCEPTION\n', error.stack)
  process.exit(1)
})

export default app
