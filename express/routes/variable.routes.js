import express from 'express'
import variableController from '../controllers/variable.controller.js'

var router = express.Router()

router.get('/', variableController.getAll)
router.get(
  '/:id',
  variableController.validate('getById'),
  variableController.getById
)

export default router
