import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { csvToEntries } from '../utilities/csv-to-entries.js'

const dataDir = '../python/data/processed'
const climateDir = resolve(dataDir, 'climate/monthly')
const climatesPaths = []
try {
  const files = await readdir(climateDir)
  for (const file of files) climatesPaths.push(resolve(climateDir, file))
} catch (error) {
  console.error(error)
}

const [locations, variables, climates] = await Promise.all([
  csvToEntries(resolve(dataDir, 'location/location.csv')),
  csvToEntries(resolve(dataDir, 'variable/variable.csv')),
  Promise.all(climatesPaths.map((path) => csvToEntries(path))),
])

// Add the last 20 years data... 24months * 18 locations * 10 years = 4320
const climatesSliced = climates.map((arr) => arr.slice(-4320, -1))

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('locations').del()
  await knex('locations').insert(locations)
  await knex('variables').del()
  await knex('variables').insert(variables)
  await knex('climates').del()
  await Promise.all(
    climatesSliced.map(async (v) => {
      await knex('climates').insert(v)
    })
  )
}
