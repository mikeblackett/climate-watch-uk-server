import Knex from 'knex'
import { Model } from 'objection'
import pg from 'pg'
import knexConfig from './knexfile.js'
import { Location } from './models/location.model.js'
import { Variable } from './models/variable.model.js'
import { Climate } from './models/climate.model.js'
import { PerformanceObserver, performance } from 'perf_hooks'

const env = process.env.NODE_ENV || 'development'

pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value) => {
  return parseFloat(value)
})

pg.types.setTypeParser(pg.types.builtins.INT8, (value) => {
  return parseInt(value)
})

const knex = Knex(knexConfig[env])
Model.knex(knex)

if (env === 'development') {
  ;(function () {
    const performanceObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log(`${entry.duration.toFixed(2)} ms`)
      })
    })
    performanceObserver.observe({ buffered: true, entryTypes: ['measure'] })

    knex
      .on('query', (query) => {
        const id = query.__knexQueryUid
        performance.mark(`${id}-started`)
      })
      .on('query-response', (response, query) => {
        const id = query.__knexQueryUid
        performance.mark(`${id}-ended`)
        performance.measure(query.sql, `${id}-started`, `${id}-ended`)
      })
  })()
}

export { knex, Location, Variable, Climate }
