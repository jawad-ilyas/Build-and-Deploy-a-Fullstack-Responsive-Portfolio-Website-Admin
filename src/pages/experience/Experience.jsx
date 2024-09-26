import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchWorkExperience } from "../../features/workExperience/WorkExperience.slice";
import { createExperience, deleteExperience, fetchExperiences, updateExperience } from "../../features/experience/Experience.slice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Initialize SweetAlert2 with React Content
const MySwal = withReactContent(Swal);

const Experience = () => {
  const { workExperiences } = useSelector((state) => state.workExperience);
  const { experiences } = useSelector((state) => state.experience);
  const [isEditing, setIsEditing] = useState(false); // New state to track if we are editing
  const [editId, setEditId] = useState(null); // Track the ID of the testimonial being edited

  const dispatch = useDispatch();

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // Handle Form Submission (Create / Update)
  const handleOnSubmit = (data) => {
    if (isEditing) {
      dispatch(updateExperience({ id: editId, data }))
        .then(() => {
          toast.success('Experience updated successfully!');
          setIsEditing(false);
          setEditId(null);
        })
        .catch(() => toast.error('Failed to update experience.'));
    } else {
      dispatch(createExperience(data))
        .then(() => toast.success('Experience created successfully!'))
        .catch(() => toast.error('Failed to create experience.'));
    }
    reset();
  };

  // Handle Edit Case
  const handleUpdateCase = (work) => {
    setIsEditing(true);
    setEditId(work?._id);
    setValue("year", work?.year);
    setValue("worksExperience", work?.worksExperience[0]?._id);
  };

  // Handle Delete Confirmation with SweetAlert2
  const showDeleteConfirmation = (id) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteExperience(id))
          .then(() => {
            toast.success('Experience deleted successfully!');
          })
          .catch(() => {
            toast.error('Failed to delete experience.');
          });
      }
    });
  };

  useEffect(() => {
    dispatch(fetchWorkExperience());
    dispatch(fetchExperiences());
  }, [dispatch]);

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen p-4 lg:p-8">
      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Sidebar: List of Experiences */}
      <div className="lg:w-1/3 w-full p-4">
        <div className="flex flex-col space-y-4">
          {experiences?.map((work) => (
            <div
              key={work?._id}
              className="flex flex-col bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 rounded-lg"
            >
              <h1 className="text-center text-xl font-bold text-gray-700">
                {work?.year}
              </h1>
              {work?.worksExperience?.map((workExperience) =>
                <div
                  key={workExperience?._id}
                  className="flex flex-col bg-white shadow hover:shadow-lg transition-shadow duration-300 p-5 rounded-lg"
                >
                  <h1 className="text-center text-xl font-bold text-gray-700">
                    {workExperience?.workExperienceName}
                  </h1>
                  <h2 className="text-center text-md text-gray-600">
                    {workExperience?.workExperienceCompany}
                  </h2>
                  <p className="text-center text-sm text-gray-500">
                    {workExperience?.workExperienceDescription}
                  </p>
                </div>
              )}
              <div className="flex justify-between mt-4">
                <button
                  className="text-green-500 hover:text-green-600 font-semibold transition-colors duration-200"
                  onClick={() => handleUpdateCase(work)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:text-red-600 font-semibold transition-colors duration-200"
                  onClick={() => showDeleteConfirmation(work?._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel: Experience Form */}
      <div className="lg:w-2/3 w-full p-4">
        <div className="h-screen flex items-center justify-center">
          <div className="max-w-3xl w-full bg-white p-6 lg:p-8 rounded-lg shadow-lg">
            <h1 className="text-center text-2xl font-bold text-gray-700 mb-6">
              Experience Information
            </h1>

            <form
              onSubmit={handleSubmit(handleOnSubmit)}
              className="flex flex-col w-full space-y-6"
            >
              {/* Experience Year */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="year" className="text-lg font-semibold text-gray-700">
                  Experience Year:
                </label>
                <input
                  id="year"
                  className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  {...register("year", { required: "Experience year is required" })}
                />
                {errors.year && (
                  <span className="text-red-500 text-sm">{errors.year.message}</span>
                )}
              </div>

              {/* Work Experience List */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="worksExperience" className="text-lg font-semibold text-gray-700">
                  Experience Job List:
                </label>
                <select
                  id="worksExperience"
                  className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("worksExperience", { required: "Work experience is required" })}
                >
                  <option value="" disabled selected>
                    Select Work Experience
                  </option>
                  {workExperiences?.map((work) => (
                    <option key={work._id} value={work._id}>
                      {work?.workExperienceName}
                    </option>
                  ))}
                </select>
                {errors.worksExperience && (
                  <span className="text-red-500 text-sm">{errors.worksExperience.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              >
                {isEditing ? "Update" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
