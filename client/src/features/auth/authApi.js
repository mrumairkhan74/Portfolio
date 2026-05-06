import api from '../../services/apiService'

export const registerApi = async (data) => {
    const res = await api.post('/user/register', data)
    return res.data
}

export const loginApi = async (data) => {
    const res = await api.post('/user/login', data)
    return res.data
}

export const getMeApi = async () => {
    const res = await api.get('/user/me')
    return res.data
}
export const logoutApi = async () => {
    const res = await api.post('/user/logout')
    return res.data
}