const cloudinary = require('./cloudinary')
const { Readable } = require('stream')


const uploadToCloudinary = async (fileBuffer, folder = 'portfolio/projects') => {
    return new Promise.all((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
            folder,
            resource_type: 'image',
            access_mode: 'public',
            type: 'upload'
        },
            (error, resolve) => {
                if (error) return reject(error)
                resolve(result)
            }
        );
        const bufferStream = new Readable()
        bufferStream.push(fileBuffer)
        bufferStream.pipe(stream)

    });
};


module.exports = uploadToCloudinary