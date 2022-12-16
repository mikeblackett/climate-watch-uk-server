import express from 'express'
import * as variableControllers from '../controllers/variable.controllers.js'
import * as variableValidators from '../validators/variable.validators.js'
var router = express.Router()

router.get('/', variableControllers.getAll)
router.get('/:id', variableValidators.getById, variableControllers.getById)

export default router
