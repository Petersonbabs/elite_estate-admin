import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, AlertCircleIcon, SendIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import AnimatedSection from '../components/ui/AnimatedSection';
import { Navigate, useNavigate } from 'react-router-dom';
import { authContext } from '../contexts/AuthContext';
const LoginPage = () => {
  const { checkAuth } = useContext(authContext)
  const [formData, setFormData] = useState({
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()
  const validateForm = () => {
    const newErrors = {};
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    const {
      name,
      value,
      type
    } = e.target;
    const checked = type === 'checkbox' ? (e.target).checked : undefined;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {
          ...prev
        };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    const randomNum = Math.floor(Math.random() * 99999999999)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      localStorage.setItem("token", randomNum)
      checkAuth()
      navigate("/dashboard")
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = 'w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ec9a4e] focus:border-transparent transition-all';
  const labelClasses = 'block text-gray-700 mb-1 font-medium';
  const errorClasses = 'text-red-500 text-sm mt-1';
  return <div className="min-h-screen bg-gray-50 pt-20">
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[#3f1403] font-playfair mb-4">
              Login to the Female Realtors Network
            </h1>
            <p className="text-gray-600">
              Complete the form below to login
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">
            {<motion.form initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} exit={{
              opacity: 0
            }} onSubmit={handleSubmit}>
              <div className="">

                <div>
                  <label htmlFor="phone" className={labelClasses}>
                    Phone Number
                  </label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={`${inputClasses} ${errors.phone ? 'border-red-500' : ''}`} placeholder="Your phone number" />
                  {errors.phone && <p className={errorClasses}>{errors.phone}</p>}
                </div>
              </div>
              <div className="mt-8">
                <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting} className="relative">
                  {isSubmitting ? <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span> : <span className="flex items-center justify-center">
                    Login{' '}
                    <SendIcon size={16} className="ml-2" />
                  </span>}
                </Button>
              </div>
            </motion.form>}

            <p className='mt-4'>Are you new here? <a href="/signup" className='text-[#3f1403]'>Join Now</a></p>

          </div>
        </AnimatedSection>
      </div>
    </div>
  </div>;
};
export default LoginPage;