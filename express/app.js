// TODO Implement winston & morgan logger

import express from 'express'
import cors from 'cors'
import { addRoutes } from './routes/routes.js'
import { validationErrorMiddleware } from './middlewares/validation-error.middleware.js'
import { errorMiddleware } from './middlewares/error.middleware.js'
import jsend from './utilities/jsend.js'

const app = express()
const corsOptions = {
  origin: 'http://localhost:8081',
}
app.use(cors(corsOptions))

app.set('json replacer', function (key, value) {
  if (this[key] instanceof Date) {
    value = this[key].toLocaleDateString()
  }
  return value
})

// Replace qs with node querystring
app.set('query parser', 'simple')

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
app.use(validationErrorMiddleware)
app.use(errorMiddleware)

// Finally, unhandled requests fail with a 404 not found response
app.use((request, response) => {
  response.status(404)
  response.json(jsend.fail({ resource: 'Not found!' }))
})

process.on('uncaughtException', (error) => {
  console.error('UNCAUGHT EXCEPTION\n', error.stack)
  process.exit(1)
})

export default app
