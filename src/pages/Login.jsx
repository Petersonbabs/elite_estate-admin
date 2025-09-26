import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { SendIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import AnimatedSection from '../components/ui/AnimatedSection';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../contexts/AuthContext';
import axiosInstance from '../lib/axios';
import { toast } from 'sonner';

const LoginPage = () => {
  const { checkAdminAuth } = useContext(authContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const endpoint = '/admin/login'
      const response = await axiosInstance.post(endpoint, formData);
      const data = response.data;

      if (response.status === 200) {
        toast.success('Login successful');
        localStorage.setItem('token', data.token);
        localStorage.setItem("adminid", data.doesUserEmailExist._id);
        navigate('/dashboard');
        checkAdminAuth()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to login');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    'w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ec9a4e] focus:border-transparent transition-all';
  const labelClasses = 'block text-gray-700 mb-1 font-medium';
  const errorClasses = 'text-red-500 text-sm mt-1';

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-[#3f1403] font-playfair mb-4">
                FRF Admin Portal
              </h1>
              <p className="text-gray-600">Choose how you want to login</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">


              {/* Form */}
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
              >
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className={labelClasses}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`${inputClasses} ${errors.email ? 'border-red-500' : ''
                        }`}
                      placeholder="Your email"
                    />
                    {errors.email && (
                      <p className={errorClasses}>{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="password" className={labelClasses}>
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`${inputClasses} ${errors.password ? 'border-red-500' : ''
                        }`}
                      placeholder="Your password"
                    />
                    {errors.password && (
                      <p className={errorClasses}>{errors.password}</p>
                    )}
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={isSubmitting}
                    className="relative"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Login <SendIcon size={16} className="ml-2" />
                      </span>
                    )}
                  </Button>
                </div>
              </motion.form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
