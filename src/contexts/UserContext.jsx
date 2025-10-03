import { createContext, useContext, useState } from "react"
import axiosInstance from "../lib/axios"

const userContext = createContext()
export const useUser = () => {
    return useContext(userContext)
}

const UserProvider = ({ children }) => {
    const [loadingProfile, setLoadingProfile] = useState(false)
    const [loadingUsers, setLoadingUsers] = useState(false)
    const [loadingReferrals, setLoadingReferrals] = useState(false)
    const [user, setUser] = useState()
    const [users, setUsers] = useState([])
    const [usersPagination, setUsersPagination] = useState([])
    const [userRefCode, setUserRefCode] = useState("")
    const [referrals, setReferrals] = useState([])
    const [globalStats, setGlobalStats] = useState({})

    const getUserProfile = async (userid) => {
        setLoadingProfile(true)
        try {
            const res = await axiosInstance(`/user/details/${userid}`)
            setUser(res.data)
            setUserRefCode(`${import.meta.env.VITE_CLIENT_URL}/signup?ref=${res.data.referralCode}`)
            return res.data
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingProfile(false)

        }
    }
    const getAllUsers = async (adminId, page=1) => {
        setLoadingUsers(true)
        try {
            const res = await axiosInstance(`/all/users/${adminId}?page=${page}`)
            setUsers(res.data.data)
            setUsersPagination(res.data.pagination)
            setGlobalStats(res.data.globalStats)
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingUsers(false)

        }
    }
    const getMyReferrals = async (userid) => {
        setLoadingReferrals(true)
        try {
            const res = await axiosInstance(`/referral/${userid}`)
            setReferrals(res.data.referrals)
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingReferrals(false)

        }
    }

    const value = {
        loadingProfile,
        userRefCode,
        user,
        users,
        referrals,
        loadingReferrals,
        loadingUsers,
        globalStats,
        usersPagination,
        getMyReferrals,
        getAllUsers,
        getUserProfile
    }
    return (
        <userContext.Provider value={value}>{children}</userContext.Provider>
    )
}

export default UserProvider