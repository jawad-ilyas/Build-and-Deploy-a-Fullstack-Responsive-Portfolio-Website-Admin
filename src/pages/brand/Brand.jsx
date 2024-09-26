import { useForm } from "react-hook-form";
import placeHolderImg from "../../assets/image.jpeg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrand, deleteBrand, fetchBrand, updateBrand } from "../../features/brand/Brand.slice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Brand = () => {
    const dispatch = useDispatch();
    const { brands } = useSelector(state => state.brand);
    const [image, setImage] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const { register, reset, handleSubmit, setValue, formState: { errors } } = useForm();

    const handleOnSubmit = (data) => {
        const formData = new FormData();
        formData.append("brandName", data?.brandName);
        if (data?.brandImgUrl[0]) {
            formData.append("brandImgUrl", data?.brandImgUrl[0]);
        }

        if (isEditing) {
            dispatch(updateBrand({ id: editId, data: formData }))
                .then(() => successToast("Brand updated successfully"))
                .catch(() => errorToast("Failed to update brand"));
            reset();
            setImage("");
            setIsEditing(false);
            setEditId(null);
        } else {
            dispatch(createBrand(formData))
                .then(() => successToast("New brand created"))
                .catch(() => errorToast("Failed to create brand"));
            reset();
            setImage("");
        }
    };

    const showDeleteConfirmation = (id) => {
        dispatch(deleteBrand(id))
            .then(() => successToast("Brand deleted successfully"))
            .catch(() => errorToast("Failed to delete brand"));
    };

    const handleImageChange = (event) => {
        const file = event?.target?.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleUpdateCase = (brand) => {
        setIsEditing(true);
        setEditId(brand?._id);
        setValue("brandName", brand.brandName);
        setImage(brand.brandImgUrl);
    };

    const successToast = (message) => toast.success(message, {
        position: 'bottom-right',
        theme: 'dark'
    });

    const errorToast = (message) => toast.error(message, {
        position: 'bottom-right',
        theme: 'dark'
    });

    useEffect(() => {
        dispatch(fetchBrand());
    }, [dispatch]);

    return (
        <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen p-4 lg:p-8">
            {/* Sidebar: List of Brands */}
            <div className="lg:w-1/3 w-full p-4">
                <div className="flex flex-col space-y-4">
                    {brands?.map((brand) => (
                        <div
                            key={brand?._id}
                            className="flex flex-col bg-white shadow hover:shadow-lg transition-shadow duration-300 p-5 rounded-lg"
                        >
                            <img
                                src={brand?.brandImgUrl || placeHolderImg}
                                className="w-full h-40 object-cover rounded-md mb-4"
                                alt={brand?.brandName}
                            />
                            <h1 className="text-center text-xl font-bold text-gray-700">
                                {brand?.brandName}
                            </h1>
                            <div className="flex justify-between mt-4">
                                <button
                                    className="text-red-500 hover:text-red-600 font-semibold"
                                    onClick={() => showDeleteConfirmation(brand?._id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="text-green-500 hover:text-green-600 font-semibold"
                                    onClick={() => handleUpdateCase(brand)}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Panel: Form */}
            <div className="lg:w-2/3 w-full p-4">
                <div className="max-w-3xl mx-auto bg-white p-6 lg:p-8 rounded-lg shadow-lg">
                    <h1 className="text-center text-2xl font-bold text-gray-700 mb-6">
                        Brand Information
                    </h1>
                    <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-6">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="brandName" className="text-lg font-semibold text-gray-700">
                                Brand Name:
                            </label>
                            <input
                                id="brandName"
                                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                placeholder="Enter brand name"
                                {...register("brandName", { required: "Brand Name is required" })}
                            />
                            {errors.brandName && (
                                <span className="text-red-500 text-sm">{errors.brandName.message}</span>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="brandImgUrl" className="text-lg font-semibold text-gray-700">
                                Brand Image:
                            </label>
                            <div className="flex items-center space-x-4">
                                <img src={image ? image : placeHolderImg} alt="Preview" className="w-20 h-20 object-cover rounded-md" />
                                <input
                                    id="brandImgUrl"
                                    type="file"
                                    {...register("brandImgUrl", { required: !isEditing ? "Brand image is required" : "" })}
                                    onChange={handleImageChange}
                                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {errors.brandImgUrl && (
                                <span className="text-red-500 text-sm">{errors.brandImgUrl.message}</span>
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
                </div>
            </div>
        </div>
    );
};

export default Brand;
