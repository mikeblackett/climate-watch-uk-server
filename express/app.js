// TODO Implement winston & morgan logger

import express from 'express'
import cors from 'cors'
import { addRoutes } from './routes/routes.js'
import { Payload } from './utilities/payload.js'

const app = express()
const payload = new Payload()
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

// Handle requests with dedicated routers
addRoutes(app)

// Catch any errors...
app.use((error, request, response, next) => {
  response.status(error.status || 500)
  response.json(payload.error(error.message, response.statusCode))
})

// Finally, unhandled requests fail with a 404 not found response
app.use((request, response) => {
  response.status(404)
  response.json(payload.fail({ resource: 'Not found!' }))
})

process.on('uncaughtException', (error) => {
  console.error('UNCAUGHT EXCEPTION\n', error.stack)
  process.exit(1)
})

export default app
