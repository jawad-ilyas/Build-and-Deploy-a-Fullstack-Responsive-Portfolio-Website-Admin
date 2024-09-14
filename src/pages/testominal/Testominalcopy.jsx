import { useForm } from "react-hook-form";
import placeHolderImg from "../../assets/image.jpeg";
import axios from "axios";
import { ApiUrl } from "../../constants";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Spinner from "../../components/Spinner";

function Testimonial() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const [image, setImage] = useState("");
    const [testimonials, setTestimonials] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Notifications
    const notifySuccess = (message) => toast.success(message, {
        position: "bottom-right",
        theme: "dark",
    });

    const notifyError = (message) => toast.error(message, {
        position: "bottom-right",
        theme: "dark",
    });

    const deleteTestimonial = async (id) => {
        try {
            await axios.delete(`${ApiUrl}/api/v1/testimonial/deleteTestimonial/${id}`);
            setTestimonials(testimonials.filter(test => test._id !== id));
            notifySuccess("Testimonial deleted successfully!");
        } catch (error) {
            notifyError("Failed to delete testimonial.", error);
        }
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
                deleteTestimonial(id);
            }
        });
    };

    // Fetch Testimonials
    const fetchTestimonials = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${ApiUrl}/api/v1/testimonial/fetchTestimonial`);
            setTestimonials(response.data.data);
        } catch (error) {
            notifyError("Failed to fetch testimonials.", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    // Handle Form Submission
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("company", data.company);
        formData.append("feedback", data.feedback);
        formData.append("testimonialImg", data.testimonialImg[0]);

        try {
            await axios.post(`${ApiUrl}/api/v1/testimonial/createTestimonial`, formData);
            fetchTestimonials(); // Update state after successful submission
            reset();
            setImage(""); // Clear image preview
            notifySuccess("New testimonial created!");
        } catch (error) {
            notifyError("Failed to create testimonial.", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle Image Change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
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
                                <CiEdit size={30} />
                                <MdDelete size={30} className="hover:text-red-600 cursor-pointer" onClick={() => showDeleteConfirmation(test?._id)} />
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Form section */}
            <div className="w-2/3 h-screen p-4 flex flex-col items-center justify-center">
                <h1 className="font-bold text-4xl font-mono mb-3">Enter A Testimonial</h1>
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
                            {...register("testimonialImg", { required: "Image is required" })}
                            onChange={handleImageChange}
                        />
                        {errors.testimonialImg && <span>{errors.testimonialImg.message}</span>}
                    </div>
                    <ToastContainer />
                    <button type="submit" className="bg-blue-500 text-white py-2 w-24 rounded" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Testimonial;
