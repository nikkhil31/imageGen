import { fabric } from 'fabric'
import { uploadFile } from './imageKitController.js';


const createImage = (layout) => {
    return new Promise((resolve, reject) => {
        const canvas = new fabric.Canvas(null, { width: layout.template.canvasWidth, height: layout.template.canvasHeight });
        return canvas.loadFromJSON(JSON.stringify(layout.template), async function () {
            canvas.renderAll();
            const imageData = canvas.toDataURL();
            return resolve(imageData)
        })
    })
}


export const handleFabric = async (layouts) => {
    return new Promise((resolve, reject) => {
        try {
            const allimages = layouts.map(async ({ layouts: layout, category_id, layout_id }) => {
                try {

                    const imageData = await createImage(layout)
                    const uploadedImage = await uploadFile({ src: imageData, name: layout.name })

                    return { uploadedImage, category_id, layout_id }

                } catch (error) {
                    return error
                }
            })



            Promise.all(allimages).then(function (results) {
                return resolve(results)
            })

        } catch (error) {
            reject(error)
        }
    })
}

