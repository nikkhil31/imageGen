import asyncHandler from 'express-async-handler'
import * as db from '../model/index.js'

export const getCategory = asyncHandler(async (req, res) => {
    const { rows } = await db.query('SELECT * FROM categories')


    return res.json(rows)
})


export const createCategory = asyncHandler(async (req, res) => {

    const { slug, image_count, maintitle_count, subtitle_count } = req.body

    const now = new Date()

    const { rows } = await db.query('INSERT INTO categories (slug, image_count,maintitle_count,subtitle_count,updated_at,created_at) VALUES ($1, $2,$3,$4,$5,$6) RETURNING *', [slug, image_count, maintitle_count, subtitle_count, null, now])


    return res.json(rows)
})


export const updateCategory = asyncHandler(async (req, res) => {

    const { id, slug, image_count, maintitle_count, subtitle_count } = req.body
    const now = new Date()
    const result = await db.query('UPDATE categories set slug = $1, image_count = $2,maintitle_count = $3,subtitle_count = $4,updated_at = $5 WHERE id = $6', [slug, image_count, maintitle_count, subtitle_count, now, id])


    return res.json('Updated')
})

export const deleteCategory = asyncHandler(async () => {

    const { id } = req.body
    const { rows } = await db.query('DELETE FROM categories WHERE id = $1', [id])
    return res.json('Deleted')
})




