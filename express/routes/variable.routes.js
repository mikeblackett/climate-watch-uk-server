import express from 'express'
import { getAllVariables, getVariableById } from '../api/variable.api.js'

var router = express.Router()

router.get('/', getAllVariables)
router.get('/:id', getVariableById)

export default router
