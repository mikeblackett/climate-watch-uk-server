import metaRouter from './meta.routes.js'
import dataRouter from './data.routes.js'

function addRoutes(app) {
  app.use('/api/meta', metaRouter)
  app.use('/api/data', dataRouter)
}

export { addRoutes }
