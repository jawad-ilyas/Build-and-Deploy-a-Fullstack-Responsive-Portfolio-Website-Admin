import { ContainerForMainSection } from "../../wrapper/index.wrapper"
import { useForm } from "react-hook-form"
import placeHolderImg from "../../assets/image.jpeg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createWork, fetchWork, deleteWork, updateWork } from "../../features/work/Work.slice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Work = () => {

    const { works } = useSelector(state => state.work)
    console.log(works)
    const dispatch = useDispatch();
    const {
        register,
        setValue,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const [image, setImage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // New state to track if we are editing
    const [editId, setEditId] = useState(null); // Track the ID of the testimonial being edited
    const notifySuccess = (message) => toast.success(message, {
        "position": "bottom-right",
        "theme": "dark"
    })

    const notifyError = (message) => toast.error(message, {
        "position": "bottom-right",
        "theme": "dark"
    })

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
                dispatch(deleteWork(id))
                    .then(() => notifySuccess('Work deleted successfully!'))
                    .catch(() => notifyError('Failed to delete Work.'));
            }
        });
    };

    const onSubmit = (work) => {
        console.log("work .jsx :: onSubmit :: data ", work)
        const formData = new FormData();
        formData.append("workName", work.workName)
        formData.append("workDescription", work.workDescription)
        formData.append("workProjectLink", work.workProjectLink)
        formData.append("workCodeLink", work.workCodeLink)
        formData.append("tags", work.tags)
        setIsSubmitting(true)
        if (work?.workImgUrl && work?.workImgUrl[0]) {
            formData.append("workImgUrl", work.workImgUrl[0])
        }
        if (isEditing) {
            dispatch(updateWork({ id: editId, updateData: formData }))
                .then(() => {
                    reset();
                    setImage(""); // Clear image preview
                    setEditId(null)
                    notifySuccess("New Work is Successfully  update!");
                })
                .catch(() => {
                    notifyError("Work is Not update Successfully ")

                })
            setIsSubmitting(false)
        }
        else {
            dispatch(createWork(formData))
                .then(() => {
                    reset();
                    setImage(""); // Clear image preview
                    notifySuccess("New Work is Successfully  created!");
                })
                .catch(() => {
                    notifyError("Work is Not create Successfully ")

                })
            setIsSubmitting(false)
        }


    }

    const handleImageChange = (event) => {
        const imageLocalPath = event.target.files[0];
        if (imageLocalPath) {
            setImage(URL.createObjectURL(imageLocalPath));
        }

    }


    const handleEditClick = (work) => {
        setIsEditing(true)
        setEditId(work?.id)
        setValue("workName", work?.workName)
        setValue("workDescription", work?.workDescription)
        setValue("workProjectLink", work?.workProjectLink)
        setValue("workCodeLink", work?.workCodeLink)
        setValue("tags", work?.tags)

    }

    useEffect(() => {
        dispatch(fetchWork())
    }, [dispatch])
    return (
        <div className="flex flex-row ">
            <div className="w-1/3 h-screen overflow-y-auto p-4">
                <div className="flex flex-col w-full ">
                    {works?.map((work) => (
                        <div key={work?._id} className="flex flex-col space-y-1 bg-gray-200 my-5 shadow hover:shadow-2xl cursor-pointer p-5 rounded-md">
                            <img className="w-full h-60 rounded object-cover" src={work?.workImgUrl} alt={work?.workName} />
                            <div className="flex flex-col">
                                <h1 className="text-center font-semibold  text-xl mt-2">{work?.workName}</h1>
                                <p className="text-center font-light text-base">{work?.workDescription}</p>
                                <a target="_blank" href={work?.workProjectLink} className="text-center font-semibold hover:underline  text-xl mt-2">Project Link</a>
                                <a target="_blank" href={work?.workCodeLink} className="text-center font-semibold hover:underline  text-xl mt-2">Code Link</a>
                            </div>
                            <div className="flex flex-row justify-center  items-center space-x-2 flex-wrap space-y-1">
                                {
                                    work?.tags[0].split(",").map((tag) => (
                                        <div key={tag} className="bg-gray-400  w-auto rounded-md p-2 text-center font-semibold">
                                            {tag}
                                        </div>
                                    ))
                                }


                            </div>
                            <div className="flex flex-row justify-center items-center space-x-5">
                                <div className="bg-green-400 cursor-move w-full rounded-md p-2 text-center font-semibold"


                                    onClick={() => handleEditClick(work)}
                                >
                                    Edit
                                </div>
                                <div className="bg-red-400 w-full cursor-help rounded-md p-2 text-center font-semibold" onClick={() => showDeleteConfirmation(work?._id)}>
                                    delete
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <div className="w-2/3">
                <ContainerForMainSection>
                    <div className="max-w-3xl w-full">
                        <form onSubmit={handleSubmit(onSubmit)} className="  flex flex-col w-full space-y-4">

                            <div className="flex flex-col w-full space-y-1">
                                <label htmlFor="workName">Work Name :  </label>
                                <input id="workName" className="border border-black p-2 rounded w-full" type="text" {...register("workName", { required: "Work Name is required " })} />
                                {errors.workName && <span className="text-red-700">{errors.workName.message}</span>}
                            </div>
                            <div className="flex flex-col w-full space-y-1">
                                <label htmlFor="workDescription">Work Description :  </label>
                                <textarea id="workDescription" className="border border-black p-2 rounded w-full" rows="6" {...register("workDescription", { required: "Work Description is required filed " })} />
                                {errors.workDescription && <span className="text-red-700">{errors.workDescription.message}</span>}

                            </div>
                            <div className="flex flex-col w-full space-y-1">
                                <label htmlFor="workProjectLink">Work Project Link : </label>
                                <input id="workProjectLink" className="border border-black p-2 rounded w-full" type="text" {...register("workProjectLink", { required: "Work Project Link is required " })} />
                                {
                                    errors.workProjectLink && <span className="text-red-700">{errors.workProjectLink.message}</span>
                                }
                            </div>
                            <div className="flex flex-col w-full space-y-1">
                                <label htmlFor="tags">Work Project Tags : </label>
                                <input id="tags" className="border border-black p-2 rounded w-full" type="text" {...register("tags", { required: "Work Project Link is required " })} />
                                {
                                    errors.tags && <span className="text-red-700">{errors.tags.message}</span>
                                }
                            </div>
                            <div className="flex flex-col w-full space-y-1">
                                <label htmlFor="workCodeLink">Work Code Link : </label>
                                <input id="workCodeLink" type="text" className="border border-black p-2 rounded w-full" {...register("workCodeLink")} />
                            </div>
                            <div className="flex flex-col w-full space-y-1">


                                <div className="flex flex-col w-full space-y-1">
                                    <label htmlFor="workImgUrl">   <img htmlFor="workImgUrl" src={image ? image : placeHolderImg} alt="Preview" className="w-40 h-40 object-cover" /> </label>
                                    <input id="workImgUrl"
                                        type="file" {...register("workImgUrl", { required: !isEditing ? "Image is required" : "" })}


                                        onChange={(event) => handleImageChange(event)} />
                                    {
                                        errors.workImgUrl && <span className="text-red-700">{errors.workImgUrl.message}</span>
                                    }
                                </div>
                            </div>
                            <button type="submit" className="bg-blue-500 text-white py-2 w-24 rounded" >
                                {isSubmitting === true ? "Submitting ...." : "submit"}
                            </button>
                            <ToastContainer />
                        </form>
                    </div>
                </ContainerForMainSection>
            </div>
        </div>
    )
}

export default Work