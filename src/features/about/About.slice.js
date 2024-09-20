import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiUrl } from "../../constants";

const initialState = {
    abouts: [],
    isLoading: false,
    error: null,
};

export const updateAbout = createAsyncThunk(
    'about/updateAbout',
    async ({ id, updateData }, { rejectWithValue }) => {
        console.log("about slice :: update about  :: updateData", updateData)
        try {
            const response = await axios.put(`${ApiUrl}/about/updateAbout/${id}`,
                updateData
            )
            return response?.data?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)



export const deleteAbout = createAsyncThunk(
    'about/deleteAbout',
    async (id, { rejectWithValue }) => {
        console.log("about slice :: delete about :: id you want to delete ", id)
        try {
            await axios.delete(`${ApiUrl}/about/deleteAbout/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const fetchAbout = createAsyncThunk(
    'about/fetchAbout',
    async (_, { rejectWithValue }) => {

        try {
            const response = await axios.get(`${ApiUrl}/about/fetchAbout`);
            console.log("data we fetched from the fetch about api ", response)
            return response?.data?.data;  // Make sure to return the data

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const createAbout = createAsyncThunk(
    'about/createAbout',
    async (aboutData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${ApiUrl}/about/createAbout`, aboutData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response?.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'An unexpected error occurred.' });
        }
    }
);

const AboutSlice = createSlice({
    name: "about",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(createAbout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.abouts.unshift(action.payload);
            })
            .addCase(createAbout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchAbout.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAbout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.abouts = action.payload;
            })

            .addCase(deleteAbout.fulfilled, (state, action) => {
                console.log("delete fullfill case is called : ", action.payload)
                state.isLoading = false;
                state.abouts = state.abouts.filter(about => about._id != action.payload)
            })
            .addCase(deleteAbout.rejected, (state, action) => {
                state.isLoading = false,
                    state.error = action.payload;
            })

            .addCase(updateAbout.fulfilled, (state, action) => {
                console.log("update fullfill case is called : ", action.payload)
                let updateAbout = action.payload;
                state.isLoading = false;
                state.abouts = state.abouts.map((about) => about._id === updateAbout._id ? updateAbout : about)

            })
            .addCase(updateAbout.rejected, (state, action) => {
                state.isLoading = false,
                    state.error = action.payload;
            })
    }
});

export default AboutSlice.reducer;
