import api from '../../services/apiService'

// Get all blogs with pagination and filters
export const getBlogsApi = async (options = {}) => {
    const { title, category, tags, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options;
    
    const res = await api.get('/blog/', {
        params: { title, category, tags, page, limit, sortBy, sortOrder },
        withCredentials: true
    });
    return res.data;
}

// Get blog by ID
export const getBlogByIdApi = async (id) => {
    if (!id) throw new Error('Blog ID is required');
    const res = await api.get(`/blog/${id}`, { withCredentials: true });
    return res.data;
}

// Create blog
export const createBlogApi = async (data) => {
    const res = await api.post('/blog/create', data, { withCredentials: true });
    return res.data;
}

// Update blog
export const updateBlogApi = async (id, updateData) => {
    if (!id) throw new Error('Blog ID is required');
    const res = await api.put(`/blog/${id}`, updateData, { withCredentials: true });
    return res.data;
}

// Delete blog
export const deleteBlogApi = async (id) => {
    if (!id) throw new Error('Blog ID is required');
    const res = await api.delete(`/blog/${id}`, { withCredentials: true });
    return res.data;
}
