import { useForm } from "react-hook-form";
import placeHolderImg from "../../assets/image.jpeg";
import axios from "axios"
import { ApiUrl } from "../../constants";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
function Testimonial() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const notify = () => toast("New Testominal is created!", {
        position: "bottom-right",
        theme: "dark",

    });



    const deleteTestominal = async (id) => {

        await axios.delete(`${ApiUrl}/api/v1/testominal/deleteTestominal/${id}`)
            .then((response) => {
                console.log(response)
            })
        fetchTestominal();
    }


    // ! sweet alert pop up 
    const showSwal = (id) => {
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
                console.log("delete id : ", id)
                deleteTestominal(id);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }



    // ! image useState 
    const [image, setImage] = useState("");

    // ! testimonial useState 
    const [testimonial, setTestimonial] = useState([])

    // ! form submited data 
    const onSubmit = async (data) => {
        console.log(data, data.testimonialImg[0]);

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("company", data.company);
        formData.append("feedback", data.feedback);
        formData.append("testimonialImg", data.testimonialImg[0]); // Access the uploaded file
        setImage("");  // Preview the image

        // Log formData content
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }

        await axios.post(`${ApiUrl}/api/v1/testominal/createTestominal`, formData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
        fetchTestominal();
        reset();
        notify();
    };

    const fetchTestominal = async () => {

        await axios.get(`${ApiUrl}/api/v1/testominal/fetchTestominal`)
            .then((reponse) => {
                setTestimonial(reponse?.data?.data)
                console.log("reponse", reponse)
            })
            .catch((error) => {
                console.log("testominal jsx :: fetchTestominal :: error :: ", error)
            })
    }

    useEffect(() => {
        fetchTestominal();
    }, [])
    // Function to preview the image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));  // Preview the image
        }
    };


    return (
        <div className="flex flex-row">
            {/* Sidebar */}
            <div className="w-1/3 h-screen overflow-y-auto p-4 ">
                {testimonial?.map((test) => (
                    <div key={test?._id} className="flex flex-row justify-between items-center  border border-gray-300 p-2 my-2">
                        <div className="flex flex-row ">
                            <div className="me-2">
                                <img src={test?.testimonialImg} className="size-12 rounded object-cover" />
                            </div>
                            <div>
                                <div className="font-semibold">{test?.company}</div>
                                <div>{test?.feedback}</div>
                            </div>
                        </div>
                        <div className="px-2 flex flex-row space-x-1">
                            <CiEdit size={30} />
                            <MdDelete size={30} className="hover:text-red-600 cursor-pointer  " onClick={() => showSwal(test?._id)} />

                        </div>
                    </div>
                ))}
            </div>
            {/* Form section */}
            <div className="w-2/3 h-screen p-4 flex flex-col items-center justify-center">
                <h1 className="font-bold text-4xl font-mono mb-3">Enter A Testominal For Jawad Mughal</h1>
                <form
                    encType="multipart/form-data"
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col w-2/3 space-y-4"
                >
                    <input
                        placeholder="Name"
                        className="border border-black p-2 rounded w-full"
                        {...register("name", { required: true })}
                    />
                    {errors.name && <span>This field is required</span>}

                    <input
                        placeholder="Company"
                        className="border border-black p-2 rounded w-full"
                        {...register("company", { required: true })}
                    />
                    {errors.company && <span>This field is required</span>}

                    <input
                        placeholder="Feedback"
                        className="border border-black p-2 rounded w-full"
                        {...register("feedback", { required: true })}
                    />
                    {errors.feedback && <span>This field is required</span>}

                    {/* Image Upload */}
                    <div
                        className="cursor-pointer border p-2"
                    >
                        <img
                            src={image != "" ? image : placeHolderImg}
                            alt="placeholder"
                            className="w-40 h-40 object-cover"
                        />
                        {/* Hidden file input */}
                        <input
                            type="file"
                            {...register("testimonialImg", { required: true })}
                            onChange={handleImageChange} // Handle image change
                        />
                        {errors.testimonialImg && <span>This field is required</span>}
                    </div>
                    <ToastContainer />
                    <input
                        type="submit"
                        className="bg-blue-500 text-white py-2 w-24 rounded"
                    />
                </form>
            </div>
        </div >
    );
}

export default Testimonial;
