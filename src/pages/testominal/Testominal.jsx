import { useForm } from "react-hook-form";
import placeHolderImg from "../../assets/image.jpeg";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete } from "react-icons/md";
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
    const [isEditing, setIsEditing] = useState(false); // New state to track if we are editing
    const [editId, setEditId] = useState(null); // Track the ID of the testimonial being edited

    // Notifications
    const notifySuccess = (message) => toast.success(message, {
        position: "bottom-right",
        theme: "dark",
    });

    const notifyError = (message) => toast.error(message, {
        position: "bottom-right",
        theme: "dark",
    });

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
                dispatch(deleteTestimonial(id))
                    .then(() => notifySuccess('Testimonial deleted successfully!'))
                    .catch(() => notifyError('Failed to delete testimonial.'));
            }
        });
    };

    useEffect(() => {
        dispatch(fetchTestimonials());
    }, [dispatch]);

    // Handle Form Submission
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("company", data.company);
        formData.append("feedback", data.feedback);
        if (data.testimonialImg[0]) {
            formData.append("testimonialImg", data.testimonialImg[0]); // Only append if a new image is uploaded
        }

        if (isEditing) {
            dispatch(updateTestimonial({ id: editId, updatedData: formData }))
                .then(() => {
                    notifySuccess("Testimonial updated successfully!");
                    resetForm(); // Reset form after successful update
                })
                .catch(() => notifyError("Failed to update testimonial."));
        } else {
            // If not editing, dispatch the create action
            dispatch(createTestimonial(formData))
                .then(() => {
                    reset();
                    setImage(""); // Clear image preview
                    notifySuccess("New testimonial created!");
                })
                .catch(() => notifyError("Failed to create testimonial."));
        }
        setIsSubmitting(false);
    };

    // Handle Image Change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    // Handle Edit Button Click
    const handleEditClick = (testimonial) => {
        setIsEditing(true);
        setEditId(testimonial._id); // Set the ID of the testimonial being edited

        // Populate form fields with existing data
        setValue("name", testimonial.name);
        setValue("company", testimonial.company);
        setValue("feedback", testimonial.feedback);
        setImage(testimonial.testimonialImg); // Set image preview to current testimonial image
    };

    // Reset form after updating/creating
    const resetForm = () => {
        reset();
        setImage("");
        setIsEditing(false);
        setEditId(null);
    };

    return (
        <div className="flex flex-row">
            {/* Sidebar */}
            <div className="w-1/3 h-screen overflow-y-auto p-4">
                {isLoading ? (
                    <Spinner /> // Loading state indicator
                ) : (
                    testimonials?.map((test) => (
                        <div key={test?._id} className="flex flex-row justify-between items-center border border-gray-300 p-2 my-2">
                            <div className="flex flex-row">
                                <img src={test?.testimonialImg} className="size-12 rounded object-cover" alt={test?.company} />
                                <div className="ml-2">
                                    <div className="font-semibold">{test?.company}</div>
                                    <div>{test?.feedback}</div>
                                </div>
                            </div>
                            <div className="px-2 flex flex-row space-x-1">
                                <CiEdit size={30} className="cursor-pointer" onClick={() => handleEditClick(test)} />
                                <MdDelete size={30} className="hover:text-red-600 cursor-pointer" onClick={() => showDeleteConfirmation(test?._id)} />
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Form section */}
            <div className="w-2/3 h-screen p-4 flex flex-col items-center justify-center">
                <h1 className="font-bold text-4xl font-mono mb-3">{isEditing ? "Edit Testimonial" : "Enter A Testimonial"}</h1>
                <form
                    encType="multipart/form-data"
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col w-2/3 space-y-4"
                >
                    <input
                        placeholder="Name"
                        className="border border-black p-2 rounded w-full"
                        {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <span>{errors.name.message}</span>}

                    <input
                        placeholder="Company"
                        className="border border-black p-2 rounded w-full"
                        {...register("company", { required: "Company is required" })}
                    />
                    {errors.company && <span>{errors.company.message}</span>}

                    <textarea
                        placeholder="Feedback"
                        className="border border-black p-2 rounded w-full"
                        {...register("feedback", { required: "Feedback is required" })}
                    />
                    {errors.feedback && <span>{errors.feedback.message}</span>}

                    {/* Image Upload */}
                    <div className="cursor-pointer border p-2">
                        <img src={image ? image : placeHolderImg} alt="Preview" className="w-40 h-40 object-cover" />
                        <input
                            type="file"
                            {...register("testimonialImg", { required: !isEditing ? "Image is required" : false })} // Image required only for new testimonials
                            onChange={handleImageChange}
                        />
                        {errors.testimonialImg && <span>{errors.testimonialImg.message}</span>}
                    </div>
                    <ToastContainer />
                    <button type="submit" className="bg-blue-500 text-white py-2 w-24 rounded" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : isEditing ? "Update" : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Testimonial;
