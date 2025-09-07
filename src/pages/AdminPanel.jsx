import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users as UsersIcon, Home as HomeIcon, PieChart as PieChartIcon, Settings as SettingsIcon, PlusIcon, SearchIcon, UserIcon, EditIcon, TrashIcon, AlertCircleIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import AnimatedSection from '../components/ui/AnimatedSection';
const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('members');
  // Mock data for admin panel
  const members = [{
    id: 1,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    referrals: 12,
    sales: 8,
    status: 'Active'
  }, {
    id: 2,
    name: 'Emily Johnson',
    email: 'emily.j@example.com',
    referrals: 8,
    sales: 5,
    status: 'Active'
  }, {
    id: 3,
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    referrals: 15,
    sales: 10,
    status: 'Active'
  }, {
    id: 4,
    name: 'Michelle Davis',
    email: 'michelle.d@example.com',
    referrals: 3,
    sales: 1,
    status: 'New'
  }, {
    id: 5,
    name: 'Jessica Brown',
    email: 'jessica.b@example.com',
    referrals: 0,
    sales: 0,
    status: 'Pending'
  }, {
    id: 6,
    name: 'Lisa Garcia',
    email: 'lisa.g@example.com',
    referrals: 5,
    sales: 2,
    status: 'Active'
  }];
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
  return <div className="min-h-screen bg-gray-50 pt-16">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 flex-col fixed left-0 top-16 bottom-0 bg-[#3f1403] text-white p-4">
          <div className="py-4 px-2">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <p className="text-sm text-gray-300 mt-1">
              Female Realtors Network
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
                <p className="text-xs text-gray-300">admin@frnnetwork.com</p>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile Navbar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2 z-10">
          {sidebarItems.map(item => <button key={item.id} className={`flex flex-col items-center justify-center p-2 rounded-md ${activeSection === item.id ? 'text-[#ec9a4e]' : 'text-gray-500'}`} onClick={() => setActiveSection(item.id)}>
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </button>)}
        </div>
        {/* Main Content */}
        <div className="flex-1 md:ml-64 p-6">
          {activeSection === 'members' && <AnimatedSection>
              <div className="bg-white rounded-lg shadow-md p-6">
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
                    <Button variant="primary">
                      <PlusIcon size={16} className="mr-2" /> Add Member
                    </Button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Member
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Referrals
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sales
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {members.map((member, index) => <motion.tr key={member.id} initial={{
                    opacity: 0
                  }} animate={{
                    opacity: 1
                  }} transition={{
                    delay: index * 0.05
                  }}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#ec9a4e]/10 flex items-center justify-center">
                                <UserIcon size={16} className="text-[#ec9a4e]" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {member.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {member.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {member.referrals}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {member.sales}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.status === 'Active' ? 'bg-green-100 text-green-800' : member.status === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {member.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-3">
                              <button className="text-blue-600 hover:text-blue-900">
                                <EditIcon size={16} />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <TrashIcon size={16} />
                              </button>
                            </div>
                          </td>
                        </motion.tr>)}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Showing <span className="font-medium">1</span> to{' '}
                    <span className="font-medium">6</span> of{' '}
                    <span className="font-medium">6</span> members
                  </div>
                  <div className="flex space-x-1">
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50">
                      Previous
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50">
                      Next
                    </button>
                  </div>
                </div>
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
                  <Button variant="primary">
                    <PlusIcon size={16} className="mr-2" /> Add Property
                  </Button>
                </div>
                <div className="text-center py-16">
                  <HomeIcon size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    Property Management Panel
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    This section would contain property management features in a
                    real implementation.
                  </p>
                  <Button variant="secondary">View Properties Page</Button>
                </div>
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
                        <input type="text" value="Female Realtors Network" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ec9a4e] focus:border-transparent" />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">
                          Contact Email
                        </label>
                        <input type="email" value="contact@frnnetwork.com" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ec9a4e] focus:border-transparent" />
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
    </div>;
};
export default AdminPanel;