import { ContainerForMainSection } from "../../wrapper/index.wrapper";
import placeHolderImg from "../../assets/image.jpeg";
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSkill, deleteSkill, fetchSkill, updateSkill } from "../../features/skill/Skill.slice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Skill = () => {
    const dispatch = useDispatch();
    const [image, setImage] = useState("");
    const { skills } = useSelector(state => state.skill);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const {
        register,
        reset,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const handleOnSubmit = async (data) => {
        const formData = new FormData();
        formData.append("skillName", data?.skillName);
        if (data?.skillImg[0]) {
            formData.append("skillImg", data?.skillImg[0]);
        }

        if (isEditing) {
            dispatch(updateSkill({ id: editId, data: formData }))
                .then(() => notifySuccess('Skill updated successfully'))
                .catch(() => notifyError('Failed to update skill.'));
        } else {
            dispatch(createSkill(formData))
                .then(() => notifySuccess('New skill created successfully'))
                .catch(() => notifyError('Failed to create skill.'));
        }

        reset();
        setImage("");
        setIsEditing(false);
        setEditId(null);
    };

    useEffect(() => {
        dispatch(fetchSkill());
    }, [dispatch]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

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
                dispatch(deleteSkill(id))
                    .then(() => notifySuccess('Skill deleted successfully!'))
                    .catch(() => notifyError('Failed to delete skill.'));
            }
        });
    };

    const handleEditClick = (skill) => {
        setIsEditing(true);
        setEditId(skill?._id);
        setValue("skillName", skill?.skillName);
        setImage(skill?.skillImg);
    };

    return (
        <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen p-4 lg:p-8">
            {/* Sidebar: List of Skills */}
            <div className="lg:w-1/3 w-full p-4">
                <div className="flex flex-col space-y-4">
                    {skills?.map((skill) => (
                        <div
                            key={skill?._id}
                            className="flex flex-col bg-white shadow hover:shadow-lg transition-shadow duration-300 p-5 rounded-lg"
                        >
                            <img
                                className=" mx-auto  bg-gray-200 size-20 object-cover rounded-md mb-4"
                                src={skill.skillImg || placeHolderImg}
                                alt={skill?.skillName}
                            />
                            <h1 className="text-center text-xl font-bold text-gray-700">
                                {skill?.skillName}
                            </h1>
                            <div className="flex justify-between mt-4">
                                <button
                                    className="text-green-500 hover:text-green-600 font-semibold"
                                    onClick={() => handleEditClick(skill)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-600 font-semibold"
                                    onClick={() => showDeleteConfirmation(skill?._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Panel: Form */}
            <div className="lg:w-2/3 w-full p-4">
                <ContainerForMainSection className="max-w-3xl mx-auto bg-white p-6 lg:p-8 rounded-lg shadow-lg">
                    <h1 className="text-center text-2xl font-bold text-gray-700 mb-6">
                        Skill Information
                    </h1>
                    <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-6">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="skillName" className="text-lg font-semibold text-gray-700">
                                Skill Name:
                            </label>
                            <input
                                id="skillName"
                                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                placeholder="Enter skill name"
                                {...register("skillName", { required: "Skill Name is required" })}
                            />
                            {errors.skillName && (
                                <span className="text-red-500 text-sm">{errors.skillName.message}</span>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="skillImg" className="text-lg font-semibold text-gray-700">
                                Skill Image:
                            </label>
                            <div className="flex items-center space-x-4">
                                <img src={image || placeHolderImg} alt="Preview" className="w-20 h-20 object-cover rounded-md" />
                                <input
                                    id="skillImg"
                                    type="file"
                                    {...register("skillImg", { required: !isEditing ? "Skill image is required" : "" })}
                                    onChange={handleImageChange}
                                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {errors.skillImg && (
                                <span className="text-red-500 text-sm">{errors.skillImg.message}</span>
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
                </ContainerForMainSection>
            </div>
        </div>
    );
};

export default Skill;
