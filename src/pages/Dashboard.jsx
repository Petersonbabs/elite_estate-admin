import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Copy as CopyIcon, CheckIcon, UserIcon, BarChartIcon, HomeIcon, UsersIcon, TrendingUpIcon, AlertCircleIcon, Power, Loader2, UserX2 } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import Button from '../components/ui/Button';
import { authContext } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import PageLoader from '../components/ui/PageLoader';
import InviteMemberModal from '../components/ui/InviteMemberModal';
import { PropertyContext } from '../contexts/PropertyContext';
import PropertyCard from '../components/ui/PropertyCard';
import ReferralDetailsModal from '../components/ui/ReferralDetailsModal';
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('referrals');
  const [copied, setCopied] = useState(false);
  const { logout, loggingOut, } = useContext(authContext)
  const { getTopProperties, topProperties } = useContext(PropertyContext)
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loadingProfile, getUserProfile, user, userRefCode, referrals, getMyReferrals, loadingReferrals } = useUser()
  const [showInviteModal, setShowInviteModal] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = () => {
      const userId = localStorage.getItem("userid")
      if (!userId) {
        navigate("/login")
        return
      }
      getUserProfile(userId)
      getMyReferrals(userId)
    }
    fetchUser()
    getTopProperties()
  }, [])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(userRefCode);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  const tabs = [

    {
      id: 'referrals',
      label: 'My Referrals',
      icon: <UsersIcon size={18} />
    }, {
      id: 'properties',
      label: 'Properties',
      icon: <HomeIcon size={18} />
    }];
  // Mock data for dashboard


  if (loadingProfile) {
    return <PageLoader />
  }

  if (!user) {
    navigate("/login")
    return null
  }

  return <div className="min-h-screen bg-gray-50 pt-20">
    <div className="container mx-auto px-4 py-16">
      <AnimatedSection>
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#3f1403] font-playfair mb-2">
            Welcome Back, {user.firstName}
          </h1>
          <p className="text-gray-600">
            Manage your referrals and track your performance in the Female
            Realtors Network.
          </p>
        </div>
      </AnimatedSection>
      {/* Referral Link Card */}
      <AnimatedSection delay={0.1}>
        <div className="bg-gradient-to-r from-[#3f1403] to-[#5a1d05] rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-white text-xl font-semibold mb-1">
                Your Unique Referral Link
              </h2>
              <p className="text-gray-300 text-sm">
                Share this link to invite other realtors to join your network
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-md px-4 py-2 text-white border border-white/20">
                <p className="font-mono text-sm truncate max-w-xs">
                  {userRefCode}
                </p>
              </div>
              <Button onClick={handleCopyLink} variant="secondary" className="whitespace-nowrap">
                {copied ? <>
                  <CheckIcon size={16} className="mr-2" /> Copied!
                </> : <>
                  <CopyIcon size={16} className="mr-2" /> Copy Link
                </>}
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>
      {/* Stats Cards */}
      <AnimatedSection delay={0.2} className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Direct Referrals Card */}
          <motion.div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#ec9a4e]" whileHover={{
            y: -5,
            transition: {
              duration: 0.2
            }
          }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Referrals</p>
                <h3 className="text-3xl font-bold text-[#3f1403] mt-1">
                  {user.stats.totalReferrals}
                </h3>
              </div>
              <div className="bg-[#ec9a4e]/10 p-3 rounded-full">
                <UsersIcon size={24} className="text-[#ec9a4e]" />
              </div>
            </div>
          </motion.div>
          {/* Total Referrals Card */}
          <motion.div className="bg-white hidden rounded-lg shadow-md p-6 border-l-4 border-[#3f1403]" whileHover={{
            y: -5,
            transition: {
              duration: 0.2
            }
          }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Network</p>
                <h3 className="text-3xl font-bold text-[#3f1403] mt-1">
                  {user.stats.totalReferrals}
                </h3>
              </div>
              <div className="bg-[#3f1403]/10 p-3 rounded-full">
                <UsersIcon size={24} className="text-[#3f1403]" />
              </div>
            </div>
            <p className="text-green-600 text-sm mt-4 flex items-center">
              <TrendingUpIcon size={16} className="mr-1" /> Growing network
            </p>
          </motion.div>
          {/* Active Sales Card */}
          <motion.div className="bg-white hidden rounded-lg shadow-md p-6 border-l-4 border-blue-500" whileHover={{
            y: -5,
            transition: {
              duration: 0.2
            }
          }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Sales</p>
                <h3 className="text-3xl font-bold text-[#3f1403] mt-1">
                  {user.stats.totalSales}
                </h3>
              </div>
              <div className="bg-blue-500/10 p-3 rounded-full">
                <HomeIcon size={24} className="text-blue-500" />
              </div>
            </div>
            <p className="text-blue-600 text-sm mt-4 flex items-center">
              <AlertCircleIcon size={16} className="mr-1" />{' '}
              {/* {stats.activeSales} in progress */}
            </p>
          </motion.div>
          {/* Commission Card */}
          <motion.div className="bg-white hidden rounded-lg shadow-md p-6 border-l-4 border-green-500" whileHover={{
            y: -5,
            transition: {
              duration: 0.2
            }
          }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">Earned Commission</p>
                <h3 className="text-3xl font-bold text-[#3f1403] mt-1">
                  ₦0
                </h3>
              </div>
              <div className="bg-green-500/10 p-3 rounded-full">
                <BarChartIcon size={24} className="text-green-500" />
              </div>
            </div>
            <p className="text-green-600 text-sm mt-4 hidden items-center">
              <AlertCircleIcon size={16} className="mr-1" /> $
              {/* {stats.pendingCommission.toLocaleString()} pending */}
            </p>
          </motion.div>
        </div>
      </AnimatedSection>


      {/* Tabs */}
      <AnimatedSection delay={0.3}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b border-gray-200">
            {tabs.map(tab => <button key={tab.id} className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${activeTab === tab.id ? 'text-[#ec9a4e] border-b-2 border-[#ec9a4e]' : 'text-gray-500 hover:text-[#3f1403]'}`} onClick={() => setActiveTab(tab.id)}>
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>)}
          </div>
          <div className="p-6">
            {activeTab === 'stats' && <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} exit={{
              opacity: 0
            }}>
              <h3 className="text-xl font-semibold text-[#3f1403] mb-4">
                Performance Overview
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="text-lg font-medium text-[#3f1403] mb-4">
                  Sales Performance
                </h4>
                <div className="h-64 flex items-center justify-center">
                  <p className="text-gray-500">
                    Chart visualization would appear here in a real
                    implementation
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-medium text-[#3f1403] mb-4">
                    Referral Growth
                  </h4>
                  <div className="h-48 flex items-center justify-center">
                    <p className="text-gray-500">
                      Referral growth chart would appear here
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-medium text-[#3f1403] mb-4">
                    Commission Breakdown
                  </h4>
                  <div className="h-48 flex items-center justify-center">
                    <p className="text-gray-500">
                      Commission breakdown chart would appear here
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>}
            {activeTab === 'referrals' && <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} exit={{
              opacity: 0
            }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-[#3f1403]">
                  Your Direct Referrals
                </h3>
                <Button variant="secondary" size="sm" onClick={() => setShowInviteModal(true)}>
                  <UserIcon size={16} className="mr-2" /> Invite New
                </Button>
              </div>

              {
                loadingReferrals ? (
                  <PageLoader />
                ) : (
                  <>
                    {
                      user.referrals.length === 0 ? (
                        <div className="max-w-md mx-auto text-center py-8">
                          <UserX2 size={48} className="mx-auto text-gray-400 mb-4" />
                          <h3 className="text-xl font-semibold text-[#3f1403] mb-2">
                            You have no referrals yet
                          </h3>
                          <p className="text-gray-500 mb-6">
                            Start inviting new people and grow you network.
                          </p>
                          <Button onClick={() => setShowInviteModal(true)} variant="primary">
                            <UserIcon size={16} className="mr-2" /> Invite New
                          </Button>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Join Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Phone
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Telegram
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {referrals.map((referral, index) => <motion.tr key={referral._id} initial={{
                                opacity: 0
                              }} animate={{
                                opacity: 1
                              }} transition={{
                                delay: index * 0.1
                              }}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                                      <UserIcon size={20} className="text-gray-500" />
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">
                                        {referral.firstName} {referral.lastName}
                                      </div>
                                      <p className='text-sm text-gray-500'>{referral.email}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {new Date(referral.dateJoined).toLocaleDateString() ?? ""}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-center`}>
                                    {referral.phoneNumber}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm underline text-gray-500">
                                  <a href={`https://t.me/${encodeURIComponent(referral.telegramUsername.replace(/^@/, ""))}`}>{referral.telegramUsername}</a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                  <button onClick={() => {
                                    setSelectedReferral(referral);
                                    setIsModalOpen(true);
                                  }} className="text-[#ec9a4e] hover:text-[#3f1403]">
                                    View Details
                                  </button>
                                </td>
                              </motion.tr>)}
                            </tbody>
                          </table>
                        </div>
                      )
                    }
                  </>
                )
              }
            </motion.div>}
            {activeTab === 'properties' && <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} exit={{
              opacity: 0
            }} >
              <div className="text-center py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topProperties?.map((property) => (
                  <PropertyCard {...property} title={property.name} imageUrl={property.flier} key={property._id} />
                ))}
              </div>
              <div className="max-w-md mx-auto text-center flex flex-col items-center py-8">
                <p className="text-gray-500">
                  Find more properties.
                </p>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <a href="/properties" className="inline-flex items-center justify-center font-medium rounded-md transition-all duration-300 focus:outline-none bg-[#3f1403] text-white hover:bg-[#5d2007] text-base px-8 py-3">
                    <HomeIcon size={16} className="mr-2" /> Browse Properties
                  </a>
                </td>
              </div>
            </motion.div>}
          </div>
        </div>
      </AnimatedSection>

      <div className='p-4 shadow-md rounded-md my-4'>
        <h2 className='text-red-500  text-2xl font-bold'>Danger Zone</h2>

        <Button onClick={logout} disabled={loggingOut} className='bg-red-500 flex gap-2 mt-6 hover:bg-red-500/90'>
          {!loggingOut ? (
            <>
              <Power />
              <span>Log out</span>
            </>
          ) : (
            <>
              <Loader2 className='animate-spin w-4 h4' />
              <span>Processing</span>
            </>
          )
          }
        </Button>
      </div>
    </div>

    <InviteMemberModal
      isOpen={showInviteModal}
      onClose={() => setShowInviteModal(false)}
      userRefCode={userRefCode}
    />
    <ReferralDetailsModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      referral={selectedReferral}
    />
  </div>;
};
export default Dashboard;