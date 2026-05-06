// blogSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './blogApi';

// Thunks
export const fetchAllBlogsThunk = createAsyncThunk(
    'blogs/all-blogs',
    async (filters = {}, { rejectWithValue }) => {
        try {
            const res = await api.getBlogsApi(filters);
            return {
                blogs: res.blogs,
                pagination: res.pagination
            };
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchBlogByIdThunk = createAsyncThunk(
    'blogs/blog-id',
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.getBlogByIdApi(id);
            return res.blog;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createBlogThunk = createAsyncThunk(
    'blogs/create-blog',
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.createBlogApi(data);
            return res.blog;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateBlogThunk = createAsyncThunk(
    'blogs/update-blog',
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const res = await api.updateBlogApi(id, updateData);
            return res.blog;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteBlogThunk = createAsyncThunk(
    'blogs/delete-blog',
    async (id, { rejectWithValue }) => {
        try {
            await api.deleteBlogApi(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// export const likeBlogThunk = createAsyncThunk(
//     'blogs/like-blog',
//     async (id, { rejectWithValue }) => {
//         try {
//             const res = await api.likeBlogApi(id);
//             return res.blog;
//         } catch (error) {
//             return rejectWithValue(error.response?.data || error.message);
//         }
//     }
// );

// Initial state
const initialState = {
    blogs: [],
    currentBlog: null,
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalBlogs: 0,
        limit: 10
    },
    loading: false,
    error: null,
    filters: {
        title: '',
        category: '',
        tags: '',
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'desc'
    }
};

// Slice
const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        resetFilters: (state) => {
            state.filters = initialState.filters;
        },
        clearCurrentBlog: (state) => {
            state.currentBlog = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch all blogs
            .addCase(fetchAllBlogsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllBlogsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload.blogs;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchAllBlogsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Fetch single blog
            .addCase(fetchBlogByIdThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogByIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.currentBlog = action.payload;
            })
            .addCase(fetchBlogByIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Create blog
            .addCase(createBlogThunk.fulfilled, (state, action) => {
                state.blogs.unshift(action.payload);
                state.pagination.totalBlogs += 1;
            })
            
            // Update blog
            .addCase(updateBlogThunk.fulfilled, (state, action) => {
                const index = state.blogs.findIndex(b => b._id === action.payload._id);
                if (index !== -1) {
                    state.blogs[index] = action.payload;
                }
                if (state.currentBlog?._id === action.payload._id) {
                    state.currentBlog = action.payload;
                }
            })
            
            // Delete blog
            .addCase(deleteBlogThunk.fulfilled, (state, action) => {
                state.blogs = state.blogs.filter(b => b._id !== action.payload);
                state.pagination.totalBlogs -= 1;
            })
            
            // Like blog
            // .addCase(likeBlogThunk.fulfilled, (state, action) => {
            //     const index = state.blogs.findIndex(b => b._id === action.payload._id);
            //     if (index !== -1) {
            //         state.blogs[index] = action.payload;
            //     }
            //     if (state.currentBlog?._id === action.payload._id) {
            //         state.currentBlog = action.payload;
            //     }
            // });
    }
});

export const { clearError, setFilters, resetFilters, clearCurrentBlog } = blogSlice.actions;

// Selectors
export const selectAllBlogs = (state) => state.blogs.blogs;
export const selectCurrentBlog = (state) => state.blogs.currentBlog;
export const selectBlogPagination = (state) => state.blogs.pagination;
export const selectBlogsLoading = (state) => state.blogs.loading;
export const selectBlogsError = (state) => state.blogs.error;
export const selectBlogFilters = (state) => state.blogs.filters;

export default blogSlice.reducer;