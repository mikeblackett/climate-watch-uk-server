export async function timeSchema(knex) {
  return knex.schema.createTable('times', function (table) {
    // ID composed of year+month i.e. 202101
    table.integer('id').unsigned().primary()
    // Observation date (always 16th of month)
    table.date('date').unique().notNullable()
    // Observation year
    table.integer('year').notNullable()
    // Observation month
    table.integer('month_number').notNullable()
    // Winter is Dec, Jan, Feb...
    table.integer('season_year').notNullable()
  })
}
