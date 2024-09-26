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
    const { skills } = useSelector(state => state.skill)
    const [isEditing, setIsEditing] = useState(false); // New state to track if we are editing
    const [editId, setEditId] = useState(null); // Track the ID of the testimonial being edited
    const {
        register,
        reset,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm();


    const handleOnSubmit = async (data) => {
        console.log("data is submit for the skill form ", data)
        const formData = new FormData();
        formData.append("skillName", data?.skillName)
        if (data?.skillImg[0]) {
            formData.append("skillImg", data?.skillImg[0])

        }

        if (isEditing) {
            dispatch(updateSkill({ id: editId, data: formData }))
            reset();
            setImage("")
        }
        else {
            dispatch(createSkill(formData))
            reset();
            setImage("")
            setIsEditing(false)
            setEditId(null)
        }

    }

    useEffect(() => {
        dispatch(fetchSkill())
    }, [])


    const handleImageChange = (event) => {
        console.log("handle skill image event ", event.target.files[0])
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
        else {
            console.log("error into some image selection ")
        }
    }


    const notifySuccess = (message) => toast.success(message, {
        position: "bottom-right",
        theme: "dark"
    })


    const notifyError = (message) => toast.error(message, {
        position: "bottom-right",
        theme: "dark"
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
                dispatch(deleteSkill(id))
                    .then(() => notifySuccess('skill deleted successfully!'))
                    .catch(() => notifyError('Failed to skil Work.'));
            }
        });
    };


    const handleEditClick = (skill) => {
        setIsEditing(true)
        setEditId(skill?._id)
        setValue("skillName", skill?.skillName)
        setValue("skillImg", skill?.skillImg)
        setImage(skill?.skillImg)


    }


    return (
        <div className="flex flex-row">
            <div className="w-1/3  overflow-y-auto p-4">
                <div className="flex flex-col  h-screen">
                    {/* Replace this with your Skill data */}
                    {skills?.map((skill) => (
                        <div key={skill?.skillName} className="flex flex-col space-y-1 bg-gray-200 my-5 shadow hover:shadow-2xl cursor-pointer p-5 rounded-md">
                            <img className=" mx-auto size-32 rounded-full object-cover" src={skill.skillImg} alt="Skill Name" />
                            <div className="flex flex-col">
                                <h1 className="text-center font-semibold text-xl mt-2">{skill?.skillName}</h1>

                            </div>

                            <div className="flex flex-row justify-center items-center space-x-5">
                                <div className="bg-green-400 cursor-pointer w-full rounded-md p-2 text-center font-semibold" onClick={() => handleEditClick(skill)}>Edit</div>
                                <div className="bg-red-400 cursor-pointer w-full rounded-md p-2 text-center font-semibold" onClick={() => showDeleteConfirmation(skill?._id)}>Delete</div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <div className="w-2/3">
                <ContainerForMainSection className="h-screen">
                    <div className="max-w-3xl ">
                        <h1 className="text-center text-2xl font-semibold mb-2">SKill Infromation </h1>

                        <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col w-full space-y-4">
                            <div className="flex flex-col w-full space-y-1">
                                <label htmlFor="skillName">Skill Name:</label>
                                <input id="skillName" className="border border-black p-2 rounded w-full" type="text" {...register("skillName", { required: "Skill Name is required " })} />
                                {errors.skillName && <span className="text-red-700">{errors.skillName.message}</span>}
                            </div>

                            <div className="flex flex-col w-full space-y-1">
                                <label htmlFor="skillImg">
                                    <img src={image !== "" ? image : placeHolderImg} alt="Preview" className="w-40 h-40 object-cover" />
                                </label>
                                <input id="skillImg" type="file"  {...register("skillImg", { required: !isEditing ? "skill image is required field " : "" })} onChange={handleImageChange} />
                                {errors.skillImg && <span className="text-red-700">{errors.skillImg.message}</span>}

                            </div>
                            <ToastContainer />
                            <button type="submit" className="bg-blue-500 text-white py-2 w-24 rounded">Submit</button>
                        </form>
                    </div>
                </ContainerForMainSection>
            </div>
        </div>
    );
}

export default Skill;
