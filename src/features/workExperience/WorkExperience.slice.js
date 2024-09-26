import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiUrl } from "../../constants";



export const createWorkExperience = createAsyncThunk(
  'workExperience/createWorkExperience',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${ApiUrl}/workExperience/createWorkExperience`, data);
      return response?.data?.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  }
)

export const fetchWorkExperience = createAsyncThunk(
  'workExperience/fetchWorkExperience',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${ApiUrl}/workExperience/fetchWorkExperience`);
      return response?.data?.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  }
)

export const deleteWorkExperience = createAsyncThunk(
  'workExperience/deleteWorkExperience',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ApiUrl}/workExperience/deleteWorkExperience/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  }
)

export const updateWorkExperience = createAsyncThunk(
  'workExperience/updateWorkExperience',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${ApiUrl}/workExperience/updateWorkExperience/${id}`, data);
      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  }
)


const initialState = {
  workExperiences: [],
  isLoading: false,
  error: null,
}
const WorkExperienceSlice = createSlice({
  name: 'workExperience',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.
      addCase(createWorkExperience.fulfilled, (state, action) => {
        state.workExperiences.unshift(action.payload)
      })
      .addCase(fetchWorkExperience.fulfilled, (state, action) => {
        state.workExperiences = action.payload
      })
      .addCase(deleteWorkExperience.fulfilled, (state, action) => {
        state.workExperiences = state.workExperiences.filter(works => works._id !== action.payload)
      })
      .addCase(updateWorkExperience.fulfilled, (state, action) => {
        state.workExperiences = state.workExperiences.map(works => works._id == action.payload?._id ? action.payload : works)
      })
  }
})


export default WorkExperienceSlice.reducer