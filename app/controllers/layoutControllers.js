import asyncHandler from 'express-async-handler'
import * as db from '../model/index.js'

export const getLayout = asyncHandler(async (req, res) => {
    const { rows } = await db.query('SELECT * FROM layouts')


    return res.json(rows)
})


export const createLayout = asyncHandler(async (req, res) => {

    const { category_id, layout } = req.body

    const now = new Date()

    const { rows } = await db.query('INSERT INTO layouts (category_id, layout) VALUES ($1, $2) RETURNING *', [category_id, layout])


    return res.json(rows)
})


export const updateLayout = asyncHandler(async (req, res) => {

    const { id, category_id, layout } = req.body
    const result = await db.query('UPDATE layouts set category_id = $1, layout = $2 WHERE id = $3', [category_id, layout, id])


    return res.json('Updated')
})

export const deleteLayout = asyncHandler(async (req, res) => {

    const { id } = req.body
    const { rows } = await db.query('DELETE FROM layouts WHERE id = $1', [id])
    return res.json('Deleted')
})




