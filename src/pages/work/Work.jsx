import { ContainerForMainSection } from "../../wrapper/index.wrapper";
import { useForm } from "react-hook-form";
import placeHolderImg from "../../assets/image.jpeg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createWork, fetchWork, deleteWork, updateWork } from "../../features/work/Work.slice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Work = () => {
    const dispatch = useDispatch();
    const { works } = useSelector(state => state.work);
    const [image, setImage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const { register, setValue, reset, handleSubmit, formState: { errors } } = useForm();

    const notifySuccess = (message) => toast.success(message, {
        position: "bottom-right",
        theme: "dark"
    });

    const notifyError = (message) => toast.error(message, {
        position: "bottom-right",
        theme: "dark"
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
                dispatch(deleteWork(id))
                    .then(() => notifySuccess('Work deleted successfully!'))
                    .catch(() => notifyError('Failed to delete work.'));
            }
        });
    };

    const onSubmit = (work) => {
        const formData = new FormData();
        formData.append("workName", work.workName);
        formData.append("workDescription", work.workDescription);
        formData.append("workProjectLink", work.workProjectLink);
        formData.append("workCodeLink", work.workCodeLink);
        formData.append("tags", work.tags);

        if (work?.workImgUrl && work?.workImgUrl[0]) {
            formData.append("workImgUrl", work.workImgUrl[0]);
        }

        setIsSubmitting(true);

        if (isEditing) {
            dispatch(updateWork({ id: editId, updateData: formData }))
                .then(() => {
                    reset();
                    setImage("");
                    setIsEditing(false);
                    setEditId(null);
                    notifySuccess("Work updated successfully!");
                })
                .catch(() => notifyError("Failed to update work."));
        } else {
            dispatch(createWork(formData))
                .then(() => {
                    reset();
                    setImage("");
                    notifySuccess("Work created successfully!");
                })
                .catch(() => notifyError("Failed to create work."));
        }

        setIsSubmitting(false);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleEditClick = (work) => {
        setIsEditing(true);
        setEditId(work._id);
        setValue("workName", work.workName);
        setValue("workDescription", work.workDescription);
        setValue("workProjectLink", work.workProjectLink);
        setValue("workCodeLink", work.workCodeLink);
        setValue("tags", work.tags);
    };

    useEffect(() => {
        dispatch(fetchWork());
    }, [dispatch]);

    return (
        <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen p-4 lg:p-8">
            {/* Sidebar: List of Works */}
            <div className="lg:w-1/3 w-full p-4 overflow-y-auto">
                <div className="flex flex-col space-y-4">
                    {works?.map((work) => (
                        <div key={work._id} className="flex flex-col bg-white shadow hover:shadow-lg transition-shadow duration-300 p-5 rounded-lg">
                            <img className="w-full h-60 rounded-md object-cover mb-4" src={work.workImgUrl || placeHolderImg} alt={work.workName} />
                            <h1 className="text-center text-xl font-bold text-gray-700">{work.workName}</h1>
                            <p className="text-center text-sm text-gray-500 mt-2">{work.workDescription}</p>
                            <a href={work.workProjectLink} target="_blank" rel="noopener noreferrer" className="text-center text-blue-500 hover:underline mt-2">Project Link</a>
                            <a href={work.workCodeLink} target="_blank" rel="noopener noreferrer" className="text-center text-blue-500 hover:underline mt-2">Code Link</a>
                            <div className="flex flex-wrap justify-center items-center mt-4 space-x-2">
                                {work.tags[0].split(',').map((tag, index) => (
                                    <span key={index} className="bg-gray-400 text-white px-2 py-1 rounded-md">{tag}</span>
                                ))}
                            </div>
                            <div className="flex justify-center space-x-5 mt-4">
                                <button className="text-green-500 hover:text-green-600 font-semibold" onClick={() => handleEditClick(work)}>Edit</button>
                                <button className="text-red-500 hover:text-red-600 font-semibold" onClick={() => showDeleteConfirmation(work._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Panel: Form */}
            <div className="lg:w-2/3 w-full p-4">
                <ContainerForMainSection className="max-w-3xl mx-auto bg-white p-6 lg:p-8 rounded-lg shadow-lg">
                    <h1 className="text-center text-2xl font-bold text-gray-700 mb-6">{isEditing ? "Edit Work" : "Create New Work"}</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="workName" className="text-lg font-semibold text-gray-700">Work Name:</label>
                            <input id="workName" className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" {...register("workName", { required: "Work Name is required" })} />
                            {errors.workName && <span className="text-red-500 text-sm">{errors.workName.message}</span>}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="workDescription" className="text-lg font-semibold text-gray-700">Work Description:</label>
                            <textarea id="workDescription" rows="6" className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("workDescription", { required: "Work Description is required" })} />
                            {errors.workDescription && <span className="text-red-500 text-sm">{errors.workDescription.message}</span>}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="workProjectLink" className="text-lg font-semibold text-gray-700">Project Link:</label>
                            <input id="workProjectLink" className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" {...register("workProjectLink", { required: "Project Link is required" })} />
                            {errors.workProjectLink && <span className="text-red-500 text-sm">{errors.workProjectLink.message}</span>}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="workCodeLink" className="text-lg font-semibold text-gray-700">Code Link:</label>
                            <input id="workCodeLink" className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" {...register("workCodeLink")} />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="tags" className="text-lg font-semibold text-gray-700">Tags:</label>
                            <input id="tags" className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" {...register("tags", { required: "Tags are required" })} />
                            {errors.tags && <span className="text-red-500 text-sm">{errors.tags.message}</span>}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="workImgUrl" className="text-lg font-semibold text-gray-700">Image:</label>
                            <img src={image || placeHolderImg} alt="Preview" className="w-40 h-40 object-cover mb-4" />
                            <input id="workImgUrl" type="file" {...register("workImgUrl", { required: !isEditing })} onChange={handleImageChange} />
                            {errors.workImgUrl && <span className="text-red-500 text-sm">{errors.workImgUrl.message}</span>}
                        </div>

                        <button type="submit" className="bg-blue-500 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                            {isSubmitting ? "Submitting..." : isEditing ? "Update" : "Submit"}
                        </button>

                        <ToastContainer />
                    </form>
                </ContainerForMainSection>
            </div>
        </div>
    );
};

export default Work;
