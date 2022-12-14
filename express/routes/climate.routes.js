import express from 'express'
import snapshotController from '../controllers/climate.controller.js'

var router = express.Router()

router.get(
  '/',
  snapshotController.validate('getSnapshot'),
  snapshotController.getSnapshot
)

export default router
