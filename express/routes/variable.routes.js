import express from 'express'
import {
  getAllVariablesApi,
  getVariableBySlugApi,
} from '../controllers/variable.controller.js'

var router = express.Router()

router.get('/', getAllVariablesApi)
router.get('/:slug', getVariableBySlugApi)

export default router
