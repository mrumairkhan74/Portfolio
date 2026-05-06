import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './projectApi';

// Fetch all projects with pagination and filters
export const fetchAllProjectsThunk = createAsyncThunk(
    'projects/all-projects',
    async (filters = {}, { rejectWithValue }) => {
        try {
            const res = await api.getProjectsApi(filters);
            // Return both projects and pagination info
            return {
                projects: res.projects,
                pagination: res.pagination
            };
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Fetch single project by ID
export const fetchProjectByIdThunk = createAsyncThunk(
    'projects/project-id',
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.getProjectByIdApi(id);
            return res.project;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Create new project
export const createProjectThunk = createAsyncThunk(
    'projects/create-project',
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.createProjectApi(data);
            return res.project;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Update existing project
export const updateProjectThunk = createAsyncThunk(
    'projects/update-project',
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const res = await api.updateProjectApi(id, updateData);
            return res.project; // Assuming backend returns updated project
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Delete project
export const deleteProjectThunk = createAsyncThunk(
    'projects/delete-project',
    async (id, { rejectWithValue }) => {
        try {
            await api.deleteProjectApi(id);
            return id; // Return the deleted project's ID for removal from state
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Initial state
const initialState = {
    projects: [],
    currentProject: null,
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalProjects: 0,
        limit: 10
    },
    loading: false,
    error: null,
    filters: {
        title: '',
        page: 1,
        limit: 10
    }
};

// Create slice
const projectSlice = createSlice({
    name: 'projects',
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
        clearCurrentProject: (state) => {
            state.currentProject = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch all projects
            .addCase(fetchAllProjectsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllProjectsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload.projects;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchAllProjectsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Fetch single project
            .addCase(fetchProjectByIdThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjectByIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.currentProject = action.payload;
            })
            .addCase(fetchProjectByIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Create project
            .addCase(createProjectThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProjectThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.projects.unshift(action.payload); // Add to beginning of array
                state.pagination.totalProjects += 1;
            })
            .addCase(createProjectThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Update project
            .addCase(updateProjectThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProjectThunk.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.projects.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.projects[index] = action.payload;
                }
                if (state.currentProject?._id === action.payload._id) {
                    state.currentProject = action.payload;
                }
            })
            .addCase(updateProjectThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Delete project
            .addCase(deleteProjectThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProjectThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = state.projects.filter(p => p._id !== action.payload);
                state.pagination.totalProjects -= 1;
                if (state.currentProject?._id === action.payload) {
                    state.currentProject = null;
                }
            })
            .addCase(deleteProjectThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

// Export actions
export const { clearError, setFilters, resetFilters, clearCurrentProject } = projectSlice.actions;

// Selectors
export const selectAllProjects = (state) => state.projects.projects;
export const selectCurrentProject = (state) => state.projects.currentProject;
export const selectPagination = (state) => state.projects.pagination;
export const selectProjectsLoading = (state) => state.projects.loading;
export const selectProjectsError = (state) => state.projects.error;
export const selectFilters = (state) => state.projects.filters;

// Export reducer
export default projectSlice.reducer;