import express from 'express'
import {
  getAllVariablesApi,
  getVariableByIdApi,
} from '../controllers/variable.controller.js'

var router = express.Router()

router.get('/', getAllVariablesApi)
router.get('/:id', getVariableByIdApi)

export default router
