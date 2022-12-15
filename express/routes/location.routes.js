import express from 'express'
import locationControllers from '../controllers/location.controllers.js'
import locationValidators from '../validators/location.validators.js'

var router = express.Router()

router.get('/', locationValidators.getAll, locationControllers.getAll)
router.get('/:id', locationValidators.getById, locationControllers.getById)
router.get(
  '/:id/children',
  locationValidators.getChildrenById,
  locationControllers.getChildrenById
)

export default router
