import express from 'express'
import {
  getAllLocationsApi,
  getAllCountriesApi,
  getAllRegionsApi,
  getLocationByIdApi,
  getLocationChildrenApi,
} from '../controllers/location.controller.js'

var router = express.Router()

router.get('/locations', getAllLocationsApi)
router.get('/locations/:id', getLocationByIdApi)
router.get('/:id/children', getLocationChildrenApi)
router.get('/country', getAllCountriesApi)
router.get('/region', getAllRegionsApi)

export default router
