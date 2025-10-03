import { MapPinIcon, DownloadIcon, CopyIcon, CheckIcon, Trash2, PenBox } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchIcon, FilterIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyCard from './PropertyCard';
import AnimatedSection from './AnimatedSection';
import { PropertyContext } from '../../contexts/PropertyContext';
import PageLoader from './PageLoader';
import DeletePropertyModal from './DeletePropertyModal';
import EditPropertyModal from './EditPropertyModal';

const propertyTypes = ['All Types', 'Residential', 'Commercial'];

const AdminProperties = () => {
    const { getProperties, properties, pagination, loadingProperties } = useContext(PropertyContext);
    const [selectedLocation, setSelectedLocation] = useState('All Locations');
    const [selectedType, setSelectedType] = useState('All Types');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProperties, setFilteredProperties] = useState(properties || []);
    const [currentPage, setCurrentPage] = useState(1);
    const [isDeletePropertyOpen, setIsDeletePropertyOpen] = useState(false);
    const [isEditPropertyOpen, setIsEditPropertyOpen] = useState(false);
    const [selectedPropertyId, setSelectedPropertyId] = useState("");

    const locations = React.useMemo(() => {
        if (!properties || properties.length === 0) return ['All Locations'];
        const unique = Array.from(new Set(properties.map(p => p.location)));
        return ['All Locations', ...unique];
    }, [properties]);

    useEffect(() => {
        getProperties(currentPage);
        console.log(currentPage)
    }, [currentPage]);

    useEffect(() => {
        let results = properties || [];
        if (selectedLocation !== 'All Locations') {
            results = results.filter(p => p.location === selectedLocation);
        }
        if (selectedType !== 'All Types') {
            results = results.filter(p => p.propertyType === selectedType);
        }
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            results = results.filter(
                p =>
                    p.name.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    p.location.toLowerCase().includes(q)
            );
        }
        setFilteredProperties(results);
    }, [selectedLocation, selectedType, searchQuery, properties, currentPage]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div>

                {/* Filters */}
                <AnimatedSection delay={0.1} className="mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-grow relative">
                                <SearchIcon
                                    size={18}
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    type="text"
                                    placeholder="Search properties..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ec9a4e] focus:border-transparent"
                                />
                            </div>
                            {/* Filters */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="relative">
                                    <select
                                        value={selectedLocation}
                                        onChange={e => setSelectedLocation(e.target.value)}
                                        className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-[#ec9a4e] focus:border-transparent"
                                    >
                                        {locations.map(loc => (
                                            <option key={loc} value={loc}>
                                                {loc}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <FilterIcon size={16} className="text-gray-400" />
                                    </div>
                                </div>
                                <div className="relative">
                                    <select
                                        value={selectedType}
                                        onChange={e => setSelectedType(e.target.value)}
                                        className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-[#ec9a4e] focus:border-transparent"
                                    >
                                        {propertyTypes.map(type => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <FilterIcon size={16} className="text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Properties Grid */}
                {
                    loadingProperties ? (
                        <PageLoader />
                    ) : (
                        <div className="grid gap-6">
                            <AnimatePresence>
                                {filteredProperties.length > 0 ? (
                                    filteredProperties.map((property, index) => (
                                        <motion.div
                                            key={property._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                        >
                                            <PropertyRow
                                                {...property}
                                                imageUrl={property.flier}
                                                title={property.name}
                                                id={property._id}
                                                setIsDeletePropertyOpen={setIsDeletePropertyOpen}
                                                setSelectedPropertyId={setSelectedPropertyId}
                                                setIsEditPropertyOpen={setIsEditPropertyOpen}
                                            />
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
                                        <p className="text-gray-500 text-lg">
                                            No properties match your current filters.
                                        </p>
                                        <button
                                            onClick={() => {
                                                setSelectedLocation('All Locations');
                                                setSelectedType('All Types');
                                                setSearchQuery('');
                                            }}
                                            className="mt-4 text-[#ec9a4e] hover:underline"
                                        >
                                            Reset filters
                                        </button>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    )
                }

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                    <div className="flex justify-center mt-12">
                        <nav className="flex items-center gap-2">
                            {/* Prev */}
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-40"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            {/* Page numbers */}
                            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
                                page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-4 py-2 rounded-md border ${currentPage === page
                                            ? 'bg-[#ec9a4e] text-white border-[#ec9a4e]'
                                            : 'border-gray-300 hover:bg-gray-100'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                )
                            )}

                            {/* Next */}
                            <button
                                onClick={() =>
                                    setCurrentPage(p => Math.min(pagination.totalPages, p + 1))
                                }
                                disabled={currentPage === pagination.totalPages}
                                className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-40"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </nav>
                    </div>
                )}
            </div>
            <DeletePropertyModal
                isOpen={isDeletePropertyOpen}
                onClose={() => setIsDeletePropertyOpen(false)}
                id={selectedPropertyId}
            />
            <EditPropertyModal
                isOpen={isEditPropertyOpen}
                onClose={() => setIsEditPropertyOpen(false)}
                id={selectedPropertyId}
            />
        </div>
    );
};

export default AdminProperties;

const PropertyRow = ({
    id,
    title,
    location,
    price,
    imageUrl,
    description,
    propertyType,
    features,
    setSelectedPropertyId,
    setIsDeletePropertyOpen,
    setIsEditPropertyOpen,
    setSelectedProperty
}) => {
    // const [isDeletePropertyOpen, setIsDeletePropertyOpen] = useState(false);

    return (<motion.div className="rounded-lg overflow-hidden h-[100px] shadow-lg bg-white flex " whileHover={{
        y: -5,
        transition: {
            duration: 0.2
        }
    }}>
        <div className="relative h-full overflow-hidden">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
            <div className="absolute top-1 right-1 bg-[#ec9a4e] text-white text-[10px] font-medium  px-1 py-0.5 rounded">
                {propertyType}
            </div>
        </div>
        <div className="p-5 flex-grow flex flex-col md:flex-row">
            <div className="mb-4 flex-grow">
                <div className="flex gap-4 items-start justify-between">
                    <h3 className="text-xl font-semibold text-[#3f1403] mb-1">
                        {title}
                    </h3>
                    <p className="text-[#ec9a4e] min-w-fit font-bold">₦{price.toLocaleString()}</p>
                </div>
                <div className='flex justify-between items-center'>
                    <div className="flex items-center text-gray-500 mb-3">
                        <MapPinIcon size={16} className="mr-1" />
                        <span className="text-sm">{location}</span>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <Trash2 className='text-red-500 w-5 h-5 cursor-pointer' onClick={() => {
                            setIsDeletePropertyOpen(true)
                            setSelectedPropertyId(id)
                        }} />
                        <PenBox className='text-red-500 w-5 h-5 cursor-pointer' onClick={() => {
                            setIsEditPropertyOpen(true)
                            setSelectedPropertyId(id)
                        }} />
                    </div>
                </div>

            </div>

        </div>

    </motion.div>
    )
}