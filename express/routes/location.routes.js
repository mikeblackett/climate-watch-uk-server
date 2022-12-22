import express from 'express'
import {
  getAllLocations,
  getLocationById,
  getLocationChildrenById,
} from '../controllers/location.controllers.js'
import {
  validateAllLocations,
  validateLocationById,
  validateLocationChildrenById,
} from '../validators/location.validators.js'

var router = express.Router()

router.get('/', validateAllLocations, getAllLocations)
router.get('/:id', validateLocationById, getLocationById)
router.get(
  '/:id/children',
  validateLocationChildrenById,
  getLocationChildrenById
)

export default router
