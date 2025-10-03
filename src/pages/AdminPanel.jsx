import AddPropertyModal from '../components/ui/AddPropertyModal';
import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users as UsersIcon, Home as HomeIcon, PieChart as PieChartIcon, Settings as SettingsIcon, PlusIcon, SearchIcon, UserIcon, EditIcon, TrashIcon, AlertCircleIcon, Loader2, X, FolderX } from 'lucide-react';
import { authContext } from "../contexts/AuthContext"
import Button from '../components/ui/Button';
import AnimatedSection from '../components/ui/AnimatedSection';
import PageLoader from '../components/ui/PageLoader';
import AdminStatsCards from '../components/ui/AdminStatsCards';
import { useUser } from '../contexts/UserContext';
import AdminProperties from '../components/ui/AdminProperties';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../lib/axios';
const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('members');
  const { loadingUsers, getAllUsers, globalStats, users: members, usersPagination: pagination } = useUser()
  const { logout, loggingOut } = useContext(authContext)
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [path, setPath] = useState([])
  const [downlines, setDownlines] = useState([])
  const [loadingDownlines, setLoadingDownlines] = useState(false)
  const navigate = useNavigate()

  const openReferrals = async (user) => {
    setPath((prev) => [...prev, user]) // push to breadcrumb trail
    await fetchDownlines(user._id)
  }

  const fetchDownlines = async (userId) => {
    setLoadingDownlines(true)
    try {
      const res = await axiosInstance(`/referral/${userId}`)
      setDownlines(res.data.referrals || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingDownlines(false)
    }
  }

  const handleBreadcrumbClick = async (index) => {
    const newPath = path.slice(0, index + 1) // keep up to clicked user
    setPath(newPath)
    await fetchDownlines(newPath[newPath.length - 1]._id)
  }




  useEffect(() => {
    const fetchUsers = () => {
      const adminid = localStorage.getItem("adminid")
      const token = localStorage.getItem("token")
      if (!adminid || !token) {
        navigate("/login")
        return
      }
      getAllUsers(adminid)
      // getMyReferrals(userId)
    }
    fetchUsers()
    // getTopProperties()
  }, [])

  const onPageChange = (page) => {
    if (page < 1 || page > pagination.totalPages) return;
    const adminid = localStorage.getItem("adminid")
    getAllUsers(adminid, page)
  };

  const sidebarItems = [{
    id: 'members',
    label: 'Members',
    icon: <UsersIcon size={20} />
  }, {
    id: 'properties',
    label: 'Properties',
    icon: <HomeIcon size={20} />
  }, {
    id: 'analytics',
    label: 'Analytics',
    icon: <PieChartIcon size={20} />
  }, {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon size={20} />
  }];
  return <div className="min-h-screen bg-gray-50 py-16">
    <div className="flex">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 flex-col fixed left-0 top-16 bottom-0 bg-[#3f1403] text-white p-4">
        <div className="py-4 px-2">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-sm text-gray-300 mt-1">
            Female Realtors Forum
          </p>
        </div>
        <nav className="mt-6 flex-1">
          <ul className="space-y-1">
            {sidebarItems.map(item => <li key={item.id}>
              <button className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${activeSection === item.id ? 'bg-[#ec9a4e] text-white' : 'text-gray-300 hover:bg-white/10'}`} onClick={() => setActiveSection(item.id)}>
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            </li>)}
          </ul>
        </nav>
        <div className="pt-4 mt-auto border-t border-white/10">
          <div className="flex items-center px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-[#ec9a4e] flex items-center justify-center mr-3">
              <span className="font-semibold text-xs">AS</span>
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-300">{localStorage.getItem("email") || ""}</p>
            </div>
          </div>
          <button onClick={logout} className='mt-4 border w-full py-2 rounded border-red-500 flex items-center justify-center'>
            {loggingOut ? <Loader2 className='animate-spin w-5 h-5' /> : "Log out"}
          </button>
        </div>
      </div>
      {/* Mobile Navbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2 z-10 shadow-md pb-safe ">
        {sidebarItems.map(item => <button key={item.id} className={`flex flex-col items-center justify-center p-2 rounded-md ${activeSection === item.id ? 'text-[#ec9a4e]' : 'text-gray-500'}`} onClick={() => setActiveSection(item.id)}>
          {item.icon}
          <span className="text-xs mt-1">{item.label}</span>
        </button>)}
      </div>
      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-6">
        {activeSection === 'members' && <AnimatedSection>
          {
            path.length > 0 && (
              <div className="fixed inset-0 mt-16 bg-black/40 flex justify-end z-50">
                <div className='h-full w-full'
                  onClick={() => {
                    setPath([])
                    setDownlines([])
                  }}></div>
                <div className="bg-white w-[90%] sm:max-w-[400px]  h-full shadow-xl p-4 overflow-y-auto">
                  <button
                    className=" hover:text-gray-700 mb-4 flex text-red-500 items-center"
                    onClick={() => {
                      setPath([])
                      setDownlines([])
                    }}
                  >
                    <X />Close
                  </button>

                  {/* Breadcrumb */}
                  <div className="flex flex-wrap items-center gap-1 mb-4 text-sm text-gray-600">
                    {path.map((user, i) => (
                      <span key={i} className="flex items-center">
                        <button
                          className="hover:underline"
                          onClick={() => handleBreadcrumbClick(i)}
                        >
                          {user.firstName} {user.lastName}
                        </button>
                        {i < path.length - 1 && <span className="mx-1">›</span>}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-lg font-semibold mb-3">
                    {path[path.length - 1]?.firstName}’s Downlines
                  </h2>

                  {loadingDownlines ? (
                    <PageLoader />
                  ) : downlines.length === 0 ? (
                    <div className='flex h-[200px] text-gray-500 justify-center flex-col gap-2 items-center'>
                      <FolderX className='w-12 h-12'/>
                      <p>No downlines found</p>
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {downlines.map((dl, i) => (
                        <li
                          key={i}
                          className="p-2  rounded border hover:bg-gray-50 cursor-pointer"
                          onClick={() => openReferrals(dl)}
                        >
                          <p className="font-medium">{dl.firstName} {dl.lastName}</p>
                          <p className="text-xs text-gray-500">{dl.email}</p>
                          <p className="text-xs text-gray-500">
                            Referrals: {dl.stats?.totalReferrals || 0}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )
          }
          <div className="bg-white  rounded-lg shadow-md p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#3f1403]">
                  Members Management
                </h2>
                <p className="text-gray-500">
                  Manage and view all members of the network
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search members..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ec9a4e] focus:border-transparent" />
                </div>
                {/* <Button variant="primary">
                  <PlusIcon size={16} className="mr-2" /> Add Member
                </Button> */}
              </div>
            </div>
            <AdminStatsCards stats={globalStats} />
            {
              loadingUsers ? (
                <PageLoader />
              ) : (
                <>
                  <div className="overflow-x-auto w-full">
                    <table className="table-auto w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 sm:px-6 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Member
                          </th>
                          <th className="px-3 sm:px-6 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-3 sm:px-6 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Referrals
                          </th>
                          <th className="px-3 sm:px-6 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sales
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {members?.map((member, index) => (
                          <motion.tr
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <td className="px-3 sm:px-6 py-3 text-xs sm:text-sm whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-[#ec9a4e]/10 flex items-center justify-center">
                                  <UserIcon size={14} className="sm:size-16 text-[#ec9a4e]" />
                                </div>
                                <div className="ml-3 sm:ml-4">
                                  <div className="text-xs sm:text-sm font-medium text-gray-900">
                                    {member.firstName} {member.lastName}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td
                              className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-500 whitespace-normal break-words max-w-[140px] sm:max-w-[240px]"
                              title={member.email}
                            >
                              {member.email}
                            </td>
                            <td
                              className="px-3 cursor-pointer hover:text-[#ec9a4e] underline hover:decoration-0 sm:px-4 py-3 text-xs sm:text-sm text-gray-500"
                              onClick={() => openReferrals(member)}
                            >
                              {member.stats.totalReferrals}
                            </td>
                            <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-500">
                              {member.stats.totalSales}
                            </td>
                            {/* <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium">
                              <div className="flex space-x-2 sm:space-x-3">
                                <button className="text-blue-600 hover:text-blue-900">
                                  <EditIcon size={14} />
                                </button>
                                <button className="text-red-600 hover:text-red-900">
                                  <TrashIcon size={14} />
                                </button>
                              </div>
                            </td> */}
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>


                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="text-sm text-gray-500 text-center sm:text-left">
                      Showing <span className="font-medium">
                        {(pagination.currentPage - 1) * pagination.pageSize + 1}
                      </span>{" "}
                      to <span className="font-medium">
                        {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalUsers)}
                      </span>{" "}
                      of <span className="font-medium">{pagination.totalUsers}</span> members
                    </div>
                    <div className="flex justify-center sm:justify-end space-x-1">
                      <button
                        onClick={() => onPageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => onPageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>

                </>
              )
            }
          </div>
        </AnimatedSection>}
        {activeSection === 'properties' && <AnimatedSection>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#3f1403]">
                  Properties Management
                </h2>
                <p className="text-gray-500">
                  Manage and add properties to the network
                </p>
              </div>
              <Button variant="primary" onClick={() => setIsAddPropertyOpen(true)}>
                <PlusIcon size={16} className="mr-2" /> Add Property
              </Button>
            </div>
            <AdminProperties />

          </div>
        </AnimatedSection>}
        {activeSection === 'analytics' && <AnimatedSection>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#3f1403]">
                Network Analytics
              </h2>
              <p className="text-gray-500">
                View performance metrics and statistics
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-[#3f1403] mb-4">
                  Member Growth
                </h3>
                <div className="h-64 flex items-center justify-center">
                  <p className="text-gray-500">
                    Growth chart would appear here
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-[#3f1403] mb-4">
                  Sales Performance
                </h3>
                <div className="h-64 flex items-center justify-center">
                  <p className="text-gray-500">
                    Sales chart would appear here
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-[#3f1403] mb-4">
                Referral Network Map
              </h3>
              <div className="h-96 flex items-center justify-center">
                <p className="text-gray-500">
                  Network visualization would appear here
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>}
        {activeSection === 'settings' && <AnimatedSection>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#3f1403]">
                System Settings
              </h2>
              <p className="text-gray-500">
                Configure system settings and preferences
              </p>
            </div>
            <div className="space-y-6">
              <div className="p-4 border border-yellow-300 bg-yellow-50 rounded-md flex items-start">
                <AlertCircleIcon size={20} className="text-yellow-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-700">
                    Demo Mode Active
                  </h3>
                  <p className="text-sm text-yellow-600">
                    This is a demonstration of the admin panel UI. In a real
                    implementation, this would contain actual settings and
                    configuration options.
                  </p>
                </div>
              </div>
              <div className="border-b pb-6">
                <h3 className="text-lg font-medium text-[#3f1403] mb-4">
                  General Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Site Name
                    </label>
                    <input type="text" value="Female Realtors Forum" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ec9a4e] focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Contact Email
                    </label>
                    <input type="email" value="contact@frnforum.com" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ec9a4e] focus:border-transparent" />
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="maintenanceMode" className="h-4 w-4 text-[#ec9a4e] focus:ring-[#ec9a4e] border-gray-300 rounded" />
                    <label htmlFor="maintenanceMode" className="ml-2 text-gray-700">
                      Enable Maintenance Mode
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-[#3f1403] mb-4">
                  Referral Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Commission Rate (%)
                    </label>
                    <input type="number" value="5" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ec9a4e] focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Referral Link Format
                    </label>
                    <input type="text" value="https://frn.network/ref/{username}" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ec9a4e] focus:border-transparent" />
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Button variant="primary">Save Settings</Button>
              </div>
            </div>
          </div>
        </AnimatedSection>}
      </div>
    </div>

    <AddPropertyModal
      isOpen={isAddPropertyOpen}
      onClose={() => setIsAddPropertyOpen(false)}
      onSubmit={(newProperty) => {
        setProperties((prev) => [...prev, newProperty]);
        console.log("New property submitted:", newProperty);
      }}
    />
  </div>;
};
export default AdminPanel;