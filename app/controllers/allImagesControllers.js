import asyncHandler from 'express-async-handler'
import * as db from '../model/index.js'

export const getImages = asyncHandler(async (req, res) => {
    const { rows } = await db.query('SELECT * FROM images')


    return res.json(rows)
})
