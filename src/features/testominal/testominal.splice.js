import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"
import { ApiUrl } from '../../constants'
const initialState = {
    testimonials: [],
    isLoading: false,
    error: null,
}



export const fetchTestimonials = createAsyncThunk(
    'testimonial/fetchTestimonials',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${ApiUrl}/testimonial/fetchTestimonial`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);

        }
    }
)


export const deleteTestimonial = createAsyncThunk(
    'testimonial/deleteTestimonial',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${ApiUrl}/testimonial/deleteTestimonial/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);

        }
    }
)
// Async Thunk for creating a testimonial
export const createTestimonial = createAsyncThunk(
    'testimonial/createTestimonial',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${ApiUrl}/testimonial/createTestimonial`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const updateTestimonial = createAsyncThunk(
    'testimonial/updateTestimonial',
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            console.log("testimonial splice :: updateTestimonial :: updateData ", updatedData)
            const response = await axios.put(`${ApiUrl}/testimonial/updateTestimonial/${id}`, updatedData);
            return response.data.data;  // The updated testimonial
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const testominalSlice = createSlice({
    name: 'testominal',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            // Fetch Testimonials
            .addCase(fetchTestimonials.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTestimonials.fulfilled, (state, action) => {
                state.isLoading = false;
                state.testimonials = action.payload;
            })
            .addCase(fetchTestimonials.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Create Testimonial
            .addCase(createTestimonial.fulfilled, (state, action) => {
                state.testimonials.unshift(action.payload);
            })
            .addCase(createTestimonial.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Delete Testimonial
            .addCase(deleteTestimonial.fulfilled, (state, action) => {
                state.testimonials = state.testimonials.filter(test => test._id !== action.payload);
            })
            .addCase(deleteTestimonial.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Update Testimonial
            .addCase(updateTestimonial.fulfilled, (state, action) => {
                const updatedTestimonial = action.payload;
                state.testimonials = state.testimonials.map((test) => test._id === updatedTestimonial._id ? updatedTestimonial : test );
            })
            .addCase(updateTestimonial.rejected, (state, action) => {
                state.error = action.payload;
            });

    }

})


export default testominalSlice.reducer