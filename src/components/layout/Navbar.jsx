import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import { authContext } from '../../contexts/AuthContext';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuth } = useContext(authContext)
  const location = useLocation();
  console.log(isAuth)
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

  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarClass}`}>
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/WhatsApp_Image_2025-08-15_at_11.01.52_PM.jpg" alt="FRN Logo" className="h-12 md:h-16" />
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => <Link key={link.name} to={link.path} className={`text-sm font-medium tracking-wide transition-colors hover:text-[#ec9a4e] ${location.pathname === link.path ? 'text-[#ec9a4e]' : textColor}`}>
            {link.name}
          </Link>)}
          {
            !isAuth && (
              <Link to="/login" className={`text-sm font-medium tracking-wide transition-colors hover:text-[#ec9a4e] ${location.pathname === "/login" ? 'text-[#ec9a4e]' : textColor}`}>
                Login
              </Link>
            )
          }
          {
            isAuth ? (
              <Link to="/dashboard" className="px-6 py-2.5 bg-[#3f1403] text-white rounded-md hover:bg-[#ec9a4e] transition-colors duration-300 text-sm font-medium">
                Dashboard
              </Link>
            ) : (
              <Link to="/signup" className="px-6 py-2.5 bg-[#3f1403] text-white rounded-md hover:bg-[#ec9a4e] transition-colors duration-300 text-sm font-medium">
                Join Now
              </Link>
            )
          }
        </nav>
        {/* Mobile Menu Button */}
        <button className={`md:hidden ${textColor}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
          {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
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
          }} className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
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
          }} className="fixed top-0 left-0 bottom-0 w-4/5 max-w-xs bg-[#3f1403] z-50 h-screen md:hidden">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <img src="/WhatsApp_Image_2025-08-15_at_11.01.52_PM.jpg" alt="FRN Logo" className="h-12" />
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-white" aria-label="Close menu">
                  <XIcon size={24} />
                </button>
              </div>
              <nav className="flex-1 p-6">
                <ul className="space-y-6">
                  {navLinks.map(link => <li key={link.name}>
                    <Link to={link.path} className={`text-lg font-medium block transition-colors hover:text-[#ec9a4e] ${location.pathname === link.path ? 'text-[#ec9a4e]' : 'text-white'}`} onClick={() => setIsMobileMenuOpen(false)}>
                      {link.name}
                    </Link>
                  </li>)}
                </ul>
              </nav>
              <div className="p-6 mt-auto border-t border-white/10">
                {
                  isAuth ? (
                    <Link to="/dashboard" className="w-full block text-center px-6 py-3 bg-[#ec9a4e] text-white rounded-md hover:bg-white hover:text-[#3f1403] transition-colors duration-300 text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                      Dashboard
                    </Link>
                  ) : (
                    <Link to="/signup" className="w-full block text-center px-6 py-3 bg-[#ec9a4e] text-white rounded-md hover:bg-white hover:text-[#3f1403] transition-colors duration-300 text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                      Join Now
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