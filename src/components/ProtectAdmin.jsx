import { useContext, useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { authContext } from "../contexts/AuthContext"

const ProtectAdmin = () => {
    const { isAdminAuth, checkAdminAuth } = useContext(authContext)
    useEffect(() => {
        checkAdminAuth()
    }, [])
    if (!isAdminAuth) {
        return <Navigate to="/login" replace />
    }
    return <Outlet />
}

export default ProtectAdmin