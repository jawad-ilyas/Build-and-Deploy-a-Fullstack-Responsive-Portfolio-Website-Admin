import { useForm } from "react-hook-form";
import placeHolderImg from "../../assets/image.jpeg";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Spinner from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { createTestimonial, deleteTestimonial, fetchTestimonials, updateTestimonial } from "../../features/testominal/testominal.splice.js";

function Testimonial() {
    const dispatch = useDispatch();
    const { testimonials, isLoading } = useSelector((state) => state.testimonial);
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

    const [image, setImage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const notifySuccess = (message) => toast.success(message, {
        position: "bottom-right",
        theme: "dark",
    });

    const notifyError = (message) => toast.error(message, {
        position: "bottom-right",
        theme: "dark",
    });

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
                dispatch(deleteTestimonial(id))
                    .then(() => notifySuccess('Testimonial deleted successfully!'))
                    .catch(() => notifyError('Failed to delete testimonial.'));
            }
        });
    };

    useEffect(() => {
        dispatch(fetchTestimonials());
    }, [dispatch]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("company", data.company);
        formData.append("feedback", data.feedback);
        if (data.testimonialImg[0]) {
            formData.append("testimonialImg", data.testimonialImg[0]);
        }

        if (isEditing) {
            dispatch(updateTestimonial({ id: editId, updatedData: formData }))
                .then(() => {
                    notifySuccess("Testimonial updated successfully!");
                    resetForm();
                })
                .catch(() => notifyError("Failed to update testimonial."));
        } else {
            dispatch(createTestimonial(formData))
                .then(() => {
                    reset();
                    setImage("");
                    notifySuccess("New testimonial created!");
                })
                .catch(() => notifyError("Failed to create testimonial."));
        }
        setIsSubmitting(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleEditClick = (testimonial) => {
        setIsEditing(true);
        setEditId(testimonial._id);
        setValue("name", testimonial.name);
        setValue("company", testimonial.company);
        setValue("feedback", testimonial.feedback);
        setImage(testimonial.testimonialImg);
    };

    const resetForm = () => {
        reset();
        setImage("");
        setIsEditing(false);
        setEditId(null);
    };

    return (
        <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen p-4 lg:p-8">
            {/* Sidebar: List of Testimonials */}
            <div className="lg:w-1/3 w-full p-4">
                <div className="flex flex-col space-y-4">
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        testimonials?.map((test) => (
                            <div
                                key={test?._id}
                                className="flex flex-col bg-white shadow hover:shadow-lg transition-shadow duration-300 p-5 rounded-lg"
                            >
                                <img
                                    src={test?.testimonialImg || placeHolderImg}
                                    className="w-full h-96 object-cover rounded-md mb-4"
                                    alt={test?.company}
                                />
                                <h1 className="text-center text-xl font-bold text-gray-700">
                                    {test?.company}
                                </h1>
                                <p className="text-center text-sm text-gray-500 mt-2">
                                    {test?.feedback}
                                </p>
                                <div className="flex justify-between mt-4">
                                    <button
                                        className="text-green-500 hover:text-green-600 font-semibold"
                                        onClick={() => handleEditClick(test)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-600 font-semibold"
                                        onClick={() => showDeleteConfirmation(test?._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Right Panel: Form */}
            <div className="lg:w-2/3 w-full p-4">
                <div className="max-w-3xl mx-auto bg-white p-6 lg:p-8 rounded-lg shadow-lg">
                    <h1 className="text-center text-2xl font-bold text-gray-700 mb-6">
                        {isEditing ? "Edit Testimonial" : "Enter A Testimonial"}
                    </h1>
                    <form
                        encType="multipart/form-data"
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="name" className="text-lg font-semibold text-gray-700">
                                Name:
                            </label>
                            <input
                                id="name"
                                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                placeholder="Enter name"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && (
                                <span className="text-red-500 text-sm">{errors.name.message}</span>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="company" className="text-lg font-semibold text-gray-700">
                                Company:
                            </label>
                            <input
                                id="company"
                                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                placeholder="Enter company"
                                {...register("company", { required: "Company is required" })}
                            />
                            {errors.company && (
                                <span className="text-red-500 text-sm">{errors.company.message}</span>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="feedback" className="text-lg font-semibold text-gray-700">
                                Feedback:
                            </label>
                            <textarea
                                id="feedback"
                                rows="4"
                                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter feedback"
                                {...register("feedback", { required: "Feedback is required" })}
                            />
                            {errors.feedback && (
                                <span className="text-red-500 text-sm">{errors.feedback.message}</span>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="testimonialImg" className="text-lg font-semibold text-gray-700">
                                Testimonial Image:
                            </label>
                            <div className="flex items-center space-x-4">
                                <img src={image || placeHolderImg} alt="Preview" className="w-20 h-20 object-cover rounded-md" />
                                <input
                                    id="testimonialImg"
                                    type="file"
                                    {...register("testimonialImg", { required: !isEditing ? "Image is required" : false })}
                                    onChange={handleImageChange}
                                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {errors.testimonialImg && (
                                <span className="text-red-500 text-sm">{errors.testimonialImg.message}</span>
                            )}
                        </div>

                        <ToastContainer />

                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : isEditing ? "Update" : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Testimonial;
