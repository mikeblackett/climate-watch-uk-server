import express from 'express'
import {
  getAggregateMonth,
  getAggregateSeason,
  getAggregateYear,
} from '../controllers/aggregate.controllers.js'
import {
  validateAggregateMonth,
  validateAggregateSeason,
  validateAggregateYear,
} from '../validators/aggregate.validators.js'

var router = express.Router()

router.get('/month', validateAggregateMonth, getAggregateMonth)
router.get('/season', validateAggregateSeason, getAggregateSeason)
router.get('/year', validateAggregateYear, getAggregateYear)

export default router
