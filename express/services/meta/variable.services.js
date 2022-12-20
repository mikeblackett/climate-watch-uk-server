import db from '../../../database/index.js'

const { Variable } = db.models

async function findAll() {
  return await Variable.query()
}

async function findById(id) {
  return await Variable.query().where('id', id)
}

async function getAllIds() {
  return await Variable.query().select('id')
}

export { findAll, findById, getAllIds }
