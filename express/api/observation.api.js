import { Variable } from '../../database/index.js'

const query = Variable.query()

async function test() {
  const result = await query.select()
  console.log(result)
}

test()
