import express from 'express'
import variableControllers from '../controllers/variable.controllers.js'
import variableValidators from '../validators/variable.validators.js'
var router = express.Router()

router.get('/', variableControllers.getAll)
router.get('/:id', variableValidators.getById, variableControllers.getById)

export default router
