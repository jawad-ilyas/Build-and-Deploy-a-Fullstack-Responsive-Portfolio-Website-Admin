import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiUrl } from "../../constants";

export const createExperience = createAsyncThunk(
    'experience/createExperience',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${ApiUrl}/experience/createExperience`, data)
            return response?.data?.data
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }

)

export const fetchExperiences = createAsyncThunk(
    'experience/fetchExperiences',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${ApiUrl}/experience/fetchExperiences`)
            return response?.data?.data
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }

)

export const deleteExperience = createAsyncThunk(
    'experience/deleteExperience',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${ApiUrl}/experience/deleteExperience/${id}`)
            return id
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }

)

export const updateExperience = createAsyncThunk(
    'experience/updateExperience',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            await axios.put(`${ApiUrl}/experience/updateExperience/${id}`, data)
            return id
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }

)
const initialState = {
    experiences: [],
    isLoading: false,
    error: null,
}

const experienceSlice = createSlice({
    name: "experience",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createExperience.fulfilled, (state, action) => {
                state.experiences.unshift(action.payload)
            })
            .addCase(fetchExperiences.fulfilled, (state, action) => {
                state.experiences = action.payload
            })
            .addCase(deleteExperience.fulfilled, (state, action) => {
                state.experiences = state.experiences.filter(work => work?._id !== action.payload)
            })
            .addCase(updateExperience.fulfilled, (state, action) => {
                state.experiences = state.experiences.map(work => work?._id == action.payload?._id ? action.payload : work)
            })
    }
})


export default experienceSlice.reducer