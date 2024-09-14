import { configureStore } from '@reduxjs/toolkit'
import  testimonialReducer  from '../features/testominal/testominal.splice.js'
export const store = configureStore({
    reducer: {
        testimonial: testimonialReducer,
    },
})