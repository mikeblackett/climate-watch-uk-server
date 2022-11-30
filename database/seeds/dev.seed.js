import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { csvToEntries } from '../utilities/csv-to-entries.js'

const dataDir =
  '/home/mikeblackett/Documents/Dev/climate-watch-uk-server/python/data/processed'

const observationsDir = join(dataDir, 'climate')
const observationsPaths = []
try {
  const observationsFiles = await readdir(observationsDir)
  for (const file of observationsFiles)
    observationsPaths.push(join(observationsDir, file))
} catch (error) {
  console.error(error)
}

const [locations, times, periods, variables, observations] = await Promise.all([
  csvToEntries(join(dataDir, 'location/location.csv')),
  csvToEntries(join(dataDir, 'time/time.csv')),
  csvToEntries(join(dataDir, 'period/period.csv')),
  csvToEntries(join(dataDir, 'variable/variable.csv')),
  Promise.all(observationsPaths.map((path) => csvToEntries(path))),
])

// Add the last 20 years data... 24months * 18 locations * 10 years = 4320
const observationsSliced = observations.map((arr) => arr.slice(-4320, -1))

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('locations').del()
  await knex('locations').insert(locations)
  await knex('times').del()
  await knex('times').insert(times)
  await knex('periods').del()
  await knex('periods').insert(periods)
  await knex('variables').del()
  await knex('variables').insert(variables)
  await knex('observations').del()
  await Promise.all(
    observationsSliced.map(async (v) => {
      await knex('observations').insert(v)
    })
  )
}
