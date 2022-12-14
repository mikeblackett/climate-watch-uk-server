import locationRouter from './location.routes.js'
import variableRouter from './variable.routes.js'
import climateRouter from './climate.routes.js'

function addRoutes(app) {
  app.use('/api/locations', locationRouter)
  app.use('/api/variables', variableRouter)
  app.use('/api/climate', climateRouter)
}

export { addRoutes }
