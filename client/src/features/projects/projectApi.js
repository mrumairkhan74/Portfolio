import api from '../../services/apiService'




export const getProjectsApi = async (options = {}) => {
    const { title, page = 1, limit = 10 } = options;

    const res = await api.get('/project/', {
        params: { title, page, limit }, // Axios automatically converts this to query string
        withCredentials: true
    });
    return res.data;
}

// get by id
export const getProjectByIdApi = async (id) => {
    if (!id) throw new Error('Project ID is required');
    const res = await api.get(`/project/${id}`, { withCredentials: true });
    return res.data;
}

// create Project

export const createProjectApi = async (data) => {
    const res = await api.post('/project/create', data, { withCredentials: true })
    return res.data
}


// update Project
export const updateProjectApi = async (id, updateData) => {
    const res = await api.put(`/project/${id}`, updateData, { withCredentials: true })
    return res.data
}


export const deleteProjectApi = async (id) => {
    const res = await api.delete(`/project/${id}`, { withCredentials: true })
    return res.data
}