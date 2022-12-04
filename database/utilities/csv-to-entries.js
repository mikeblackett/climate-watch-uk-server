import { basename } from 'node:path'
import fs from 'fs'
import { parse } from 'csv-parse'

async function csvToEntries(path, delimiter = ',') {
  let data = []
  const stream = fs.createReadStream(path).pipe(
    parse({
      delimiter,
      columns: true,
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
