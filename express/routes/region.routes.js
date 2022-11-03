import express from 'express'
import {
  getAllRegionsApi,
  getRegionByIsoApi,
} from '../controllers/region.controller.js'

var router = express.Router()

router.get('/', getAllRegionsApi)
router.get('/:iso', getRegionByIsoApi)

export default router
