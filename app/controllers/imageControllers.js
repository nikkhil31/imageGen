import * as db from '../model/index.js'
import { handleImages } from "./imageKitController.js"
import { handleLayout } from "./layoutController.js"
import { handleFabric } from "./fabricController.js"

export const createImage = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM layouts WHERE category_id = $1', [req.body.category])

        const modifications = await handleImages(rows, req.body.modifications)

        const allLayouts = rows.map(row => ({ layouts: handleLayout(JSON.parse(row.layout), modifications), category_id: row.category_id, layout_id: row.id }))

        // clg

        const images = await handleFabric(allLayouts)

        const intertedData = []

        for (const img of images) {
            const { rows } = await db.query('INSERT INTO images (category_id, layout_id,image) VALUES ($1, $2,$3) RETURNING *', [img.category_id, img.layout_id, img.uploadedImage.url])

            intertedData.push(rows[0])
        }

        return res.json({ status: 'success', modifications: req.body.modifications, images: intertedData })

    } catch (error) {
        return res.json(error.stack)

    }

    // const images = req.body.modifications.filter(image => image?.src)
    // const response = handleImages(images)


}