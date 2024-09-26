import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand/Logo */}
        <div className="text-2xl font-bold">
          <NavLink to="/" className="hover:text-gray-200">
            JMD Admin Section
          </NavLink>
        </div>

        {/* Navigation Links */}
        <div className="space-x-6 text-lg font-medium">
          <NavLink
            exact
            to="/"
            className="hover:text-gray-200 transition"
            activeClassName="border-b-2 border-white"
          >
            Home
          </NavLink>
          <NavLink
            to="/testominal"
            className="hover:text-gray-200 transition"
            activeClassName="border-b-2 border-white"
          >
            Testimonial
          </NavLink>
          <NavLink
            to="/about"
            className="hover:text-gray-200 transition"
            activeClassName="border-b-2 border-white"
          >
            About
          </NavLink>
          <NavLink
            to="/work"
            className="hover:text-gray-200 transition"
            activeClassName="border-b-2 border-white"
          >
            Work
          </NavLink>
          <NavLink
            to="/skill"
            className="hover:text-gray-200 transition"
            activeClassName="border-b-2 border-white"
          >
            Skill
          </NavLink>
          <NavLink
            to="/contact"
            className="hover:text-gray-200 transition"
            activeClassName="border-b-2 border-white"
          >
            Contact
          </NavLink>
          <NavLink
            to="/brand"
            className="hover:text-gray-200 transition"
            activeClassName="border-b-2 border-white"
          >
            Brand
          </NavLink>
          <NavLink
            to="/workExperience"
            className="hover:text-gray-200 transition"
            activeClassName="border-b-2 border-white"
          >
            Work Experience
          </NavLink>
          <NavLink
            to="/experience"
            className="hover:text-gray-200 transition"
            activeClassName="border-b-2 border-white"
          >
            Experience
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
