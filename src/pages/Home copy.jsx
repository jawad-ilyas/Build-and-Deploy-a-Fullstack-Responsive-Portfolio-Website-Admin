import { Link } from "react-router-dom";
import placeHolderImg from "../assets/image.jpeg";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">Welcome to the Dashboard</h1>

      {/* Grid for navigation cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl">
        {/* Card Example */}
        <Link to="/testominal" className="group relative">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
            <img src={placeHolderImg} alt="Testimonial" className="w-32 h-32 object-cover rounded-full mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">Testimonial</h2>
            <p className="text-gray-500 text-center mt-2">
              Read what our clients say about us.
            </p>
          </div>
          <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transform group-hover:scale-110 transition-transform duration-500"></div>
        </Link>

        <Link to="/about" className="group relative">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
            <img src={placeHolderImg} alt="About" className="w-32 h-32 object-cover rounded-full mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">About Us</h2>
            <p className="text-gray-500 text-center mt-2">
              Learn more about who we are.
            </p>
          </div>
          <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transform group-hover:scale-110 transition-transform duration-500"></div>
        </Link>

        <Link to="/work" className="group relative">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
            <img src={placeHolderImg} alt="Work" className="w-32 h-32 object-cover rounded-full mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">Our Work</h2>
            <p className="text-gray-500 text-center mt-2">
              Explore our recent projects.
            </p>
          </div>
          <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transform group-hover:scale-110 transition-transform duration-500"></div>
        </Link>

        <Link to="/contact" className="group relative">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
            <img src={placeHolderImg} alt="Contact" className="w-32 h-32 object-cover rounded-full mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">Contact Us</h2>
            <p className="text-gray-500 text-center mt-2">
              Get in touch with us for more info.
            </p>
          </div>
          <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transform group-hover:scale-110 transition-transform duration-500"></div>
        </Link>

        <Link to="/contact" className="group relative">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
            <img src={placeHolderImg} alt="Contact" className="w-32 h-32 object-cover rounded-full mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">Contact Us</h2>
            <p className="text-gray-500 text-center mt-2">
              Get in touch with us for more info.
            </p>
          </div>
          <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transform group-hover:scale-110 transition-transform duration-500"></div>
        </Link>

        <Link to="/contact" className="group relative">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
            <img src={placeHolderImg} alt="Contact" className="w-32 h-32 object-cover rounded-full mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">Contact Us</h2>
            <p className="text-gray-500 text-center mt-2">
              Get in touch with us for more info.
            </p>
          </div>
          <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transform group-hover:scale-110 transition-transform duration-500"></div>
        </Link>

        {/* Add more links for other sections like Brand, Skill, Work Experience */}
      </div>
    </div>
  );
}

export default Home;
