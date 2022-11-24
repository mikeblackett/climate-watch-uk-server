import express from 'express'
import {
  getAllLocations,
  getLocationById,
  getLocationChildrenById,
} from '../api/location.api.js'

var router = express.Router()

router.get('/', getAllLocations)
router.get('/:id', getLocationById)
router.get('/:id/children', getLocationChildrenById)

export default router
