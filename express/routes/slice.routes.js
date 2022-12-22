import express from 'express'
import {
  getSliceMonth,
  getSliceSeason,
  getSliceYear,
} from '../controllers/slice.controllers.js'
import {
  validateSliceMonth,
  validateSliceSeason,
  validateSliceYear,
} from '../validators/slice.validators.js'

var router = express.Router()

router.get('/month', validateSliceMonth, getSliceMonth)
router.get('/season', validateSliceSeason, getSliceSeason)
router.get('/year', validateSliceYear, getSliceYear)

export default router
