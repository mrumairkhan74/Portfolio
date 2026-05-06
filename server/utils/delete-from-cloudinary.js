const cloudinary = require('./cloudinary')



const deleteFromCloudinary = async (publicId) => {
    try {
        if (!publicId) {
            throw new Error('Public ID is required for deletion');
        }

        const result = await cloudinary.uploader.destroy(publicId);
        
        if (result.result === 'ok') {
            console.log(`Successfully deleted image: ${publicId}`);
            return { success: true, result };
        } else {
            console.warn(`Deletion returned: ${result.result} for ${publicId}`);
            return { success: false, result };
        }
    } catch (error) {
        console.error(`Error deleting image ${publicId}:`, error);
        throw error;
    }
};

const deleteMultipleFromCloudinary = async (publicIds) => {
    try {
        if (!publicIds || publicIds.length === 0) {
            throw new Error('At least one public ID is required');
        }

        const result = await cloudinary.api.delete_resources(publicIds);
        return { success: true, result };
    } catch (error) {
        console.error('Error deleting multiple images:', error);
        throw error;
    }
};


module.exports = {
    deleteFromCloudinary,
    deleteMultipleFromCloudinary
};