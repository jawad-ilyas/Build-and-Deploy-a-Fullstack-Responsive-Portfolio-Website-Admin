import { Link } from "react-router-dom";
import testimonialImg from "../assets/testimonial.webp" ;  // Add images specific to each section
import aboutImg from "../assets/about.webp";
import workImg from "../assets/workExperience.webp";
import contactImg from "../assets/image.jpeg";
import brandImg from "../assets/brand.webp";
import skillImg from "../assets/skill.webp";
import workExperienceImg from "../assets/workExperience.webp";
import experienceImg from "../assets/workExperience.webp";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">Welcome to the Dashboard</h1>

      {/* Grid for navigation cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl">
        {/* Testimonial Card */}
        <Link to="/testominal" className="group relative">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
            <img src={testimonialImg} alt="Testimonial" className="w-32 h-32 object-cover rounded-full mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">Testimonial</h2>
            <p className="text-gray-500 text-center mt-2">
              Read what our clients say about us.
            </p>
          </div>
          <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transform group-hover:scale-110 transition-transform duration-500"></div>
        </Link>

        {/* About Us Card */}
        <Link to="/about" className="group relative">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
            <img src={aboutImg} alt="About" className="w-32 h-32 object-cover rounded-full mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">About Us</h2>
            <p className="text-gray-500 text-center mt-2">
              Learn more about who we are.
            </p>
          </div>
          <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transform group-hover:scale-110 transition-transform duration-500"></div>
        </Link>

        {/* Work Card */}
        <Link to="/work" className="group relative">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
            <img src={workImg} alt="Work" className="w-32 h-32 object-cover rounded-full mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">Our Work</h2>
            <p className="text-gray-500 text-center mt-2">
              Explore our recent software projects.
            </p>
          </div>
          <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transform group-hover:scale-110 transition-transform duration-500"></div>
        </Link>

        {/* Contact Us Card */}
        <Link to="/contact" className="group relative">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
            <img src={contactImg} alt="Contact" className="w-32 h-32 object-cover rounded-full mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">Contact Us</h2>
            <p className="text-gray-500 text-center mt-2">
              Get in touch with us for more info.
            </p>
          </div>
          <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transform group-hover:scale-110 transition-transform duration-500"></div>
        </Link>

        {/* Brand Card */}
        <Link to="/brand" className="group relative">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
            <img src={brandImg} alt="Brand" className="w-32 h-32 object-cover rounded-full mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">Brand</h2>
            <p className="text-gray-500 text-center mt-2">
              Discover our branding projects.
            </p>
          </div>
          <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transform group-hover:scale-110 transition-transform duration-500"></div>
        </Link>

        {/* Skill Card */}
        <Link to="/skill" className="group relative">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
            <img src={skillImg} alt="Skills" className="w-32 h-32 object-cover rounded-full mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">Skills</h2>
            <p className="text-gray-500 text-center mt-2">
              Explore our team's skill sets.
            </p>
          </div>
          <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transform group-hover:scale-110 transition-transform duration-500"></div>
        </Link>

        {/* Work Experience Card */}
        <Link to="/workExperience" className="group relative">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
            <img src={workExperienceImg} alt="Work Experience" className="w-32 h-32 object-cover rounded-full mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">Work Experience</h2>
            <p className="text-gray-500 text-center mt-2">
              Explore our team's work experience.
            </p>
          </div>
          <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transform group-hover:scale-110 transition-transform duration-500"></div>
        </Link>

        {/* Experience Card */}
        <Link to="/experience" className="group relative">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
            <img src={experienceImg} alt="Experience" className="w-32 h-32 object-cover rounded-full mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">Experience</h2>
            <p className="text-gray-500 text-center mt-2">
              Learn more about our experiences.
            </p>
          </div>
          <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transform group-hover:scale-110 transition-transform duration-500"></div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
