import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button from "./Button";
import { PropertyContext } from "../../contexts/PropertyContext";
import { toast } from "sonner";

const DeletePropertyModal = ({ isOpen, onClose, onSubmit, id }) => {

    const { addingProperty, detetingProperty, deleteProperty } = useContext(PropertyContext)



    const handleDelete = async () => {
        const res = await deleteProperty(id)
        if (res.status === 200) {
            toast.success("deleted!")
            onClose()
        }
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
                            Are you sure?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this property. This action is irreversible.
                        </p>

                        <div className="flex justify-end gap-3 mt-4">
                            <Button type="button" onClick={onClose} variant="secondary">
                                Cancel
                            </Button>
                            <Button onClick={handleDelete} disabled={detetingProperty === id} variant="primary">
                                {detetingProperty === id ? "Deleting..." : "Delete"}
                            </Button>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DeletePropertyModal;
