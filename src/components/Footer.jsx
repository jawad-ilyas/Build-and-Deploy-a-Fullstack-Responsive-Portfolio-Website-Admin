import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Top section: Social Media & Navigation Links */}
                <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-400 pb-6 mb-6">
                    {/* Social Media Links */}
                    <div className="flex space-x-6 mb-4 md:mb-0">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-gray-300"
                        >
                            <FaFacebookF size={20} />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-gray-300"
                        >
                            <FaTwitter size={20} />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-gray-300"
                        >
                            <FaInstagram size={20} />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-gray-300"
                        >
                            <FaLinkedinIn size={20} />
                        </a>
                    </div>

                    {/* Footer Navigation Links */}
                    <div className="space-x-4 text-lg">
                        <Link to="/" className="hover:text-gray-300">
                            Home
                        </Link>
                        <Link to="/about" className="hover:text-gray-300">
                            About
                        </Link>
                        <Link to="/contact" className="hover:text-gray-300">
                            Contact
                        </Link>
                        <Link to="/work" className="hover:text-gray-300">
                            Work
                        </Link>
                    </div>
                </div>

                {/* Bottom section: Legal & Brand Info */}
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    {/* Copyright */}
                    <p className="text-sm mb-4 md:mb-0">
                        © 2024 Your Company. All rights reserved.
                    </p>

                    {/* Terms and Privacy Links */}
                    <div className="space-x-4 text-sm">
                        <Link to="/terms" className="hover:text-gray-300">
                            Terms of Service
                        </Link>
                        <Link to="/privacy" className="hover:text-gray-300">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
