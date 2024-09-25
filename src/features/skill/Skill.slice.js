import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiUrl } from "../../constants";








const initialState = {
    skills: [],
    isLoading: false,
    error: null,
}




export const createSkill = createAsyncThunk(

    'skill/createSkill',
    async (data, { rejectWithValue }) => {
        console.log("data of the skill create slice create async thunk ", data)
        try {
            const response = await axios.post(`${ApiUrl}/skill/createSkill`, data);
            return response?.data?.data
        } catch (error) {
            console.log("error into the create skill create async thunk ")
            return rejectWithValue(error?.response?.data)
        }
    }
)

export const fetchSkill = createAsyncThunk(
    'skill/fetchSkill',
    async (_, { rejectWithValue }) => {

        try {
            const response = await axios.get(`${ApiUrl}/skill/fetchSkill`)
            return response?.data?.data
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
)

export const deleteSkill = createAsyncThunk(
    'skill/deleteSkill',
    async (id, { rejectWithValue }) => {

        try {
            await axios.delete(`${ApiUrl}/skill/deleteSkill/${id}`)
            return id;
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
)


export const updateSkill = createAsyncThunk(
    'skill/updateSkill',
    async ({ id, data }, { rejectWithValue }) => {

        try {
            const response = await axios.put(`${ApiUrl}/skill/updateSkill/${id}`, data);
            return response?.data?.data
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
)

const skillSlice = createSlice({
    name: "skill",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createSkill.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.error = null
                state.skills.unshift(action.payload); // Adding the new skill to the skills array

            })
            .addCase(fetchSkill.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.error = null
                state.skills = action.payload // Adding the new skill to the skills array

            })
            .addCase(deleteSkill.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.error = null
                state.skills = state.skills.filter(skill => skill?._id !== action.payload)// Adding the new skill to the skills array

            })
            .addCase(updateSkill.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.error = null
                const updateSkill = action.payload;
                state.skills = state.skills.map(skill => skill?._id == updateSkill._id ? updateSkill : skill)// Adding the new skill to the skills array

            })
    }

})


export default skillSlice.reducer