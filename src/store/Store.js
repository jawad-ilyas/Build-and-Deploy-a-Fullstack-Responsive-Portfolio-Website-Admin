import { configureStore } from '@reduxjs/toolkit'
import testimonialReducer from '../features/testominal/testominal.splice.js'
import AboutReducer from '../features/about/About.slice.js'
import WorkReducer from '../features/work/Work.slice.js'
import SkillReducer from '../features/skill/Skill.slice.js'
import ContactReducer from '../features/contact/Contact.slice.js'
import BrandReducer from '../features/brand/Brand.slice.js'
import WorkExperienceReducer from '../features/workExperience/WorkExperience.slice.js'
import experienceReducer from '../features/experience/Experience.slice.js'
export const store = configureStore({
    reducer: {
        testimonial: testimonialReducer,
        about: AboutReducer,
        work: WorkReducer,
        skill: SkillReducer,
        contact: ContactReducer,
        brand: BrandReducer,
        workExperience: WorkExperienceReducer,
        experience: experienceReducer
    },
}) 