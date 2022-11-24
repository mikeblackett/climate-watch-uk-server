import locationRouter from './location.routes.js'
// import timeRouter from './time.routes.js'
import variableRouter from './variable.routes.js'
// import climateRouter from './climate.routes.js'

function addRoutes(app) {
  app.use('/api/locations', locationRouter)
  // app.use('/api/times', timeRouter)
  app.use('/api/variables', variableRouter)
  // app.use('/api/data', climateRouter)
}

export { addRoutes }
