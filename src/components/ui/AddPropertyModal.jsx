import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button from "./Button";
import { PropertyContext } from "../../contexts/PropertyContext";

const AddPropertyModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        location: "",
        propertyType: "",
        flier: null,
        description: "",
    });
    const { addingProperty, addProperty } = useContext(PropertyContext)
    const [flierPreview, setflierPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "flier") {
            setFormData({ ...formData, flier: files[0] });
            setflierPreview(URL.createObjectURL(files[0]));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const adminid = localStorage.getItem("adminid")
        if (!adminid) return
        addProperty(adminid, formData);
        setFormData({
            name: "",
            price: "",
            location: "",
            propertyType: "",
            flier: null,
            description: "",
        });
        setflierPreview(null);
        // onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0  bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white max-h-[70vh] overflow-y-auto rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6 relative"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-2xl font-bold text-[#3f1403] mb-2 font-playfair">
                            Add New Property
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Fill in the details below to add a new property to the network.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ec9a4e] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ec9a4e] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ec9a4e] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Property Type</label>
                                <input
                                    type="text"
                                    name="propertyType"
                                    value={formData.propertyType}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ec9a4e] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">flier</label>
                                <input
                                    type="file"
                                    name="flier"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full"
                                />
                                {flierPreview && (
                                    <img
                                        src={flierPreview}
                                        alt="flier Preview"
                                        className="mt-2 w-32 h-32 object-cover rounded-md border"
                                    />
                                )}
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ec9a4e] focus:border-transparent"
                                />
                            </div>

                            <div className="flex justify-end gap-3 mt-4">
                                <Button type="button" onClick={onClose} variant="secondary">
                                    Cancel
                                </Button>
                                <Button type="submit " disabled={addingProperty} variant="primary">
                                    {addingProperty ? "Processing" : "Add property"}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AddPropertyModal;
