import { configureStore } from '@reduxjs/toolkit'

import authReducers from '../features/auth/authSlice'
import projectReducers from '../features/projects/projectSlice'
import blogReducers from '../features/blog/blogSlice'
export const store = configureStore({
    reducer: {
        auth: authReducers,
        projects: projectReducers,
        blogs: blogReducers
    }
})

