import express from 'express'
const router = express.Router()

import * as ImageControllers from '../controllers/imageControllers.js'
import * as CategoryControllers from '../controllers/categoryControllers.js'
import * as LayoutControllers from '../controllers/layoutControllers.js'
import * as AllImagesControllers from '../controllers/allImagesControllers.js'


router.post('/createImage', ImageControllers.createImage)

router
    .route('/category')
    .get(CategoryControllers.getCategory)
    .post(CategoryControllers.createCategory)
    .put(CategoryControllers.updateCategory)
    .delete(CategoryControllers.deleteCategory)


router
    .route('/layout')
    .get(LayoutControllers.getLayout)
    .post(LayoutControllers.createLayout)
    .put(LayoutControllers.updateLayout)
    .delete(LayoutControllers.deleteLayout)

router
    .get('/images', AllImagesControllers.getImages)


export default router