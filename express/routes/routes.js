import locationRouter from './location.routes.js'
import variableRouter from './variable.routes.js'
import dataRouter from './data.routes.js'

function addRoutes(app) {
  app.use('/api/locations', locationRouter)
  app.use('/api/variables', variableRouter)
  app.use('/api/data', dataRouter)
}

export { addRoutes }
