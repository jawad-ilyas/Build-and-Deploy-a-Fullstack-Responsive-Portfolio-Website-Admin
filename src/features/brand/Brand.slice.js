import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { ApiUrl } from "../../constants";



const initialState = {
    brands: [],
    isLoading: false,
    error: null,
}



export const createBrand = createAsyncThunk(
    'brand/createBrand',
    async (data, { rejectWithValue }) => {

        try {
            const response = await axios.post(`${ApiUrl}/brand/createBrand`, data)
            return response?.data?.data
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }

)

export const fetchBrand = createAsyncThunk(
    'brand/fetchBrand',
    async (_, { rejectWithValue }) => {

        try {
            const response = await axios.get(`${ApiUrl}/brand/fetchBrand`)
            return response?.data?.data
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }

)

export const updateBrand = createAsyncThunk(
    'brand/updateBrand',
    async ({ id, data }, { rejectWithValue }) => {

        try {
            const response = await axios.put(`${ApiUrl}/brand/updateBrand/${id}`, data)
            return response?.data?.data
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }

)
export const deleteBrand = createAsyncThunk(
    'brand/deleteBrand',
    async (id, { rejectWithValue }) => {

        try {
            await axios.delete(`${ApiUrl}/brand/deleteBrand/${id}`)
            return id
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }

)

const brandSlice = createSlice({
    name: "brand",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(createBrand.fulfilled, (state, action) => {
            state.brands.unshift(action.payload)
        })
        builder.addCase(fetchBrand.fulfilled, (state, action) => {
            state.brands = action.payload
        })
        builder.addCase(deleteBrand.fulfilled, (state, action) => {
            state.brands = state.brands.filter(brand => brand._id !== action.payload)
        })
        builder.addCase(updateBrand.fulfilled, (state, action) => {
            const updateBrand = action.payload
            state.brands = state.brands.map(brand => brand._id === updateBrand?._id ? updateBrand : brand)
        })
    }

})


export default brandSlice.reducer