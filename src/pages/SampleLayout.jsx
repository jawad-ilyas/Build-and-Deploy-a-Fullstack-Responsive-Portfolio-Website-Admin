import { useForm } from "react-hook-form";

const SampleLayout = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const handleOnSubmit = (data) => {
        console.log("data is submitted for the contact form ", data);
        reset();
    };

    return (
        <div className="flex flex-row">
            <div className="w-2/3">
                <div className="h-screen">
                    <div className="max-w-3xl w-full">
                        <h1 className="text-center text-2xl font-semibold mb-2">Contact Information</h1>

                        <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col w-full space-y-4">
                            <div className="flex flex-col w-full space-y-1">
                                <label htmlFor="contactName">Contact Name:</label>
                                <input id="contactName" className="border border-black p-2 rounded w-full" type="text" {...register("contactName", { required: "Contact Name is required" })} />
                                {errors.contactName && <span className="text-red-700">{errors.contactName.message}</span>}
                            </div>
                            <div className="flex flex-col w-full space-y-1">
                                <label htmlFor="contactEmail">Contact Email:</label>
                                <input id="contactEmail" className="border border-black p-2 rounded w-full" type="email" {...register("contactEmail", { required: "Contact Email is required" })} />
                                {errors.contactEmail && <span className="text-red-700">{errors.contactEmail.message}</span>}
                            </div>
                            <div className="flex flex-col w-full space-y-1">
                                <label htmlFor="contactMessage">Contact Message:</label>
                                <textarea id="contactMessage" rows="6" className="border border-black p-2 rounded w-full" {...register("contactMessage", { required: "Contact Message is required" })} />
                                {errors.contactMessage && <span className="text-red-700">{errors.contactMessage.message}</span>}
                            </div>

                            <button type="submit" className="bg-blue-500 text-white py-2 w-24 rounded">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SampleLayout;
