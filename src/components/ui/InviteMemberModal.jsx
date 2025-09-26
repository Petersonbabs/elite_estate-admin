import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy as CopyIcon, CheckIcon, X } from "lucide-react";
import Button from "./Button";

const InviteMemberModal = ({
    isOpen,
    onClose,
    userRefCode,
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(userRefCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Modal container */}
                    <motion.div
                        className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6 relative"
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

                        {/* Heading */}
                        <h2 className="text-2xl font-bold text-[#3f1403] mb-2 font-playfair">
                            Invite a New Member
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Share your unique referral link and grow your network in the Female Realtors Forum.
                        </p>

                        {/* Referral link box */}
                        <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                            <div className="flex-1 bg-gray-100 rounded-md px-4 py-2 border border-gray-200 overflow-hidden">
                                <p className="font-mono text-sm text-gray-700 truncate">
                                    {userRefCode}
                                </p>
                            </div>
                            <Button
                                onClick={handleCopy}
                                variant="secondary"
                                className="whitespace-nowrap"
                            >
                                {copied ? (
                                    <>
                                        <CheckIcon size={16} className="mr-2" /> Copied!
                                    </>
                                ) : (
                                    <>
                                        <CopyIcon size={16} className="mr-2" /> Copy
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* CTA */}
                        <div className="mt-6 flex justify-end">
                            <Button onClick={onClose} variant="primary">
                                Done
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InviteMemberModal;
