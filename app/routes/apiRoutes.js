import express from 'express'
const router = express.Router()

import * as ImageControllers from '../controllers/imageControllers.js'


router.post('/createImage',ImageControllers.createImage)


export default router