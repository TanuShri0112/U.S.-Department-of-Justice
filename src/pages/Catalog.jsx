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
  
  // Updated catalogs with U.S. Department of Justice training courses
  const [catalogs, setCatalogs] = useState([
    {
      id: 1,
      name: 'Law Enforcement Training',
      description: 'Foundations of law enforcement training, stakeholder analysis, and needs assessment',
      imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop&auto=format',
      courseCount: 3,
      studentCount: 120,
      duration: '12 weeks',
      difficulty: 'Intermediate',
      tags: ['Law Enforcement', 'Training', 'DOJ']
    },
    {
      id: 2,
      name: 'Educator Professional Development',
      description: 'Professional learning programs for educators and training coordinators',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&auto=format',
      courseCount: 3,
      studentCount: 95,
      duration: '8 weeks',
      difficulty: 'Beginner',
      tags: ['Education', 'Professional Development', 'Training']
    },
    {
      id: 3,
      name: 'Youth Advocate Training',
      description: 'Advocacy skills, youth development, and stakeholder engagement',
      imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop&auto=format',
      courseCount: 3,
      studentCount: 110,
      duration: '10 weeks',
      difficulty: 'Intermediate',
      tags: ['Youth Development', 'Advocacy', 'Community']
    },
    {
      id: 4,
      name: 'DOJ Compliance Training',
      description: 'Department of Justice regulatory requirements and compliance practices',
      imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop&auto=format',
      courseCount: 2,
      studentCount: 85,
      duration: '6 weeks',
      difficulty: 'Advanced',
      tags: ['Compliance', 'DOJ', 'Regulations']
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
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
              className="relative group"
            >
               <Card 
                 className="w-full overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                 onClick={() => handleCatalogClick(catalog)}
               >
                 {/* Image Section */}
                 <div className="relative h-[160px] sm:h-[180px]">
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
                 <CardContent className="p-4 sm:p-5">
                   {/* Title */}
                   <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                     {catalog.name}
                   </h3>
                   
                   {/* Description */}
                   <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                     {catalog.description}
                   </p>

                   {/* Stats Row */}
                   <div className="flex items-center gap-4 mb-4">
                     <div className="flex items-center gap-1 text-blue-600">
                       <BookOpen className="h-3 w-3" />
                       <span className="text-xs">{catalog.courseCount} Courses</span>
                     </div>
                     <div className="flex items-center gap-1 text-green-600">
                       <Users className="h-3 w-3" />
                       <span className="text-xs">{catalog.studentCount} Students</span>
                     </div>
                   </div>

                   {/* Duration */}
                   <div className="flex items-center gap-1 text-purple-600 mb-4">
                     <Clock className="h-3 w-3" />
                     <span className="text-xs">{catalog.duration}</span>
                   </div>

                   {/* Tags */}
                   <div className="flex flex-wrap gap-1 mb-4">
                     {catalog.tags.slice(0, 3).map((tag, idx) => (
                       <span 
                         key={idx}
                         className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                       >
                         {tag}
                       </span>
                     ))}
                   </div>

                   {/* Action Button */}
                   <Button
                     className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4 flex items-center justify-center gap-2 text-sm py-2"
                     onClick={(e) => {
                       e.stopPropagation();
                       handleCatalogClick(catalog);
                     }}
                   >
                     Explore Catalog
                     <ChevronRight className="h-3 w-3" />
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