import { motion } from "framer-motion";
import {
  UsersIcon,
  UserCheckIcon,
  UserXIcon,
  Share2Icon,
} from "lucide-react";

const AdminStatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 my-8 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Users */}
      <motion.div
        className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#ec9a4e]"
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <h3 className="text-3xl font-bold text-[#3f1403] mt-1">
              {stats?.totalUsers}
            </h3>
          </div>
          <div className="bg-[#ec9a4e]/10 p-3 rounded-full">
            <UsersIcon size={24} className="text-[#ec9a4e]" />
          </div>
        </div>
      </motion.div>

      {/* Verified Users */}
      <motion.div
        className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500"
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-500 text-sm">Verified Users</p>
            <h3 className="text-3xl font-bold text-[#3f1403] mt-1">
              {stats?.verifiedUsers}
            </h3>
          </div>
          <div className="bg-green-500/10 p-3 rounded-full">
            <UserCheckIcon size={24} className="text-green-500" />
          </div>
        </div>
      </motion.div>

      {/* Unverified Users */}
      {/* <motion.div
        className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500"
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-500 text-sm">Unverified Users</p>
            <h3 className="text-3xl font-bold text-[#3f1403] mt-1">
              {stats?.unverifiedUsers}
            </h3>
          </div>
          <div className="bg-red-500/10 p-3 rounded-full">
            <UserXIcon size={24} className="text-red-500" />
          </div>
        </div>
      </motion.div> */}

      {/* Users with Referrals */}
      <motion.div
        className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500"
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-500 text-sm">Users with Referrals</p>
            <h3 className="text-3xl font-bold text-[#3f1403] mt-1">
              {stats?.usersWithReferrals}
            </h3>
          </div>
          <div className="bg-blue-500/10 p-3 rounded-full">
            <Share2Icon size={24} className="text-blue-500" />
          </div>
        </div>
      </motion.div>

      
    </div>
  );
};

export default AdminStatsCards;
