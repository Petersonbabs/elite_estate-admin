import { createContext, useState } from "react"
import axiosInstance from "../lib/axios"
import { toast } from "sonner"

export const PropertyContext = createContext()


const PropertyProvider = ({ children }) => {

    const [topProperties, setTopProperties] = useState([])
    const [properties, setProperties] = useState([])
    const [pagination, setPagination] = useState(null);
    const [loadingProperties, setLoadingProperties] = useState(false)
    const [addingProperty, setAddingProperty] = useState(false)

    const getTopProperties = async () => {
        setLoadingProperties(true)
        try {
            const res = await axiosInstance("/all/property")
            setTopProperties(res.data.data.reverse().slice(0, 3))
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingProperties(false)
        }

    }
    const getProperties = async () => {
        setLoadingProperties(true)
        try {
            const res = await axiosInstance("/all/property")
            setProperties(res.data.data.reverse())
            setPagination(res.data.pagination);
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingProperties(false)
        }

    }

    const addProperty = async (adminId, data) => {
        setAddingProperty(true);
        try {
            const formDataToSend = new FormData();
            Object.keys(data).forEach((key) => {
                if (data[key] !== null) {
                    formDataToSend.append(key, data[key]);
                }
            });

            const res = await axiosInstance.post(
                `/list/property/${adminId}`,
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success(res.data.message)
        } catch (error) {
            console.log(error);
        } finally {
            setAddingProperty(false);
        }
    };


    const data = { topProperties, addingProperty, properties, pagination, loadingProperties, addProperty, getTopProperties, getProperties }
    return <PropertyContext.Provider value={data}>{children}</PropertyContext.Provider>
}

export default PropertyProvider