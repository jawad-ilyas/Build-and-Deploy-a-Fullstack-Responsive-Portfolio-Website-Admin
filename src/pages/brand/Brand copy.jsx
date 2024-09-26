import { useForm } from "react-hook-form";
import placeHolderImg from "../../assets/image.jpeg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrand, deleteBrand, fetchBrand, updateBrand } from "../../features/brand/Brand.slice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Brand = () => {
    const dispatch = useDispatch();
    const { brands } = useSelector(state => state.brand)
    const [image, setImage] = useState("")
    const [isEditing, setIsEditing] = useState(false); // New state to track if we are editing
    const [editId, setEditId] = useState(null); // Track the ID of the testimonial being edited
    const {
        register,
        reset,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    const handleOnSubmit = (data) => {
        console.log("data is submitted for the contact form ", data);
        const formData = new FormData();
        formData.append("brandName", data?.brandName)

        if (data?.brandImgUrl[0]) {
            formData.append("brandImgUrl", data?.brandImgUrl[0])

        }
        
        if (isEditing) {
            dispatch(updateBrand({ id: editId, data: formData }))
                .then((response) => {
                    successToast("update Brand is successfully ");
                    console.log("brand jsx :: then :: response?.pyaload", response?.payload)
                }).catch(() => {
                    errorToast("update  brand is not  successfully ")
                })
            setImage("")
            reset();
            setIsEditing(false)
            setEditId(null)
        }
        else {
            dispatch(createBrand(formData))
                .then((response) => {
                    successToast("New Brand is created ");
                    console.log("brand jsx :: then :: response?.pyaload", response?.payload)
                }).catch(() => {
                    errorToast("new brand is not created successfully ")
                })
            setImage("")
            reset();
        }

    };
    const showDeleteConfirmation = (id) => {
        dispatch(deleteBrand(id))
            .then(() => {
                successToast("brand is delete successfully")
            })
            .catch(() => {
                errorToast("delete brand is not successfully ")
            })
    }

    const handleImageChange = (event) => {

        const file = event?.target?.files[0];
        if (file) {
            setImage(URL.createObjectURL(file))
        }
    }


    const handleUpdateCase = (brand) => {
        setIsEditing(true)
        setEditId(brand?._id)
        setValue("brandName", brand.brandName)
        setValue("brandImgUrl", brand.brandImgUrl)
        setImage(brand.brandImgUrl)
    }

    const successToast = (message) => toast.success(message, {
        position: 'bottom-right',
        theme: 'dark'
    })

    const errorToast = (message) => toast.error(message, {
        position: 'bottom-right',
        theme: 'dark'
    })

    useEffect(() => {
        dispatch(fetchBrand())
    }, [])

    return (
        <div className="flex flex-row">
            <div className="w-1/3  overflow-y-auto p-4">
                <div className="flex flex-col  h-screen">
                    {/* Replace this with your Skill data */}
                    {brands?.map((brand) => (
                        <div key={brand?.brandName} className="flex flex-col space-y-1 bg-gray-200 my-5 shadow hover:shadow-2xl cursor-pointer p-5 rounded-md">

                            <div className="flex flex-col">
                                <h1 className="text-center font-semibold pb-4 text-xl mt-2">{brand?.brandName}</h1>
                                <img className=" mx-auto size-20 bg-white  rounded-full object-contain" src={brand.brandImgUrl} alt="Skill Name" />

                            </div>

                            <div className="flex flex-row justify-center items-center space-x-5 pt-4">

                                <div className="bg-red-400 cursor-pointer w-full rounded-md p-2 text-center font-semibold" onClick={() => showDeleteConfirmation(brand?._id)}>Delete</div>

                                <div className="bg-green-400 cursor-pointer w-full rounded-md p-2 text-center font-semibold" onClick={() => handleUpdateCase(brand)}>Edit</div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <div className="w-2/3">
                <div className="h-screen">
                    <div className="max-w-3xl w-full p-10">
                        <h1 className="text-center text-2xl font-semibold mb-2">Brand Information</h1>

                        <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col w-full space-y-4">
                            <div className="flex flex-col w-full space-y-1">
                                <label htmlFor="brandName">Brand Name:</label>
                                <input id="brandName" className="border border-black p-2 rounded w-full" type="text" {...register("brandName", { required: "Contact Name is required" })} />
                                {errors.brandName && <span className="text-red-700">{errors.brandName.message}</span>}
                            </div>
                            <div className="flex flex-col w-full space-y-1">
                                <label htmlFor="brandImgUrl" className="cursor-pointer">
                                    <img src={image !== "" ? image : placeHolderImg} alt="Brand Image " className="size-60 rounded-md object-cover" />
                                </label>
                                <input id="brandImgUrl" className="border border-black p-2 rounded w-full" type="file" {...register("brandImgUrl", { required: !isEditing ? "Brand Image is required" : "" })} onChange={(event) => handleImageChange(event)} />
                                {errors.brandImgUrl && <span className="text-red-700">{errors.brandImgUrl.message}</span>}
                            </div>

                            <ToastContainer />
                            <button type="submit" className="bg-blue-500 text-white py-2 w-24 rounded">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Brand