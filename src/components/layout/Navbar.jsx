import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, MenuIcon, XIcon } from 'lucide-react';
import { authContext } from '../../contexts/AuthContext';
import Button from '../ui/Button';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuth, isAdminAuth, logout, loggingOut } = useContext(authContext)
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'Properties',
    path: '/properties'
  }];
  const pathName = window.location.pathname
  const navbarClass = isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5';
  // Determine text color based on whether the navbar is scrolled
  const textColor = !isScrolled && pathName === "/" ? 'text-white' : 'text-[#3f1403]'

  return <header className={`fixed top-0 left-0 right-0 z-[999999] transition-all duration-300 ${navbarClass}`}>
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex font-bold items-center">
          <h2>FRF ADMIN</h2>
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">

          {
            isAdminAuth ? (
              <Link to="/dashboard" className="px-6 py-2.5 bg-[#3f1403] text-white rounded-md hover:bg-[#5d2007] transition-colors duration-300 text-sm font-medium">
                Admin Dashboard
              </Link>
            ) : (
              <Link to="/login" className="px-6 py-2.5 bg-[#3f1403] text-white rounded-md hover:bg-[#5d2007] transition-colors duration-300 text-sm font-medium">
                Login
              </Link>
            )
          }
        </nav>
        {/* Mobile Menu Button */}
        <Button className={`md:hidden ${textColor}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
          {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </Button>
      </div>
      {/* Mobile Navigation - Slide from left */}
      <AnimatePresence>
        {isMobileMenuOpen && <>
          {/* Overlay */}
          <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} exit={{
            opacity: 0
          }} transition={{
            duration: 0.3
          }} className="fixed inset-0 bg-black/50 z-[999] md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
          {/* Slide-in menu */}
          <motion.div initial={{
            x: '-100%'
          }} animate={{
            x: 0
          }} exit={{
            x: '-100%'
          }} transition={{
            type: 'tween',
            duration: 0.3
          }} className="fixed top-0 left-0 bottom-0 w-4/5 max-w-xs bg-[#3f1403] z-[9999] h-screen md:hidden">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <img src="/frf_logo.jpeg" alt="FRN Logo" className="w-32" />
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-white" aria-label="Close menu">
                  <XIcon size={24} />
                </button>
              </div>

              <div className="p-6 mt-auto border-t border-white/10">
                {
                  isAdminAuth ? (
                    <div className="pt-4 mt-auto border-t border-white/10">
                      <div className="flex items-center px-4 py-2">
                        <div className="w-8 h-8 rounded-full bg-[#ec9a4e] flex items-center justify-center mr-3">
                          <span className="font-semibold text-xs">AS</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">Admin User</p>
                          <p className="text-xs text-gray-300">{localStorage.getItem("email") || ""}</p>
                        </div>
                      </div>
                      <button onClick={() => {
                        logout()
                        setTimeout(() => {
                          setIsMobileMenuOpen(false)
                        }, 1500)
                      }} className='mt-4 border w-full py-2 rounded border-red-500 flex items-center justify-center text-white'>
                        {loggingOut ? <Loader2 className='animate-spin w-5 h-5' /> : "Log out"}
                      </button>
                    </div>
                  ) : (
                    <Link to="/login" className="w-full block text-center px-6 py-3 bg-[#ec9a4e] text-white rounded-md hover:bg-white hover:text-[#3f1403] transition-colors duration-300 text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                      Login
                    </Link>
                  )
                }
              </div>
            </div>
          </motion.div>
        </>}
      </AnimatePresence>
    </div>
  </header>;
};
export default Navbar;