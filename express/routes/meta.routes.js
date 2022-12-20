import express from 'express'
import * as locationControllers from '../controllers/location.controllers.js'
import * as locationValidators from '../validators/location.validators.js'
import * as variableControllers from '../controllers/variable.controllers.js'
import * as variableValidators from '../validators/variable.validators.js'

var router = express.Router()

router.get('/locations', locationValidators.getAll, locationControllers.getAll)
router.get(
  '/locations/:id',
  locationValidators.getById,
  locationControllers.getById
)
router.get(
  '/locations/:id/children',
  locationValidators.getChildrenById,
  locationControllers.getChildrenById
)

router.get('/variables', variableControllers.getAll)
router.get(
  '/variables/:id',
  variableValidators.getById,
  variableControllers.getById
)

export default router
