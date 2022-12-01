import locationRouter from './location.routes.js'
import timeRouter from './time.routes.js'
import periodRouter from './period.routes.js'
import variableRouter from './variable.routes.js'
import snapshotRouter from './snapshot.routes.js'
import dataRouter from './data.routes.js'

function addRoutes(app) {
  app.use('/api/locations', locationRouter)
  app.use('/api/times', timeRouter)
  app.use('/api/period', periodRouter)
  app.use('/api/variables', variableRouter)
  app.use('/api/snapshot', snapshotRouter)
  app.use('/api/data', dataRouter)
}

export { addRoutes }
