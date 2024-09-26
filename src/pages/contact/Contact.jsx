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
    const { contacts } = useSelector(state => state.contact);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const handleOnSubmit = async (data) => {
        try {
            dispatch(createContact(data))
                .then(() => {
                    notifySuccess("New Contact created successfully");
                    reset();
                })
                .catch(() => {
                    notifyError("Error in creating contact");
                });
        } catch (error) {
            console.log("Error in creating contact:", error);
        }
    };

    useEffect(() => {
        dispatch(fetchContact());
    }, [dispatch]);

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
                dispatch(deleteContact(id))
                    .then(() => notifySuccess('Contact deleted successfully!'))
                    .catch(() => notifyError('Failed to delete contact.'));
            }
        });
    };

    return (
        <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen p-4 lg:p-8">
            {/* Sidebar: List of Contacts */}
            <div className="lg:w-1/3 w-full p-4">
                <div className="flex flex-col space-y-4">
                    {contacts?.map((contact) => (
                        <div
                            key={contact?._id}
                            className="flex flex-col bg-white shadow hover:shadow-lg transition-shadow duration-300 p-5 rounded-lg"
                        >
                            <h1 className="text-center text-xl font-bold text-gray-700">
                                {contact?.contactName}
                            </h1>
                            <a
                                href={`mailto:${contact?.contactEmail}`}
                                className="text-center text-blue-500 hover:underline"
                            >
                                {contact?.contactEmail}
                            </a>
                            <p className="text-center text-sm text-gray-500 mt-2">
                                {contact?.contactMessage}
                            </p>
                            <div className="flex justify-center space-x-4 mt-4">
                                <button
                                    className="text-red-500 hover:text-red-600 font-semibold"
                                    onClick={() => showDeleteConfirmation(contact?._id)}
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
                        Contact Information
                    </h1>
                    <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-6">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="contactName" className="text-lg font-semibold text-gray-700">
                                Contact Name:
                            </label>
                            <input
                                id="contactName"
                                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                placeholder="Enter contact name"
                                {...register("contactName", { required: "Contact name is required" })}
                            />
                            {errors.contactName && (
                                <span className="text-red-500 text-sm">{errors.contactName.message}</span>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="contactEmail" className="text-lg font-semibold text-gray-700">
                                Contact Email:
                            </label>
                            <input
                                id="contactEmail"
                                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="email"
                                placeholder="Enter contact email"
                                {...register("contactEmail", { required: "Contact email is required" })}
                            />
                            {errors.contactEmail && (
                                <span className="text-red-500 text-sm">{errors.contactEmail.message}</span>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="contactMessage" className="text-lg font-semibold text-gray-700">
                                Contact Message:
                            </label>
                            <textarea
                                id="contactMessage"
                                rows="6"
                                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter contact message"
                                {...register("contactMessage", { required: "Contact message is required" })}
                            />
                            {errors.contactMessage && (
                                <span className="text-red-500 text-sm">{errors.contactMessage.message}</span>
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

export default Contact;
