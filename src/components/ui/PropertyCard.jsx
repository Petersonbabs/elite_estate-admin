import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, DownloadIcon, CopyIcon, CheckIcon } from 'lucide-react';

const PropertyCard = ({
  id,
  title,
  location,
  price,
  imageUrl,
  description,
  propertyType,
  features
}) => {
  const [copied, setCopied] = useState(false);
  const handleCopyText = () => {
    const marketingText = `
${title}
Location: ${location}
Price: ${price}
Type: ${propertyType}
${description}
Key Features:

For more information, please contact your FRN representative.
    `.trim();
    navigator.clipboard.writeText(marketingText);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  const handleDownload = async () => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "flyer.png"; // force file name
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  };
  return <motion.div className="rounded-lg overflow-hidden shadow-lg bg-white h-full flex flex-col" whileHover={{
    y: -5,
    transition: {
      duration: 0.2
    }
  }}>
    <div className="relative h-48 overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
      <div className="absolute top-3 right-3 bg-[#ec9a4e] text-white text-sm font-medium px-2 py-1 rounded">
        {propertyType}
      </div>
    </div>
    <div className="p-5 flex-grow flex flex-col">
      <div className="mb-4 flex-grow">
        <div className="flex gap-4 items-start justify-between">
          <h3 className="text-xl font-semibold text-[#3f1403] mb-1">
            {title}
          </h3>
          <p className="text-[#ec9a4e] min-w-fit font-bold">₦{price.toLocaleString()}</p>
        </div>
        <div className="flex items-center text-gray-500 mb-3">
          <MapPinIcon size={16} className="mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </p>
        <div className="mb-4 hidden">
          <h4 className="text-sm font-medium text-[#3f1403] mb-2">
            Key Features:
          </h4>
          <div className="flex flex-wrap gap-2">
            {features?.slice(0, 3).map((feature, index) => <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              {feature}
            </span>)}
            {features?.length > 3 && <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              +{features?.length - 3} more
            </span>}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-auto">
        <button
          onClick={handleDownload}
          className=" flex items-center justify-center gap-1 bg-[#3f1403] hover:bg-[#ec9a4e] text-white py-2 px-3 rounded transition-colors duration-300 text-sm"
        >
          <DownloadIcon size={16} />
          <span>Download Flyer</span>
        </button>
        <button onClick={handleCopyText} className={` flex items-center justify-center gap-1 border ${copied ? 'bg-green-50 border-green-500 text-green-700' : 'border-gray-300 hover:border-[#ec9a4e] hover:text-[#ec9a4e]'} py-2 px-3 rounded transition-colors duration-300 text-sm`}>
          {copied ? <>
            <CheckIcon size={16} />
            <span>Copied!</span>
          </> : <>
            <CopyIcon size={16} />
            <span>Copy Text</span>
          </>}
        </button>
      </div>
    </div>
  </motion.div>;
};
export default PropertyCard;