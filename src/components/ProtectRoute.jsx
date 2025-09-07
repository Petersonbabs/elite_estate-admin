import { useContext, useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { authContext } from "../contexts/AuthContext"

const ProtectRoute = () => {
    const { isAuth, checkAuth } = useContext(authContext)
    useEffect(() => {
        checkAuth()
    }, [])
    if (!isAuth) {
        return <Navigate to="/login" replace />
    }
    return <Outlet />
}

export default ProtectRoute