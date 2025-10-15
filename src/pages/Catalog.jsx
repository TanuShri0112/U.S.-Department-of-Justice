import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash2, BookOpen, Users, Clock, ChevronRight, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const Catalog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddCatalogOpen, setIsAddCatalogOpen] = useState(false);
  const [isEditCatalogOpen, setIsEditCatalogOpen] = useState(false);
  const [editingCatalog, setEditingCatalog] = useState(null);
  const [newCatalogName, setNewCatalogName] = useState('');
  const [newCatalogDescription, setNewCatalogDescription] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // Updated catalogs with more metadata
  const [catalogs, setCatalogs] = useState([
    {
      id: 1,
      name: 'Insurance Fundamentals',
      description: 'Core insurance concepts, policies, and industry knowledge',
      imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=300&fit=crop&auto=format',
      courseCount: 2,
      studentCount: 150,
      duration: '8 weeks',
      difficulty: 'Beginner',
      tags: ['Insurance', 'Fundamentals', 'Core Concepts']
    },
    {
      id: 2,
      name: 'Life Insurance Sales',
      description: 'Life insurance products, sales techniques, and customer engagement',
      imageUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=300&fit=crop&auto=format',
      courseCount: 1,
      studentCount: 120,
      duration: '6 weeks',
      difficulty: 'Intermediate',
      tags: ['Sales', 'Life Insurance', 'Customer Engagement']
    },
    {
      id: 3,
      name: 'Sales Training',
      description: 'Advanced sales methodologies and customer relationship management',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&auto=format',
      courseCount: 1,
      studentCount: 200,
      duration: '4 weeks',
      difficulty: 'Advanced',
      tags: ['Sales', 'CRM', 'Advanced']
    },
    {
      id: 4,
      name: 'Insurance Compliance',
      description: 'Regulatory requirements, legal frameworks, and compliance practices',
      imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&auto=format',
      courseCount: 1,
      studentCount: 180,
      duration: '10 weeks',
      difficulty: 'Advanced',
      tags: ['Compliance', 'Legal', 'Regulations']
    }
  ]);

  // Filter catalogs based on search query
  const filteredCatalogs = catalogs.filter(catalog =>
    catalog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    catalog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    catalog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddCatalog = () => {
    if (newCatalogName.trim()) {
      const newCatalog = {
        id: Date.now(),
        name: newCatalogName,
        description: newCatalogDescription,
        imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&auto=format',
        courseCount: 0,
        studentCount: 0,
        duration: '4 weeks',
        difficulty: 'Beginner',
        tags: []
      };
      setCatalogs([...catalogs, newCatalog]);
      setNewCatalogName('');
      setNewCatalogDescription('');
      setIsAddCatalogOpen(false);
      toast({
        title: "Catalog Created",
        description: `${newCatalogName} catalog has been created successfully.`,
      });
    }
  };

  const handleEditCatalog = (catalog) => {
    setEditingCatalog(catalog);
    setNewCatalogName(catalog.name);
    setNewCatalogDescription(catalog.description);
    setIsEditCatalogOpen(true);
  };

  const handleUpdateCatalog = () => {
    if (editingCatalog && newCatalogName.trim()) {
      setCatalogs(catalogs.map(catalog =>
        catalog.id === editingCatalog.id
          ? { ...catalog, name: newCatalogName, description: newCatalogDescription }
          : catalog
      ));
      setIsEditCatalogOpen(false);
      setEditingCatalog(null);
      setNewCatalogName('');
      setNewCatalogDescription('');
      toast({
        title: "Catalog Updated",
        description: `Catalog has been updated successfully.`,
      });
    }
  };

  const handleDeleteCatalog = (catalogId, catalogName) => {
    if (window.confirm(`Are you sure you want to delete "${catalogName}" catalog?`)) {
      setCatalogs(catalogs.filter(catalog => catalog.id !== catalogId));
      toast({
        title: "Catalog Deleted",
        description: `${catalogName} catalog has been deleted.`,
      });
    }
  };

  const handleCatalogClick = (catalog) => {
    navigate(`/catalog/${catalog.name.toLowerCase().replace(/\s+/g, '-')}`, {
      state: { catalog }
    });
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto p-6 animate-fade-in max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Course Catalog
              <Sparkles className="inline-block ml-2 h-8 w-8 text-yellow-400" />
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive collection of courses designed to enhance your knowledge and skills
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
          <Button
            onClick={() => setIsAddCatalogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transform hover:scale-105 transition-all duration-200"
          >
            <Plus className="h-5 w-5" />
            Add New Catalog
          </Button>
        </div>

        {/* Catalogs Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
              className="h-[480px] relative group"
            >
               <Card 
                 className="w-full overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                 onClick={() => handleCatalogClick(catalog)}
               >
                 {/* Image Section */}
                 <div className="relative h-[200px]">
                   <img 
                     src={catalog.imageUrl} 
                     alt={catalog.name}
                     className="w-full h-full object-cover" 
                   />
                   {/* Management buttons */}
                   <div className="absolute top-2 right-2 flex gap-1">
                     <Button
                       size="icon"
                       variant="secondary"
                       className="h-7 w-7 bg-white/90 hover:bg-white"
                       onClick={(e) => {
                         e.stopPropagation();
                         handleEditCatalog(catalog);
                       }}
                     >
                       <Edit className="h-4 w-4" />
                     </Button>
                     <Button
                       size="icon"
                       variant="destructive"
                       className="h-7 w-7 bg-white/90 hover:bg-red-50"
                       onClick={(e) => {
                         e.stopPropagation();
                         handleDeleteCatalog(catalog.id, catalog.name);
                       }}
                     >
                       <Trash2 className="h-4 w-4" />
                     </Button>
                   </div>
                 </div>

                 {/* Content Section */}
                 <CardContent className="p-6">
                   {/* Title */}
                   <h3 className="text-xl font-semibold text-gray-900 mb-3">
                     {catalog.name}
                   </h3>
                   
                   {/* Description */}
                   <p className="text-gray-600 mb-6 line-clamp-2">
                     {catalog.description}
                   </p>

                   {/* Stats Row */}
                   <div className="flex items-center gap-6 mb-6">
                     <div className="flex items-center gap-2 text-blue-600">
                       <BookOpen className="h-4 w-4" />
                       <span className="text-sm">{catalog.courseCount} Courses</span>
                     </div>
                     <div className="flex items-center gap-2 text-green-600">
                       <Users className="h-4 w-4" />
                       <span className="text-sm">{catalog.studentCount} Students</span>
                     </div>
                   </div>

                   {/* Duration */}
                   <div className="flex items-center gap-2 text-purple-600 mb-6">
                     <Clock className="h-4 w-4" />
                     <span className="text-sm">Duration: {catalog.duration}</span>
                   </div>

                   {/* Tags */}
                   <div className="flex flex-wrap gap-2">
                     {catalog.tags.map((tag, idx) => (
                       <span 
                         key={idx}
                         className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                       >
                         {tag}
                       </span>
                     ))}
                   </div>

                   {/* Action Button */}
                   <Button
                     className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6 flex items-center justify-center gap-2"
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

        {/* Add/Edit Catalog Dialogs */}
        <Dialog open={isAddCatalogOpen} onOpenChange={setIsAddCatalogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Catalog</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              <div className="space-y-2">
                <Label htmlFor="catalogName">Catalog Name</Label>
                <Input
                  id="catalogName"
                  value={newCatalogName}
                  onChange={(e) => setNewCatalogName(e.target.value)}
                  placeholder="Enter catalog name"
                  className="w-full px-4 py-2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="catalogDescription">Description</Label>
                <Textarea
                  id="catalogDescription"
                  value={newCatalogDescription}
                  onChange={(e) => setNewCatalogDescription(e.target.value)}
                  placeholder="Enter catalog description"
                  rows={3}
                  className="w-full px-4 py-2"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddCatalogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddCatalog} 
                disabled={!newCatalogName.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Create Catalog
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditCatalogOpen} onOpenChange={setIsEditCatalogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Catalog</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              <div className="space-y-2">
                <Label htmlFor="editCatalogName">Catalog Name</Label>
                <Input
                  id="editCatalogName"
                  value={newCatalogName}
                  onChange={(e) => setNewCatalogName(e.target.value)}
                  placeholder="Enter catalog name"
                  className="w-full px-4 py-2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editCatalogDescription">Description</Label>
                <Textarea
                  id="editCatalogDescription"
                  value={newCatalogDescription}
                  onChange={(e) => setNewCatalogDescription(e.target.value)}
                  placeholder="Enter catalog description"
                  rows={3}
                  className="w-full px-4 py-2"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditCatalogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleUpdateCatalog} 
                disabled={!newCatalogName.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Update Catalog
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Catalog;