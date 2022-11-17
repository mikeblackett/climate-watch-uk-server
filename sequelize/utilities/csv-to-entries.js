import { basename } from 'node:path'
import fs from 'fs'
import { parse } from 'csv-parse'

const toCamelCase = (str) =>
  str.replace(/(_[a-z])/gi, ($1) => $1.toUpperCase().replace('_', ''))

async function csvToEntries(path, delimiter = ',') {
  let data = []
  const stream = fs.createReadStream(path).pipe(
    parse({
      delimiter,
      columns: (row) => row.map(toCamelCase),
      cast: (value, context) => {
        if (context.header) return value
        if (value === '') return null
        return value
      },
    })
  )
  return new Promise((resolve, reject) => {
    stream
      .on('data', (row) => data.push(row))
      .on('error', (error) => reject(error))
      .on('end', () => resolve(data))
  })
}

export { csvToEntries }
