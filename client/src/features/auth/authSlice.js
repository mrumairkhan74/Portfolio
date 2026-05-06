import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from './authApi'

export const registerThunk = createAsyncThunk('/user/register', async (data, { rejectWithValue }) => {
    try {
        const res = await api.registerApi(data)
        return res.user
    } catch (error) {
        return rejectWithValue(error?.response?.data || { message: error.message || 'Registration failed' })
    }
})

export const loginThunk = createAsyncThunk('/user/login', async (data, { rejectWithValue }) => {
    try {
        const res = await api.loginApi(data)
        return res.user
    } catch (error) {
        return rejectWithValue(error?.response?.data || { message: error.message || 'Login failed' })
    }
})

export const getMeThunk = createAsyncThunk('/user/get-me', async (_, { rejectWithValue }) => {
    try {
        const res = await api.getMeApi()
        return res.user
    } catch (error) {
        return rejectWithValue(error?.response?.data || { message: error.message || 'Failed to get user' })
    }
})

// Add logout thunk
export const logoutThunk = createAsyncThunk('/user/logout', async (_, { rejectWithValue }) => {
    try {
        await api.logoutApi()
        return null
    } catch (error) {
        return rejectWithValue(error?.response?.data || { message: error.message || 'Logout failed' })
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null, // Changed from [] to null
        loading: false,
        error: null,
        isAuthenticated: false // Add this for easy checking
    },
    reducers: {
        // Add clear error reducer
        clearError: (state) => {
            state.error = null
        },
        // Add logout reducer for immediate logout
        logout: (state) => {
            state.user = null
            state.isAuthenticated = false
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.isAuthenticated = true
                state.error = null
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.loading = false
                state.user = null
                state.isAuthenticated = false
                state.error = action.payload?.message || 'Registration failed'
            })
            
            // Login
            .addCase(loginThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.isAuthenticated = true
                state.error = null
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false
                state.user = null
                state.isAuthenticated = false
                state.error = action.payload?.message || 'Login failed'
            })
            
            // Get Me
            .addCase(getMeThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getMeThunk.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.isAuthenticated = true
                state.error = null
            })
            .addCase(getMeThunk.rejected, (state, action) => {
                state.loading = false
                state.user = null
                state.isAuthenticated = false
                state.error = action.payload?.message || 'Authentication failed'
            })
            
            // Logout
            .addCase(logoutThunk.fulfilled, (state) => {
                state.user = null
                state.isAuthenticated = false
                state.error = null
                state.loading = false
            })
            .addCase(logoutThunk.rejected, (state, action) => {
                state.error = action.payload?.message || 'Logout failed'
                state.loading = false
            })
    }
})

// Export actions
export const { clearError, logout } = authSlice.actions

// Selectors for easier access
export const selectUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectAuthLoading = (state) => state.auth.loading
export const selectAuthError = (state) => state.auth.error

export default authSlice.reducer