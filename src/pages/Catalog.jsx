import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, Users, Clock, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Catalog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // Updated catalogs with U.S. Department of Justice training courses
  const [catalogs, setCatalogs] = useState([
    {
      id: 1,
      name: 'U.S. Department of Justice- National Community Outreach & Prevention',
      description: 'Foundations of law enforcement training, stakeholder analysis, and needs assessment',
      imageUrl: '/assets/us-1.png',
      courseCount: 3,
      studentCount: 120,
      duration: '12 weeks',
      difficulty: 'Intermediate',
      tags: ['Law Enforcement', 'Training', 'DOJ']
    }
  ]);

  // Filter catalogs based on search query
  const filteredCatalogs = catalogs.filter(catalog =>
    catalog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    catalog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    catalog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );



  const handleCatalogClick = (catalog) => {
    navigate('/courses');
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-y-auto">
      <div className="container mx-auto p-4 sm:p-6 animate-fade-in max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Training Catalog
              <Sparkles className="inline-block ml-2 h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive collection of U.S. Department of Justice training programs
            </p>
          </motion.div>
        </div>

        {/* Search and Add Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 w-full text-lg border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Catalogs Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredCatalogs.map((catalog, index) => (
            <motion.div
              key={catalog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
               <Card 
                 className="h-full flex flex-col overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                 onClick={() => handleCatalogClick(catalog)}
               >
                 {/* Image Section */}
                 <div className="relative h-48 flex-shrink-0">
                   <img 
                     src={catalog.imageUrl} 
                     alt={catalog.name}
                     className="w-full h-full object-cover" 
                   />
                 </div>

                 {/* Content Section */}
                 <CardContent className="p-5 flex flex-col flex-grow">
                   {/* Title */}
                   <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-1 h-6 flex-shrink-0">
                     {catalog.name}
                   </h3>
                   
                   {/* Description */}
                   <p className="text-gray-600 mb-4 line-clamp-2 text-sm h-10 flex-shrink-0">
                     {catalog.description}
                   </p>

                   {/* Stats Row */}
                   <div className="flex items-center justify-between mb-3 h-6 flex-shrink-0">
                     <div className="flex items-center gap-1 text-blue-600">
                       <BookOpen className="h-4 w-4" />
                       <span className="text-xs font-medium">{catalog.courseCount} Courses</span>
                     </div>
                     <div className="flex items-center gap-1 text-green-600">
                       <Users className="h-4 w-4" />
                       <span className="text-xs font-medium">{catalog.studentCount} Students</span>
                     </div>
                     <div className="flex items-center gap-1 text-purple-600">
                       <Clock className="h-4 w-4" />
                       <span className="text-xs font-medium">{catalog.duration}</span>
                     </div>
                   </div>

                   {/* Tags */}
                   <div className="flex flex-wrap gap-1 mb-4 h-8 flex-shrink-0">
                     {catalog.tags.slice(0, 3).map((tag, idx) => (
                       <span 
                         key={idx}
                         className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
                       >
                         {tag}
                       </span>
                     ))}
                   </div>

                   {/* Spacer to push button to bottom */}
                   <div className="flex-grow"></div>

                   {/* Action Button */}
                   <Button
                     className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 text-sm py-2.5 mt-auto"
                     onClick={(e) => {
                       e.stopPropagation();
                       handleCatalogClick(catalog);
                     }}
                   >
                     Explore Catalog
                     <ChevronRight className="h-4 w-4" />
                   </Button>
                 </CardContent>
               </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredCatalogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Results Found</h3>
              <p className="text-gray-600">
                We couldn't find any catalogs matching your search. Try adjusting your search terms.
              </p>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Catalog;