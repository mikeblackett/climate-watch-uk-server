import express from 'express'
import {
  getAllSpacesApi,
  getAllCountriesApi,
  getAllRegionsApi,
  getSpaceByIdApi,
  getSpaceChildrenApi,
} from '../controllers/space.controller.js'

var router = express.Router()

router.get('/spaces', getAllSpacesApi)
router.get('/spaces/:id', getSpaceByIdApi)
router.get('/:id/children', getSpaceChildrenApi)
router.get('/country', getAllCountriesApi)
router.get('/region', getAllRegionsApi)

export default router
