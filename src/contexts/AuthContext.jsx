import { createContext, useState } from "react"
import axiosInstance from "../lib/axios"

export const authContext = createContext()


const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("token") && localStorage.getItem("userid") || null)
    const [isAdminAuth, setIsAdminAuth] = useState(localStorage.getItem("token") && localStorage.getItem("adminid") || null)
    const [loggingOut, setLoggingOut] = useState(false)

    const logout = () => {
        setLoggingOut(true)
        setTimeout(() => {
            localStorage.removeItem("token")
            localStorage.removeItem("userid")
            localStorage.removeItem("adminid")
            setIsAuth(null)
            setLoggingOut(false)
        }, 1500)
    }

    const getUserRole = async (userid) => {
        try {
            const res = await axiosInstance(`/user/details/${userid}`)
            // console.log(res.data)
            return res.data.role
        } catch (error) {
            console.log(error)
        }
    }
    const checkAuth = async () => {
        const token = localStorage.getItem("token")
        const userId = localStorage.getItem("userid")
        if (!userId) {
            setIsAuth(false)
            return
        }

        if (token && userId) {
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }
    }

    const checkAdminAuth = async () => {
        const token = localStorage.getItem("token")
        const adminid = localStorage.getItem("adminid")
        if (!adminid) {
            setIsAdminAuth(false)
            return
        }

        if (token && adminid) {
            setIsAdminAuth(true)
        } else {
            setIsAdminAuth(false)
        }
    }
    const data = { isAuth, loggingOut, isAdminAuth, logout, checkAuth, checkAdminAuth }
    return <authContext.Provider value={data}>{children}</authContext.Provider>
}

export default AuthProvider