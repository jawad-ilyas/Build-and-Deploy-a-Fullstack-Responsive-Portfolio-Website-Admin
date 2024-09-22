import { ContainerForMainSection } from "../../wrapper/index.wrapper";
import placeHolderImg from "../../assets/image.jpeg";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
const Skill = () => {
    const {
        register,
        reset,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm();


    const handleOnSubmit = () => {

    }








    return (
        <div className="flex flex-row">
            <div className="w-1/3 h-screen overflow-y-auto p-4">
                <div className="flex flex-col w-full">
                    {/* Replace this with your Skill data */}
                    <div className="flex flex-col space-y-1 bg-gray-200 my-5 shadow hover:shadow-2xl cursor-pointer p-5 rounded-md">
                        <img className=" mx-auto size-32 rounded-full object-cover" src={placeHolderImg} alt="Skill Name" />
                        <div className="flex flex-col">
                            <h1 className="text-center font-semibold text-xl mt-2">Skill Name</h1>

                        </div>

                        <div className="flex flex-row justify-center items-center space-x-5">
                            <div className="bg-green-400 cursor-pointer w-full rounded-md p-2 text-center font-semibold">Edit</div>
                            <div className="bg-red-400 cursor-pointer w-full rounded-md p-2 text-center font-semibold">Delete</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-2/3">
                <ContainerForMainSection>
                    <div className="max-w-3xl w-full">
                        <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col w-full space-y-4">
                            <div className="flex flex-col w-full space-y-1">
                                <label htmlFor="skillName">Skill Name:</label>
                                <input id="skillName" className="border border-black p-2 rounded w-full" type="text" {...register("skillName", { required: "Skill Name is required " })} />
                                {errors.skillName && <span className="text-red-700">{errors.skillName.message}</span>}
                            </div>

                            <div className="flex flex-col w-full space-y-1">
                                <label htmlFor="skillImg">
                                    <img src={placeHolderImg} alt="Preview" className="w-40 h-40 object-cover" />
                                </label>
                                <input id="skillImg" type="file" />
                            </div>
                            <button type="submit" className="bg-blue-500 text-white py-2 w-24 rounded">Submit</button>
                            <ToastContainer />
                        </form>
                    </div>
                </ContainerForMainSection>
            </div>
        </div>
    );
}

export default Skill;
