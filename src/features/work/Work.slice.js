import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiUrl } from "../../constants";


export const fetchWork = createAsyncThunk(
    'work/fetchWork',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${ApiUrl}/work/fetchWork`)

            return response?.data?.data
        } catch (error) {
            return rejectWithValue(error.response?.data)
        }
    }
)



export const createWork = createAsyncThunk(
    'work/createWork',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${ApiUrl}/work/createWork`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            return response?.data?.data
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }

    }
)


export const deleteWork = createAsyncThunk(
    'work/deleteWork',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${ApiUrl}/work/deleteWork/${id}`)
            return id;
        } catch (error) {
            console.log("error into the delete work")
            return rejectWithValue(error?.response?.data)
        }
    }
)

export const updateWork = createAsyncThunk(
    'work/updateWork',
    async ({ id, updateData }, { rejectWithValue }) => {

        try {
            const response = await axios.put(`${ApiUrl}/work/updateWork/${id}`, updateData)
            return response?.data?.data
        } catch (error) {
            console.log("error into the udpate work")
            return rejectWithValue(error?.response?.data)
        }
    }
)






const initialState = {
    works: [],
    isLoading: false,
    error: null,
}


const workSlice = createSlice({
    name: "work",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createWork.fulfilled, (state, action) => {
                state.isLoading = false; // Ensure to set this properly
                state.works.unshift(action.payload);
            })
            .addCase(createWork.pending, (state) => {
                state.isLoading = true; // Corrected to true
                state.error = null; // Clear error on pending
            })
            .addCase(createWork.rejected, (state, action) => { // Added rejected case
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchWork.fulfilled, (state, action) => {
                console.log("work slice :: fetch work :: action.payload", action.payload)
                state.isLoading = false; // Ensure to set this properly
                state.works = action.payload;
            })
            .addCase(fetchWork.pending, (state) => {
                state.isLoading = true; // Corrected to true
                state.error = null; // Clear error on pending
            })
            .addCase(fetchWork.rejected, (state, action) => { // Added rejected case
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteWork.fulfilled, (state, action) => {
                state.isLoading = false; // Ensure to set this properly
                state.works = state.works.filter(work => work._id !== action.payload);
            })
            .addCase(deleteWork.pending, (state) => {
                state.isLoading = true; // Corrected to true
                state.error = null; // Clear error on pending
            })
            .addCase(deleteWork.rejected, (state, action) => { // Added rejected case
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateWork.fulfilled, (state, action) => {
                state.isLoading = false; // Ensure to set this properly
                const updateWork = action.payload;
                state.works = state.works.map(work => work._id === updateWork?._id ? updateWork : work);
            })
            .addCase(updateWork.pending, (state) => {
                state.isLoading = true; // Corrected to true
                state.error = null; // Clear error on pending
            })
            .addCase(updateWork.rejected, (state, action) => { // Added rejected case
                state.isLoading = false;
                state.error = action.payload;
            })
    }

})

export default workSlice.reducer