import db from '../../database/index.js'

const { Location } = db.models

async function findAll() {
  return await Location.query().modify('selectDefault')
}

async function findByType(type) {
  return await Location.query().modify('selectDefault').where('type', type)
}

async function findById(id) {
  return await Location.query().modify('selectDefault').where('id', id)
}

async function findChildrenById(id) {
  return await Location.relatedQuery('children').modify('selectDefault').for(id)
}

export { findAll, findById, findByType, findChildrenById }
