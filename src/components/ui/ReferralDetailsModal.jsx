import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy as CopyIcon, CheckIcon, X } from "lucide-react";
import Button from "./Button";

const ReferralDetailsModal = ({ isOpen, onClose, referral }) => {
  const [copied, setCopied] = useState(false);

  if (!referral) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(referral.telegramUsername);
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
            <h2 className="text-2xl font-bold text-[#3f1403] mb-4 font-playfair">
              Referral Details
            </h2>

            <div className="space-y-3 text-gray-700 text-sm">
              <p>
                <strong>Name:</strong> {referral.firstName} {referral.lastName}
              </p>
              <p>
                <strong>Email:</strong> {referral.email}
              </p>
              <p>
                <strong>Phone:</strong> {referral.phoneNumber}
              </p>
              <p>
                <strong>WhatsApp:</strong> {referral.whatsAppNumber}
              </p>
              <p>
                <strong>Address:</strong> {referral.address}
              </p>
              <p className="flex items-center gap-2">
                <strong>Telegram:</strong>{" "}
                <a
                  href={`https://t.me/${encodeURIComponent(
                    referral.telegramUsername.replace(/^@/, "")
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ec9a4e] hover:text-[#3f1403] underline"
                >
                  @{referral.telegramUsername}
                </a>
                <Button
                  onClick={handleCopy}
                  variant="secondary"
                  className="px-2 py-1 text-xs"
                >
                  {copied ? (
                    <>
                      <CheckIcon size={14} className="mr-1" /> Copied!
                    </>
                  ) : (
                    <>
                      <CopyIcon size={14} className="mr-1" /> Copy
                    </>
                  )}
                </Button>
              </p>
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

export default ReferralDetailsModal;
