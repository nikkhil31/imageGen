import imagekit from "../config/imagekit.js";

export const uploadFile = (m) => {
    return new Promise((resolve, reject) => {

        return imagekit.upload({
            file: m.src, //required
            fileName: `${m.name}.jpg` //required
        }, function (error, result) {
            if (error) reject(error);

            // console.log(result)
            return resolve(result)
        })

    })
}


const resizeImage = (img, width, height) => {
    return new Promise((resolve, reject) => {
        // console.log(image)
        return resolve({
            ...img, src: imagekit.url({
                src: img.src,
                transformation: [{
                    "height": height,
                    "width": width,
                    "focus": "auto"
                }]
            }),
            json: row
        })



    })
}


export const handleImages = async (rows, modifications) => {
    const imagedata = await Promise.all(modifications
        .map(m => {
            return m?.src ? uploadFile(m).then(res => ({ ...m, src: res.url })) : m
        })

    )

    // const imagedata = await Promise.all(imagedata1.map(img => {
    //     return resizeImage(rows, img).then(res => res)
    // }))


    // console.log(imagedata)


    return imagedata

}



