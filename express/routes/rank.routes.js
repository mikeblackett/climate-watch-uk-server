import express from 'express'
import {
  getRankMonth,
  getRankSeason,
  getRankYear,
} from '../controllers/rank.controllers.js'
import {
  validateRankMonth,
  validateRankSeason,
  validateRankYear,
} from '../validators/rank.validators.js'

var router = express.Router()

router.get('/month', validateRankMonth, getRankMonth)
router.get('/season', validateRankSeason, getRankSeason)
router.get('/year', validateRankYear, getRankYear)

export default router
