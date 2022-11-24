import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import * as url from 'node:url'
import { knex } from './database/index.js'
import app from './express/app.js'
import { BadGatewayError } from './express/error/server.error.js'

const PORT = process.env.PORT || 8080

async function checkDatabaseConnection() {
  console.log(`Checking database connection...`)
  try {
    await knex.raw('SELECT 1 + 1 AS result')
    console.log('Database connection OK!')
  } catch (error) {
    throw new BadGatewayError(
      `Unable to connect to the database: ${error.message}`
    )
  }
}

async function startServer(port) {
  await checkDatabaseConnection()
  console.log(
    `Starting Climate Watch UK API at http://localhost:${port} in ${app.get(
      'env'
    )} mode`
  )
  app.listen(port, () => {
    console.log(`Climate Watch UK API listening on port ${port}.'.`)
  })
}

if (import.meta.url.startsWith('file:')) {
  const modulePath = url.fileURLToPath(import.meta.url)
  if (process.argv[1] === modulePath) {
    startServer(PORT)
  }
}

export default startServer
