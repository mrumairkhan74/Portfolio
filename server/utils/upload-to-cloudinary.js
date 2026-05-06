const cloudinary = require('./cloudinary')
const { Readable } = require('stream')

const uploadToCloudinary = (fileBuffer, folder = 'portfolio/projects') => {
    return new Promise((resolve, rejects) => {
        const stream =  cloudinary.uploader.upload_stream({
            folder,
            resource_type: "image",
            quality: "auto:best",
            upload: "public"
        },
            (error, result) => {
                if (error) return rejects(error);
                resolve(result)
            })
        const bufferStream = new Readable()
        bufferStream.push(fileBuffer)
        bufferStream.push(null)
        bufferStream.pipe(stream)
    })

}



module.exports = uploadToCloudinary