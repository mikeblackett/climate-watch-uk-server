import express from 'express'
import locationController from '../controllers/location.controller.js'

var router = express.Router()

router.get(
  '/',
  locationController.validate('getAll'),
  locationController.getAll
)
router.get(
  '/:id',
  locationController.validate('getById'),
  locationController.getById
)
router.get('/:id/children', locationController.getChildrenById)

export default router
