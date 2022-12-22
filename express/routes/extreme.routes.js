import express from 'express'
import {
  getMaxMonth,
  getMaxSeason,
  getMaxYear,
  getMinMonth,
  getMinSeason,
  getMinYear,
} from '../controllers/extreme.controllers.js'
import {
  validateExtremeMonth,
  validateExtremeSeason,
  validateExtremeYear,
} from '../validators/extreme.validators.js'

var router = express.Router()

router.get('/max/month', validateExtremeMonth, getMaxMonth)
router.get('/max/season', validateExtremeSeason, getMaxSeason)
router.get('/max/year', validateExtremeYear, getMaxYear)

router.get('/min/month', validateExtremeMonth, getMinMonth)
router.get('/min/season', validateExtremeSeason, getMinSeason)
router.get('/min/year', validateExtremeYear, getMinYear)

export default router
