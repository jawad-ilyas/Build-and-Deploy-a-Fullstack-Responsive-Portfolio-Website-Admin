import { configureStore } from '@reduxjs/toolkit'
import testimonialReducer from '../features/testominal/testominal.splice.js'
import AboutReducer from '../features/about/About.slice.js'
export const store = configureStore({
    reducer: {
        testimonial: testimonialReducer,
        about: AboutReducer
    },
})