import { useForm } from "react-hook-form";
import placeHolderImg from "../../assets/image.jpeg";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAbout, deleteAbout, fetchAbout, updateAbout } from "../../features/about/About.slice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "../../components/Spinner";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';

const About = () => {
    const { abouts, isLoading } = useSelector((state) => state.about);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [image, setImage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editId, setEditId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const notifySuccess = (message) => toast.success(message, {
        position: "bottom-right",
        theme: "dark"
    });

    const notifyError = (message) => toast.error(message, {
        position: "bottom-right",
        theme: "dark"
    });

    useEffect(() => {
        dispatch(fetchAbout());
    }, [dispatch]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("aboutName", data.aboutName);
        formData.append("aboutDescription", data.aboutDescription);
        if (data.aboutImgUrl && data.aboutImgUrl[0]) {
            formData.append("aboutImgUrl", data.aboutImgUrl[0]);
        }

        if (isEditing) {
            dispatch(updateAbout({ id: editId, updateData: formData }))
                .then(() => {
                    reset();
                    setImage("");
                    setIsEditing(false);
                    setEditId(null);
                    notifySuccess("About is updated");
                })
                .catch(() => {
                    reset();
                    setImage("");
                    setIsEditing(false);
                    setEditId(null);
                    notifyError("Failed to update About");
                });
        } else {
            dispatch(createAbout(formData))
                .then(() => {
                    reset();
                    setImage("");
                    notifySuccess("New About is created");
                })
                .catch(() => {
                    notifyError("Failed to create About");
                });
        }
        setIsSubmitting(false);
    };

    const showDeleteConfirmation = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteAbout(id))
                    .then(() => notifySuccess("About is deleted successfully"))
                    .catch(() => notifyError("Failed to delete About"));
            }
        });
    };

    const handleEditClick = (about) => {
        setIsEditing(true);
        setEditId(about?._id);
        setValue("aboutName", about.aboutName);
        setValue("aboutDescription", about.aboutDescription);
        setImage(about?.aboutImgUrl);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen p-4 lg:p-8">
            {/* Sidebar: List of About Entries */}
            <div className="lg:w-1/3 w-full p-4">
                <div className="flex flex-col space-y-4">
                    {isLoading ? (
                        <Spinner /> // Loading state indicator
                    ) : (
                        abouts?.map((about) => (
                            <div
                                key={about?._id}
                                className="flex flex-col bg-white shadow hover:shadow-lg transition-shadow duration-300 p-5 rounded-lg"
                            >
                                <img
                                    src={about?.aboutImgUrl || placeHolderImg}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                    alt={about?.aboutDescription}
                                />
                                <h1 className="text-center text-xl font-bold text-gray-700">
                                    {about?.aboutName}
                                </h1>
                                <p className="text-center text-sm text-gray-500 mt-2">
                                    {about?.aboutDescription}
                                </p>
                                <div className="flex justify-between mt-4">
                                    <button
                                        className="text-red-500 hover:text-red-600 font-semibold"
                                        onClick={() => showDeleteConfirmation(about?._id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="text-green-500 hover:text-green-600 font-semibold"
                                        onClick={() => handleEditClick(about)}
                                    >
                                        Edit
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
                        About Information
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="aboutName" className="text-lg font-semibold text-gray-700">
                                About Name:
                            </label>
                            <input
                                id="aboutName"
                                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                placeholder="Enter about name"
                                {...register("aboutName", { required: "About Name is required" })}
                            />
                            {errors.aboutName && (
                                <span className="text-red-500 text-sm">{errors.aboutName.message}</span>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="aboutDescription" className="text-lg font-semibold text-gray-700">
                                About Description:
                            </label>
                            <textarea
                                id="aboutDescription"
                                rows="6"
                                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter about description"
                                {...register("aboutDescription", { required: "About Description is required" })}
                            />
                            {errors.aboutDescription && (
                                <span className="text-red-500 text-sm">{errors.aboutDescription.message}</span>
                            )}
                        </div>

                        {/* Image Upload */}
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="aboutImgUrl" className="text-lg font-semibold text-gray-700">
                                About Image:
                            </label>
                            <div className="flex items-center space-x-4">
                                <img src={image ? image : placeHolderImg} alt="Preview" className="w-20 h-20 object-cover rounded-md" />
                                <input
                                    id="aboutImgUrl"
                                    type="file"
                                    {...register("aboutImgUrl", { required: !isEditing ? "About image is required" : "" })}
                                    onChange={handleImageChange}
                                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {errors.aboutImgUrl && (
                                <span className="text-red-500 text-sm">{errors.aboutImgUrl.message}</span>
                            )}
                        </div>

                        <ToastContainer />

                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default About;
