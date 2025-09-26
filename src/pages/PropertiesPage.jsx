import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchIcon, FilterIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyCard from '../components/ui/PropertyCard';
import AnimatedSection from '../components/ui/AnimatedSection';
import { PropertyContext } from '../contexts/PropertyContext';

const propertyTypes = ['All Types', 'Residential', 'Commercial'];

const PropertiesPage = () => {
  const { getProperties, properties, pagination } = useContext(PropertyContext);
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedType, setSelectedType] = useState('All Types');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(properties || []);
  const [currentPage, setCurrentPage] = useState(1);

  const locations = React.useMemo(() => {
    if (!properties || properties.length === 0) return ['All Locations'];
    const unique = Array.from(new Set(properties.map(p => p.location)));
    return ['All Locations', ...unique];
  }, [properties]);

  useEffect(() => {
    getProperties(currentPage);
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
  }, [selectedLocation, selectedType, searchQuery, properties]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[#3f1403] font-playfair mb-4">
              Exclusive Property Listings
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our curated collection of premium properties available
              through the Female Realtors Network.
            </p>
          </div>
        </AnimatedSection>

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <PropertyCard
                    {...property}
                    imageUrl={property.flier}
                    title={property.name}
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
    </div>
  );
};

export default PropertiesPage;
