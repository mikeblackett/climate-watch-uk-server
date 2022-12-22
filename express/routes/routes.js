import variableRouter from './variable.routes.js'
import locationRouter from './location.routes.js'
import snapshotRouter from './snapshot.routes.js'
import sliceRouter from './slice.routes.js'
import aggregateRouter from './aggregate.routes.js'
import extremeRouter from './extreme.routes.js'
import rankRouter from './rank.routes.js'

function addRoutes(app) {
  app.use('/api/meta/variables', variableRouter)
  app.use('/api/meta/location', locationRouter)
  app.use('/api/data/snapshot', snapshotRouter)
  app.use('/api/data/slice', sliceRouter)
  app.use('/api/data/aggregated', aggregateRouter)
  app.use('/api/data/extreme', extremeRouter)
  app.use('/api/data/rank', rankRouter)
}

export { addRoutes }
