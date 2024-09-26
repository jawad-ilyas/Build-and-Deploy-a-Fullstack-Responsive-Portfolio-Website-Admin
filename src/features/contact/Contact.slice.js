import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiUrl } from "../../constants";


const initialState = {
    contacts: [],
    isLoading: false,
    error: null,
}



export const fetchContact = createAsyncThunk(
    'contact/fetchContact',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${ApiUrl}/contact/fetchContact`)
            console.log("constact : response ?.data ?.data", response?.data?.data)
            return response?.data?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
)

export const createContact = createAsyncThunk(
    'contact/createContact',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${ApiUrl}/contact/createContact`, data)
            console.log("constact : response ?.data ?.data", response?.data?.data)
            return response?.data?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
)

export const deleteContact = createAsyncThunk(
    'contact/deleteContact',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${ApiUrl}/contact/deleteContact/${id}`,)
            console.log("constact : response ?.data ?.data", response?.data?.data)
            return id;
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
)




const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContact.fulfilled, (state, action) => {
                console.log("contact slice , fetch contact , slice ", action.payload)
                state.contacts = action.payload
            })
            .addCase(createContact.fulfilled, (state, action) => {
                console.log("contact slice , fetch contact , slice ", action.payload)
                state.contacts.unshift(action.payload)
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                console.log("contact slice , fetch contact , slice ", action.payload)
                state.contacts = state.contacts.filter(contact => contact?._id !== action.payload)
            })
    }
})

export default contactSlice.reducer