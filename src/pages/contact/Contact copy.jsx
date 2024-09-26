import { ContainerForMainSection } from "../../wrapper/index.wrapper";
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createContact, fetchContact, deleteContact } from "../../features/contact/Contact.slice";

const Contact = () => {
    const dispatch = useDispatch();
    const { contacts } = useSelector(state => state.contact)

    const {
        register,
        reset,

        handleSubmit,
        formState: { errors }
    } = useForm();


    const handleOnSubmit = async (data) => {
        console.log("data is submit for the contact form ", data)

        try {
            dispatch(createContact(data))
                .then(() => {
                    notifySuccess("New Contact is created ")
                    reset();
                })
                .catch(() => {
                    notifyError("error into create Contact")
                })
        } catch (error) {
            console.log("issue into create contact ", error)
        }

    }

    useEffect(() => {
        dispatch(fetchContact())
    }, [])





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
                dispatch(deleteContact(id))
                    .then(() => notifySuccess('contact deleted successfully!'))
                    .catch(() => notifyError('Failed to delete contact .'));
            }
        });
    };




    return (
        <div className="flex flex-row">
            <div className="w-1/3  overflow-y-auto p-4">
                <div className="flex flex-col  h-screen">
                    {/* Replace this with your Skill data */}
                    {contacts?.map((contact) => (
                        <div key={contact?.contactName} className="flex flex-col space-y-1 bg-gray-200 my-5 shadow hover:shadow-2xl cursor-pointer p-5 rounded-md">

                            <div className="flex flex-col">
                                <h1 className="text-center font-semibold text-xl mt-2">{contact?.contactName}</h1>
                                <a href={`mailto:contact?.contactEmail`} className="text-center font-normal text-xl mt-2 hover:underline">{contact?.contactEmail}</a>
                                <h1 className="text-center font-light text-xl mt-2">{contact?.contactMessage}</h1>
                            </div>

                            <div className="flex flex-row justify-center items-center space-x-5">

                                <div className="bg-red-400 cursor-pointer w-full rounded-md p-2 text-center font-semibold" onClick={() => showDeleteConfirmation(contact?._id)}>Delete</div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <div className="w-2/3">
                <ContainerForMainSection className="h-screen">
                    <div className="max-w-3xl w-full">
                        <h1 className="text-center text-2xl font-semibold mb-2">Contact Infromation </h1>

                        <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col w-full space-y-4">
                            <div className="flex flex-col w-full space-y-1">
                                <label htmlFor="contactName">Contact Name:</label>
                                <input id="contactName" className="border border-black p-2 rounded w-full" type="text" {...register("contactName", { required: "contact Name is required " })} />
                                {errors.contactName && <span className="text-red-700">{errors.contactName.message}</span>}
                            </div>
                            <div className="flex flex-col w-full space-y-1">
                                <label htmlFor="contactEmail">Contact Email:</label>
                                <input id="contactEmail" className="border border-black p-2 rounded w-full" type="email" {...register("contactEmail", { required: "contact Name is required " })} />
                                {errors.contactEmail && <span className="text-red-700">{errors.contactEmail.message}</span>}
                            </div>
                            <div className="flex flex-col w-full space-y-1">
                                <label htmlFor="contactMessage">Contact Message:</label>
                                <textarea id="contactMessage" rows="6" className="border border-black p-2 rounded w-full"  {...register("contactMessage", { required: "contact Name is required " })} />
                                {errors.contactMessage && <span className="text-red-700">{errors.contactMessage.message}</span>}
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

export default Contact;
