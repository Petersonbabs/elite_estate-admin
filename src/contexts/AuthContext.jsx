import { createContext, useState } from "react"

export const authContext = createContext()


const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("token") || null)
    const [loggingOut, setLoggingOut] = useState(false)

    const logout = () => {
        setLoggingOut(true)
        setTimeout(() => {
            localStorage.removeItem("token")
            setIsAuth(null)
            setLoggingOut(false)
        }, 1500)
    }
    const checkAuth = () => {
        const token = localStorage.getItem("token")
        if (token) {
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }
    }
    const data = { isAuth, loggingOut, logout, checkAuth }
    return <authContext.Provider value={data}>{children}</authContext.Provider>
}

export default AuthProvider