import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchIcon, FilterIcon } from 'lucide-react';
import PropertyCard from '../components/ui/PropertyCard';
import AnimatedSection from '../components/ui/AnimatedSection';
// Mock property data
const properties = [{
  id: 'prop1',
  title: 'Luxury Waterfront Villa',
  location: 'Miami Beach, FL',
  price: '$2,450,000',
  imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1587&q=80',
  description: 'Stunning waterfront villa with panoramic ocean views, private pool, and direct beach access.',
  type: 'Residential',
  features: ['5 Bedrooms', '6 Bathrooms', 'Pool', 'Beach Access', 'Home Theater', 'Wine Cellar']
}, {
  id: 'prop2',
  title: 'Modern Downtown Loft',
  location: 'New York, NY',
  price: '$1,750,000',
  imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
  description: 'Spacious downtown loft with floor-to-ceiling windows, exposed brick walls, and high-end finishes.',
  type: 'Residential',
  features: ['2 Bedrooms', '2 Bathrooms', 'Open Floor Plan', 'Doorman', 'Roof Access']
}, {
  id: 'prop3',
  title: 'Retail Space in Shopping District',
  location: 'Los Angeles, CA',
  price: '$3,200,000',
  imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80',
  description: 'Prime retail space in high-traffic shopping district with ample parking and visibility.',
  type: 'Commercial',
  features: ['3,500 sq ft', 'High Foot Traffic', 'Corner Location', 'Parking']
}, {
  id: 'prop4',
  title: 'Suburban Family Home',
  location: 'Austin, TX',
  price: '$850,000',
  imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
  description: 'Beautiful family home in quiet suburban neighborhood with large backyard and updated kitchen.',
  type: 'Residential',
  features: ['4 Bedrooms', '3 Bathrooms', 'Backyard', 'Updated Kitchen', '2-Car Garage']
}, {
  id: 'prop5',
  title: 'Office Building Downtown',
  location: 'Chicago, IL',
  price: '$5,800,000',
  imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80',
  description: 'Modern office building with flexible floor plans, meeting rooms, and underground parking.',
  type: 'Commercial',
  features: ['12,000 sq ft', 'Multiple Floors', 'Meeting Rooms', 'Underground Parking']
}, {
  id: 'prop6',
  title: 'Mountain Retreat',
  location: 'Aspen, CO',
  price: '$3,200,000',
  imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1465&q=80',
  description: 'Luxurious mountain home with breathtaking views, hot tub, and ski-in/ski-out access.',
  type: 'Residential',
  features: ['4 Bedrooms', '5 Bathrooms', 'Hot Tub', 'Ski Access', 'Fireplace']
}];
// Location and property type options
const locations = ['All Locations', 'Miami Beach, FL', 'New York, NY', 'Los Angeles, CA', 'Austin, TX', 'Chicago, IL', 'Aspen, CO'];
const propertyTypes = ['All Types', 'Residential', 'Commercial'];
const PropertiesPage = () => {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedType, setSelectedType] = useState('All Types');
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    let results = properties;
    // Filter by location
    if (selectedLocation !== 'All Locations') {
      results = results.filter(property => property.location === selectedLocation);
    }
    // Filter by type
    if (selectedType !== 'All Types') {
      results = results.filter(property => property.type === selectedType);
    }
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(property => property.title.toLowerCase().includes(query) || property.description.toLowerCase().includes(query) || property.location.toLowerCase().includes(query));
    }
    setFilteredProperties(results);
  }, [selectedLocation, selectedType, searchQuery]);
  return <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
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
        {/* Filters Section */}
        <AnimatedSection delay={0.1} className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search properties..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ec9a4e] focus:border-transparent" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <select value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)} className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-[#ec9a4e] focus:border-transparent">
                    {locations.map(location => <option key={location} value={location}>
                        {location}
                      </option>)}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <FilterIcon size={16} className="text-gray-400" />
                  </div>
                </div>
                <div className="relative">
                  <select value={selectedType} onChange={e => setSelectedType(e.target.value)} className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-[#ec9a4e] focus:border-transparent">
                    {propertyTypes.map(type => <option key={type} value={type}>
                        {type}
                      </option>)}
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
            {filteredProperties.length > 0 ? filteredProperties.map((property, index) => <motion.div key={property.id} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: 20
          }} transition={{
            duration: 0.3,
            delay: index * 0.1
          }}>
                  <PropertyCard {...property} />
                </motion.div>) : <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
                <p className="text-gray-500 text-lg">
                  No properties match your current filters.
                </p>
                <button onClick={() => {
              setSelectedLocation('All Locations');
              setSelectedType('All Types');
              setSearchQuery('');
            }} className="mt-4 text-[#ec9a4e] hover:underline">
                  Reset filters
                </button>
              </div>}
          </AnimatePresence>
        </div>
      </div>
    </div>;
};
export default PropertiesPage;