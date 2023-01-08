import imagekit from "../config/imagekit.js"

export const handleLayout = (layout, modifications) => {
    const objects = layout.template.objects

    const revisedLayout = objects.map(layout => {

        let copiedLayout = layout
        const modification = modifications.find(m => m.name === layout.name)

        if (modification?.src) {
            const width = layout.width
            const height = layout.height
            const placeholderImage = layout?.metadata?.src || layout?.src

            const imageSrc = imagekit.url({
                src: modification.src,
                transformation: [{
                    "height": height,
                    "width": width,
                    "focus": "auto"
                }]
            })

            copiedLayout = JSON.parse(replaceAll(JSON.stringify(layout), placeholderImage, imageSrc))

            delete modification.src
        }

        return { ...copiedLayout, ...modification }
    })

    layout.template.objects = revisedLayout

    delete layout.thumbnail

    return layout
}


function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}


function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}