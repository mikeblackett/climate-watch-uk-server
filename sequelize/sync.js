import { readdir } from 'node:fs/promises'
import { basename, join } from 'node:path'
import fs from 'fs'
import sequelize from './index.js'
import { csvToEntries } from './utilities/csv-to-entries.js'

const dataDir =
  '/home/mikeblackett/Documents/Dev/climate-watch-uk-server/python/data/processed'

const climateDir = join(dataDir, 'climate')
const climatePaths = []
try {
  const climateFiles = await readdir(climateDir)
  for (const file of climateFiles) climatePaths.push(join(climateDir, file))
} catch (error) {
  console.error(error)
}

const [location, time, variable, climate] = await Promise.all([
  csvToEntries(join(dataDir, 'location/location.csv')),
  csvToEntries(join(dataDir, 'time/time.csv')),
  csvToEntries(join(dataDir, 'variable/variable.csv')),
  Promise.all(climatePaths.map((path) => csvToEntries(path))),
])

async function sync() {
  try {
    await sequelize.sync({ force: true })
  } catch (error) {
    console.log('Failed to sync test database', error)
  }
  try {
    await sequelize.models.Location.bulkCreate(location)
  } catch (error) {
    console.log('Failed to create Location model', error)
  }
  try {
    await sequelize.models.Time.bulkCreate(time)
  } catch (error) {
    console.log('Failed to create Time model', error)
  }
  try {
    await sequelize.models.Variable.bulkCreate(variable)
  } catch (error) {
    console.log('Failed to create Variable model', error)
  }
  try {
    await sequelize.models.Climate.bulkCreate(climate.flat())
  } catch (error) {
    console.log('Failed to create Climate model', error)
  }
}

sync()
