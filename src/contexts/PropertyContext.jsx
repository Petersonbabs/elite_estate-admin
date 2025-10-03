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
    const [detetingProperty, setDeletingProperty] = useState("")

    const getTopProperties = async () => {
        setLoadingProperties(true)
        try {
            const res = await axiosInstance("/all/property")
            setTopProperties(res.data.data.slice(0, 3))
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingProperties(false)
        }

    }
    const getProperties = async (page) => {
        setLoadingProperties(true)
        try {
            const res = await axiosInstance(`/all/property?page=${page}`)
            setProperties(res.data.data)
            setPagination(res.data.pagination);
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingProperties(false)
        }

    }

    const getSingleProperty = async (id) => {
        // setLoadingProperties(true)
        try {
            const res = await axiosInstance(`/single/property/${id}`)
            return res.data.data
        } catch (error) {
            console.log(error)
        } finally {
            // setLoadingProperties(false)
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

    const updateProperty = async (adminId, id, data) => {
        setAddingProperty(true);
        try {
            const formDataToSend = new FormData();
            Object.keys(data).forEach((key) => {
                if (data[key] !== null) {
                    formDataToSend.append(key, data[key]);
                }
            });

            const res = await axiosInstance.put(
                `/edit/property/${adminId}/${id}`,
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success(res.data.message)
            getProperties()
        } catch (error) {
            console.log(error);
        } finally {
            setAddingProperty(false);
        }
    };

    const deleteProperty = async (id) => {
        setDeletingProperty(id)
        try {
            const res = await axiosInstance.delete(`/delete/property/${id}`)
            getProperties(1)
            return res
        } catch (error) {
            console.log(error)
        } finally {
            setDeletingProperty("")
        }
    }


    const data = { topProperties, detetingProperty, addingProperty, properties, pagination, loadingProperties, addProperty, getTopProperties, getProperties, deleteProperty, getSingleProperty, updateProperty }
    return <PropertyContext.Provider value={data}>{children}</PropertyContext.Provider>
}

export default PropertyProvider