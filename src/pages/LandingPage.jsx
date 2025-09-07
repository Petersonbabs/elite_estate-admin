import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, CheckIcon, StarIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import AnimatedSection from '../components/ui/AnimatedSection';
import StatsCounter from '../components/ui/StatsCounter';
const LandingPage = () => {
  const testimonials = [{
    id: 1,
    name: 'Sarah Johnson',
    role: 'Luxury Real Estate Specialist',
    content: 'Joining FRN was the best decision for my career. The referral network has increased my sales by 40% in just six months!',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
  }, {
    id: 2,
    name: 'Michelle Rodriguez',
    role: 'Commercial Property Agent',
    content: 'The support from fellow women in real estate has been incredible. FRN provides not just referrals but a true professional community.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
  }, {
    id: 3,
    name: 'Patricia Williams',
    role: 'Residential Sales Director',
    content: 'The marketing materials and property listings from FRN have helped me close deals faster than ever before. Truly a game-changer.',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
  }];
  return <div className="w-full">
      {/* Hero Section with Background Image */}
      <div className="h-screen relative bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')"
    }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#3f1403]/90 to-[#3f1403]/70" />
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10 pt-20">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-playfair mb-4">
              Empowering Women in Real Estate through Networking & Referrals
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Earn commissions when you and your direct referrals sell
              properties.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button to="/signup" variant="secondary" size="lg">
                Join Now
              </Button>
              <Button to="#about" variant="outline" size="lg" className="border-white text-white hover:bg-[#00000080] hover:text-white hover:border-transparent">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#3f1403] font-playfair mb-2">
              Growing Stronger Together
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our thriving community of successful female realtors making
              an impact in the industry.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatsCounter end={1250} label="Total Members" suffix="+" />
            <StatsCounter end={3700} label="Properties Listed" suffix="+" />
            <StatsCounter end={42} label="Million in Referral Sales" prefix="$" suffix="M+" />
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="right">
              <img src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80" alt="Women in real estate meeting" className="rounded-lg shadow-xl w-full h-auto object-cover" />
            </AnimatedSection>
            <AnimatedSection direction="left" delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-bold text-[#3f1403] font-playfair mb-6">
                Why Join the Female Realtors Network?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-[#ec9a4e] rounded-full p-1">
                      <CheckIcon size={16} className="text-white" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xl font-semibold text-[#3f1403]">
                      Exclusive Referral Network
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Connect with professional women realtors nationwide and
                      earn commissions through our referral system.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-[#ec9a4e] rounded-full p-1">
                      <CheckIcon size={16} className="text-white" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xl font-semibold text-[#3f1403]">
                      Premium Property Listings
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Access to high-quality property listings with professional
                      marketing materials to share with your clients.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-[#ec9a4e] rounded-full p-1">
                      <CheckIcon size={16} className="text-white" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xl font-semibold text-[#3f1403]">
                      Professional Development
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Exclusive training sessions, webinars, and resources
                      designed specifically for women in real estate.
                    </p>
                  </div>
                </div>
              </div>
              <Button to="/signup" variant="primary" size="lg" className="mt-8">
                Join Our Network <ArrowRightIcon size={16} className="ml-2" />
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#3f1403] font-playfair mb-2">
              Success Stories from Our Members
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear what our community of female realtors has to say about their
              experience with FRN.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => <AnimatedSection key={testimonial.id} delay={index * 0.2}>
                <div className="bg-white rounded-lg shadow-lg p-6 h-full border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 mr-3">
                      <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-[#3f1403]">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} size={16} className="text-[#ec9a4e] fill-[#ec9a4e]" />)}
                  </div>
                  <p className="text-gray-600 italic">
                    "{testimonial.content}"
                  </p>
                </div>
              </AnimatedSection>)}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-[#3f1403]">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair mb-6">
              Ready to Elevate Your Real Estate Career?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Join our network of professional women realtors and start growing
              your business through our exclusive referral system.
            </p>
            <Button to="/signup" variant="secondary" size="lg">
              Become a Member Today
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </div>;
};
export default LandingPage;