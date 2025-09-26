import React from 'react';
import { Link } from 'react-router-dom';
import { InstagramIcon, FacebookIcon, TwitterIcon, LinkedinIcon, PhoneIcon, MailIcon, MapPinIcon } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-[#3f1403] text-white">
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <img src="/frf_logo.jpeg" alt="FRN Logo" className="h-16 mb-4" />
          <p className="text-sm text-gray-300 mt-4 max-w-xs">
            Empowering women in real estate through networking and referrals.
            Join our community today.
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="#" className="text-white hover:text-[#ec9a4e] transition-colors">
              <InstagramIcon size={20} />
            </a>
            <a href="#" className="text-white hover:text-[#ec9a4e] transition-colors">
              <FacebookIcon size={20} />
            </a>
            <a href="#" className="text-white hover:text-[#ec9a4e] transition-colors">
              <TwitterIcon size={20} />
            </a>
            <a href="#" className="text-white hover:text-[#ec9a4e] transition-colors">
              <LinkedinIcon size={20} />
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-300 hover:text-[#ec9a4e] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/properties" className="text-gray-300 hover:text-[#ec9a4e] transition-colors">
                Properties
              </Link>
            </li>
            <li>
              <Link to="/signup" className="text-gray-300 hover:text-[#ec9a4e] transition-colors">
                Join Network
              </Link>
            </li>
          </ul>
        </div>
        <div className='hidden'>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-300 hover:text-[#ec9a4e] transition-colors">
                Referral Program
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-[#ec9a4e] transition-colors">
                Marketing Materials
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-[#ec9a4e] transition-colors">
                Success Stories
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-[#ec9a4e] transition-colors">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <MapPinIcon size={18} className="mr-2 mt-0.5 text-[#ec9a4e]" />
              <span className="text-gray-300">
                123 Real Estate Ave, Suite 100
                <br />
                Business District, NY 10001
              </span>
            </li>
            <li className="flex items-center">
              <PhoneIcon size={18} className="mr-2 text-[#ec9a4e]" />
              <span className="text-gray-300">+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center">
              <MailIcon size={18} className="mr-2 text-[#ec9a4e]" />
              <span className="text-gray-300">contact@frnnetwork.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-12 pt-8 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
        <p>
          &copy; {new Date().getFullYear()} Female Realtors Network. All
          rights reserved.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-[#ec9a4e] transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-[#ec9a4e] transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  </footer>;
};
export default Footer;