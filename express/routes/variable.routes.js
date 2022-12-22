import express from 'express'
import {
  getAllVariables,
  getVariableById,
} from '../controllers/variable.controllers.js'
import { validateVariableById } from '../validators/variable.validators.js'
var router = express.Router()

router.get('/', getAllVariables)
router.get('/:id', validateVariableById, getVariableById)

export default router
