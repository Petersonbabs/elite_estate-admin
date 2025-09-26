import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, AlertCircleIcon, SendIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import AnimatedSection from '../components/ui/AnimatedSection';
import { authContext } from '../contexts/AuthContext';
import axiosInstance from '../lib/axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
const SignUpPage = () => {
  const params = new URLSearchParams(window.location.search)
  const refCode = params.get("ref")
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    dateOfBirth: '',
    whatsAppNumber: '',
    phoneNumber: '',
    email: '',
    agreement: false,
    telegramUsername: "",
    password: "",
    ref: refCode || ""
  });
  const [errors, setErrors] = useState({});
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const { checkAuth } = useContext(authContext)
  const navigate = useNavigate()
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.dateOfBirth.trim()) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.whatsAppNumber.trim()) newErrors.whatsAppNumber = 'WhatsApp number is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.telegramUsername.trim()) newErrors.telegramUsername = 'Your Telegram username is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.agreement) newErrors.agreement = 'You must agree to the vision of FRN';
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
    // Simulate API call to Google Sheets
    try {
      const response = await axiosInstance.post("/user", formData)
      const data = response.data
      if (response.status === 200) {
        toast.success("Welcome onboard!")
        setInviteLink(data.inviteLink)
      }
      checkAuth()
      setIsSubmitted(true);

      setFormStep(2);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error.response.data.message || error.response.message || "Unable to signup")
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleJoinTelegram = () => {
    toast.success("Redirecting...")
    if (!inviteLink) {
      toast.error("No invitation link was found")
      return
    }
    window.location.href = inviteLink
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
              Join the Female Realtors Network
            </h1>
            <p className="text-gray-600">
              Complete the form below to become a part of our exclusive
              community of professional women in real estate.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">
            {formStep === 1 && <motion.form initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} exit={{
              opacity: 0
            }} onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className={labelClasses}>
                    First Name
                  </label>
                  <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className={`${inputClasses} ${errors.firstName ? 'border-red-500' : ''}`} placeholder="Your first name" />
                  {errors.firstName && <p className={errorClasses}>{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className={labelClasses}>
                    Last Name
                  </label>
                  <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className={`${inputClasses} ${errors.lastName ? 'border-red-500' : ''}`} placeholder="Your last name" />
                  {errors.lastName && <p className={errorClasses}>{errors.lastName}</p>}
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="address" className={labelClasses}>
                    Address/Location
                  </label>
                  <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className={`${inputClasses} ${errors.address ? 'border-red-500' : ''}`} placeholder="Your address or location" />
                  {errors.address && <p className={errorClasses}>{errors.address}</p>}
                </div>
                <div>
                  <label htmlFor="dateOfBirth" className={labelClasses}>
                    Date of Birth (DD/MM/YYYY)
                  </label>
                  <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className={`${inputClasses} ${errors.dateOfBirth ? 'border-red-500' : ''}`} />
                  {errors.dateOfBirth && <p className={errorClasses}>{errors.dateOfBirth}</p>}
                </div>
                <div>
                  <label htmlFor="whatsAppNumber" className={labelClasses}>
                    WhatsApp Number
                  </label>
                  <input type="tel" id="whatsAppNumber" name="whatsAppNumber" value={formData.whatsAppNumber} onChange={handleChange} className={`${inputClasses} ${errors.whatsAppNumber ? 'border-red-500' : ''}`} placeholder="Your WhatsApp number" />
                  {errors.whatsAppNumber && <p className={errorClasses}>{errors.whatsAppNumber}</p>}
                </div>
                <div>
                  <label htmlFor="phoneNumber" className={labelClasses}>
                    Phone Number
                  </label>
                  <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className={`${inputClasses} ${errors.phoneNumber ? 'border-red-500' : ''}`} placeholder="Your phone number" />
                  {errors.phoneNumber && <p className={errorClasses}>{errors.phoneNumber}</p>}
                </div>
                <div>
                  <label htmlFor="telegramUsername" className={labelClasses}>
                    Telegram username
                  </label>
                  <input type="text" id="telegramUsername" name="telegramUsername" value={formData.telegramUsername} onChange={handleChange} className={`${inputClasses} ${errors.telegramUsername ? 'border-red-500' : ''}`} placeholder="Your telegram username" />
                  {errors.telegramUsername && <p className={errorClasses}>{errors.telegramUsername}</p>}
                </div>
                <div>
                  <label htmlFor="email" className={labelClasses}>
                    Email Address
                  </label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`${inputClasses} ${errors.email ? 'border-red-500' : ''}`} placeholder="Your email address" />
                  {errors.email && <p className={errorClasses}>{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="password" className={labelClasses}>
                    Password
                  </label>
                  <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className={`${inputClasses} ${errors.password ? 'border-red-500' : ''}`} placeholder="********" />
                  {errors.password && <p className={errorClasses}>{errors.password}</p>}
                </div>
                <div>
                  <label htmlFor="ref" className={labelClasses}>
                    Referral code
                  </label>
                  <input type="text" id="ref" name="ref" value={formData.ref} onChange={handleChange} className={`${inputClasses} ${errors.ref ? 'border-red-500' : ''}`} placeholder="Referal code" />
                  {errors.ref && <p className={errorClasses}>{errors.ref}</p>}
                </div>
                <div className="md:col-span-2 mt-4">
                  <div className="flex items-start">
                    <input type="checkbox" id="agreement" name="agreement" checked={formData.agreement} onChange={handleChange} className="mt-1 h-4 w-4 text-[#ec9a4e] focus:ring-[#ec9a4e] border-gray-300 rounded" />
                    <label htmlFor="agreement" className="ml-2 text-gray-700">
                      I agree to be committed to the vision of FRN
                    </label>
                  </div>
                  {errors.agreement && <p className={errorClasses}>{errors.agreement}</p>}
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
                    Submit Registration{' '}
                    <SendIcon size={16} className="ml-2" />
                  </span>}
                </Button>
              </div>
            </motion.form>}
            {formStep === 2 && <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} className="text-center py-6">
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 rounded-full p-3">
                  <CheckIcon size={40} className="text-green-500" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-[#3f1403] mb-4">
                Registration Successful!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for joining the Female Realtors Network. To
                complete your registration, please join our Telegram group
                for important updates and networking opportunities.
              </p>
              <Button onClick={handleJoinTelegram} variant="secondary" size="lg">
                Join Our Telegram Group
              </Button>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-500 text-sm">
                  Having trouble? Contact our support team at{' '}
                  <a href="mailto:support@frnnetwork.com" className="text-[#ec9a4e] hover:underline">
                    support@frnnetwork.com
                  </a>
                </p>
              </div>
            </motion.div>}
          </div>
        </AnimatedSection>
      </div>
    </div>
  </div>;
};
export default SignUpPage;