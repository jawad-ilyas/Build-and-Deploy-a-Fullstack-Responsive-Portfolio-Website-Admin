import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createWorkExperience, deleteWorkExperience, fetchWorkExperience, updateWorkExperience } from "../../features/workExperience/WorkExperience.slice";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateWork } from "../../features/work/Work.slice";
const WorkExperience = () => {
    const { workExperiences } = useSelector((state) => state.workExperience);
    const [isEditing, setIsEditing] = useState(false); // New state to track if we are editing
    const [editId, setEditId] = useState(null); // Track the ID of the testimonial being edited
    const dispatch = useDispatch();
    const {
        register,
        reset,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleOnSubmit = (data) => {
        console.log("Data submitted for the work experience form", data);
        if (isEditing) {
            dispatch(updateWorkExperience({ id: editId, data }))
        }
        else {

            dispatch(createWorkExperience(data));
        }
        reset();
    };

    // Sweet Alert Popup for Deletion
    const showDeleteConfirmation = (id) => {
        withReactContent(Swal).fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteWorkExperience(id))
                    .then(() => notifySuccess('work Experience deleted successfully!'))
                    .catch(() => notifyError('Failed to delete Work Experience .'));
            }
        });
    };
    const notifySuccess = (message) => toast.success(message, {
        position: "bottom-right",
        theme: "dark"
    })
    const notifyError = (message) => toast.error(message, {
        position: "bottom-right",
        theme: "dark"
    })

    const handleUpdateCase = (work) => {
        // Logic for update case
        setIsEditing(true)
        setEditId(work?._id)
        setValue("workExperienceName", work?.workExperienceName)
        setValue("workExperienceCompany", work?.workExperienceCompany)
        setValue("workExperienceDescription", work?.workExperienceDescription)
    };

    useEffect(() => {
        dispatch(fetchWorkExperience());
    }, [dispatch]);

    return (
        <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen p-4 lg:p-8">
            {/* Left Panel: List of Work Experiences */}
            <div className="lg:w-1/3 w-full p-4">
                <div className="flex flex-col space-y-4">
                    {workExperiences?.map((workExperience) => (
                        <div
                            key={workExperience?.workExperienceName}
                            className="flex flex-col bg-white shadow hover:shadow-lg transition-shadow duration-300 p-5 rounded-lg"
                        >
                            <h1 className="text-center text-xl font-bold text-gray-700">
                                {workExperience?.workExperienceName}
                            </h1>
                            <h2 className="text-center text-md text-gray-600">
                                {workExperience?.workExperienceCompany}
                            </h2>
                            <p className="text-center text-sm text-gray-500">
                                {workExperience?.workExperienceDescription}
                            </p>
                            <div className="flex justify-between mt-4">
                                <button
                                    className="text-red-500 hover:text-red-600 font-semibold"
                                    onClick={() => showDeleteConfirmation(workExperience?._id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="text-green-500 hover:text-green-600 font-semibold"
                                    onClick={() => handleUpdateCase(workExperience)}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Panel: Form */}
            <div className="lg:w-2/3 w-full p-4">
                <div className="max-w-3xl mx-auto bg-white p-6 lg:p-8 rounded-lg shadow-lg">
                    <h1 className="text-center text-2xl font-bold text-gray-700 mb-6">
                        Work Experience Information
                    </h1>
                    <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-6">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="workExperienceName" className="text-lg font-semibold text-gray-700">
                                Work Experience Name:
                            </label>
                            <input
                                id="workExperienceName"
                                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                placeholder="Enter your work experience name"
                                {...register("workExperienceName", { required: "Work Experience Name is required" })}
                            />
                            {errors.workExperienceName && (
                                <span className="text-red-500 text-sm">{errors.workExperienceName.message}</span>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="workExperienceCompany" className="text-lg font-semibold text-gray-700">
                                Work Experience Email:
                            </label>
                            <input
                                id="workExperienceCompany"
                                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="email"
                                placeholder="Enter your work experience email"
                                {...register("workExperienceCompany", { required: "Work Experience Email is required" })}
                            />
                            {errors.workExperienceCompany && (
                                <span className="text-red-500 text-sm">{errors.workExperienceCompany.message}</span>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="workExperienceDescription" className="text-lg font-semibold text-gray-700">
                                Work Experience Description:
                            </label>
                            <textarea
                                id="workExperienceDescription"
                                rows="6"
                                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter a description"
                                {...register("workExperienceDescription", { required: "Work Experience Description is required" })}
                            />
                            {errors.workExperienceDescription && (
                                <span className="text-red-500 text-sm">{errors.workExperienceDescription.message}</span>
                            )}
                        </div>
                        <ToastContainer />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WorkExperience;
