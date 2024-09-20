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
import withReactContent from 'sweetalert2-react-content';
const About = () => {

    const { abouts, isLoading } = useSelector(state => state.about)
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [image, setImage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editId, setEditId] = useState(null); // Track the ID of the testimonial being edited
    const [isEditing, setIsEditing] = useState(false); // New state to track if we are editing

    const notifySuccess = (message) => toast.success(message, {
        position: "bottom-right",
        theme: "dark"
    })

    const notifyError = (message) => toast.error(message, {
        position: "bottom-right",
        theme: "dark"
    })
    useEffect(() => {
        dispatch(fetchAbout())
    }, [dispatch])

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        console.log("form data ")
        console.log("About us :: onSubmit :: data", data)
        const formData = new FormData();
        formData.append("aboutName", data.aboutName)
        formData.append("aboutDescription", data.aboutDescription)
        if (data.aboutImgUrl && data.aboutImgUrl[0]) {
            formData.append("aboutImgUrl", data.aboutImgUrl[0]); // Only append if a new image is uploaded
        }
        // Log FormData before sending it
        console.log("FormData contents before updating:");
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        if (isEditing) {
            dispatch(updateAbout({ id: editId, updateData: formData }))
                .then(() => {
                    reset();
                    setImage("")
                    setIsEditing(false);
                    setEditId(null)
                    notifySuccess(" About is updated");
                })
                .catch(() => {
                    reset();
                    setImage("")
                    setIsEditing(false);
                    setEditId(null)
                    notifyError("Failed to update About ")
                })

        }
        else {
            dispatch(createAbout(formData))
                .then(() => {
                    reset();
                    setImage("");
                    notifySuccess("New About is created");
                })
                .catch(() => {
                    notifyError("Failed to create About ")
                })
        }
        setIsSubmitting(false)

    }

    // ! handle Delete Card 
    const showDeleteConfirmation = (id) => {
        console.log("about js :: showDeleteConfirmation :: id", id)
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
                    .then(() => (notifySuccess(" About is deleted successfully")))
                    .catch(() => (notifyError("about is not delete have some issue ")))

            }
        });
    }


    // ! handleEditClick
    const handleEditClick = (about) => {
        setIsEditing(true)
        setEditId(about?._id)
        console.log("about js :: handle  edit click :: about", about)
        setValue("aboutName", about.aboutName);
        setValue("aboutDescription", about.aboutDescription);
        setImage(about?.aboutImgUrl)
    }

    // Handle Image Change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };



    return (
        <div className="flex flex-row">
            {/* sidebar */}

            <div className="w-1/3 h-screen overflow-y-auto p-4">
                {isLoading ? (
                    <Spinner /> // Loading state indicator
                ) : (
                    abouts?.map((about) => (
                        <div key={about?._id} className="flex flex-row justify-between items-center border border-gray-300 p-2 my-2">
                            <div className="flex flex-row">
                                <img src={about?.aboutImgUrl} className="size-12 rounded object-cover" alt={about?.aboutDescription} />
                                <div className="ml-2">
                                    <div className="font-semibold">{about?.aboutName}</div>
                                    <div>{about?.aboutDescription}</div>
                                </div>
                            </div>
                            <div className="px-2 flex flex-row space-x-1">
                                <CiEdit size={30} className="cursor-pointer" onClick={() => handleEditClick(about)} />
                                <MdDelete size={30} className="hover:text-red-600 cursor-pointer" onClick={() => showDeleteConfirmation(about?._id)} />
                            </div>
                        </div>
                    ))
                )}
            </div>
            {/* main container */}
            <main className="bg-gray-200 lg:w-2/3 lg:h-full">
                <div className="w-full h-screen flex flex-col items-center justify-center">
                    <h1 className="text-center text-2xl font-semibold mb-2">I know That Good Design means Good Business </h1>
                    <form

                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col w-2/3 space-y-4"
                    >
                        <input
                            placeholder="About Name"
                            className="border border-black p-2 rounded w-full"
                            {...register("aboutName", { required: "About Name is required" })}
                        />
                        {errors.aboutName && <span>{errors.aboutName.message}</span>}

                        <input
                            placeholder="About Description"
                            className="border border-black p-2 rounded w-full"
                            {...register("aboutDescription", { required: "About Description is required" })}
                        />
                        {errors.aboutDescription && <span>{errors.aboutDescription.message}</span>}



                        {/* Image Upload */}
                        <div className="cursor-pointer border p-2">
                            <img src={image ? image : placeHolderImg} alt="Preview" className="w-40 h-40 object-cover" />
                            <input
                                type="file"
                                {...register("aboutImgUrl", { required: !isEditing ? "About ImgUrl is required" : "" })} // Image required only for new aboutimonials
                                onChange={(event) => handleImageChange(event)}
                            />
                            {errors.aboutImgUrl && <span>{errors.aboutImgUrl.message}</span>}
                        </div>
                        <ToastContainer />

                        <button type="submit" className="bg-blue-500 text-white py-2 w-24 rounded" >
                            {isSubmitting ? "Submitting ...." : "submit"}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default About