
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaFacebook,FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-8 py-16 rounded-xl">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font- bold">Hola Trip</h2>
            <p className="text-white">
              Hola AI Powered trip planner is gives you the best service in the current market.
            </p>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-3">
              <li><a href="/about" className="text-gray-400 hover:text-white">About us</a></li>
              <li><a href="/blogs" className="text-gray-400 hover:text-white">Blog</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-3">
              <li><a href="/contact" className="text-gray-400 hover:text-white">Help center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact us</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-gray-400">
              Subscribe to our newsletter for travel tips, updates, and special offers!
            </p>
            <div className="flex sm:flex-col md:flex-row gap-2">
              <Input 
                type="email" 
                placeholder="Type your email address" 
                className="bg-transparent border-gray-700 rounded-full h-10"
              />
              <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-6 h-10">
                Subscribe
              </Button>
            </div>
            {/* Social Links */}
          <div className="flex gap-4">
            <a href="#" className="bg-gray-900 p-2 rounded-full hover:bg-gray-500">
              <FaFacebook className="w-5 h-5"/>
            </a>
            <a href="#" className="bg-gray-900 p-2 rounded-full hover:bg-gray-500">
              <FaTwitter className="w-5 h-5"/>
            </a>
            <a href="#" className="bg-gray-900 p-2 rounded-full hover:bg-gray-500">
              <AiFillInstagram className="w-5 h-5"/>
            </a>
            {/* <a href="#" className="bg-gray-900 p-2 rounded-full hover:bg-gray-500">
              <FaYoutube className="w-5 h-5"/>
            </a> */}
          </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-gray-400">
            © 2024 Hola Trip. All rights reserved
          </div>

          {/* Legal Links */}
          <div className="flex gap-6 text-gray-400">
            <a href="#" className="hover:text-white">Terms and Conditions</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;