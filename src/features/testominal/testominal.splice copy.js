// src/features/testimonialSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiUrl } from '../../constants';

// Async Thunk for fetching testimonials
export const fetchTestimonials = createAsyncThunk(
    'testimonial/fetchTestimonials',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${ApiUrl}/api/v1/testimonial/fetchTestimonial`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async Thunk for deleting testimonials
export const deleteTestimonial = createAsyncThunk(
    'testimonial/deleteTestimonial',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${ApiUrl}/api/v1/testimonial/deleteTestimonial/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Create testimonial slice
const testimonialSlice = createSlice({
    name: 'testimonial',
    initialState: {
        testimonials: [],
        isLoading: false,
        error: null,
        singleRecordData: []
    },
    reducers: {
        singleRecord: (state, action) => {
            state.singleRecordData = state.testimonials.filter(test => test._id == action.payload)
        }
    },
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
            // Delete Testimonial
            .addCase(deleteTestimonial.fulfilled, (state, action) => {
                state.testimonials = state.testimonials.filter(test => test._id !== action.payload);
            })
            .addCase(deleteTestimonial.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});
export const { singleRecord } = testimonialSlice.actions;
export default testimonialSlice.reducer;
