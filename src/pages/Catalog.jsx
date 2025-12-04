import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, Users, Clock, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const Catalog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  const { currentLanguage } = useLanguage();
  
  const copy = useMemo(() => ({
    heading: currentLanguage === 'en' ? 'Course Catalog' : 'كتالوج الدورات',
    subheading: currentLanguage === 'en'
      ? 'Browse our collection of professional training courses'
      : 'تصفح مجموعة برامج التدريب الاحترافية لدينا',
    searchPlaceholder: currentLanguage === 'en' ? 'Search courses...' : 'ابحث عن الدورات...',
    coursesLabel: currentLanguage === 'en' ? 'courses' : 'دورات',
    learnersLabel: currentLanguage === 'en' ? 'students' : 'متدربون',
  }), [currentLanguage]);

  const formatCopy = (value) => {
    if (typeof value === 'string') {
      return value;
    }
    return value?.[currentLanguage] ?? value?.en ?? '';
  };

  const catalogs = useMemo(
    () => [
      {
        id: 1,
        name: {
          en: 'Community-Based Risk Reduction (CBRR): Building Resilience from the Ground',
          ar: 'التخفيف من المخاطر المجتمعية (CBRR): بناء المرونة من القاعدة',
        },
        description: {
          en: 'Comprehensive training program covering community-based approaches to risk reduction, resilience building, and disaster preparedness.',
          ar: 'برنامج تدريب شامل يغطي الأساليب المجتمعية للحد من المخاطر وبناء المرونة والاستعداد للكوارث.',
        },
        imageUrl:
          'https://www.vhv.rs/dpng/d/476-4763966_your-company-slogen-here-company-logo-your-logo.png',
        courseCount: 3,
        studentCount: 120,
        duration: {
          en: '12 weeks',
          ar: '12 أسبوعاً',
        },
        difficulty: 'Intermediate',
        tags: [
          { en: 'Risk Reduction', ar: 'تقليل المخاطر' },
          { en: 'Community', ar: 'مجتمع' },
          { en: 'Resilience', ar: 'المرونة' },
        ],
      },
    ],
    [currentLanguage],
  );

  const normalizedQuery = searchQuery.toLowerCase();
  const filteredCatalogs = catalogs.filter((catalog) => {
    const name = formatCopy(catalog.name).toLowerCase();
    const description = formatCopy(catalog.description).toLowerCase();
    const tags = catalog.tags.map((tag) => formatCopy(tag).toLowerCase());
    return (
      name.includes(normalizedQuery) ||
      description.includes(normalizedQuery) ||
      tags.some((tag) => tag.includes(normalizedQuery))
    );
  });

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

const getDifficultyLabel = (difficulty, language) => {
  if (language === 'en') return difficulty;
  switch (difficulty.toLowerCase()) {
    case 'beginner':
      return 'مبتدئ';
    case 'intermediate':
      return 'متوسط';
    case 'advanced':
      return 'متقدم';
    default:
      return difficulty;
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{copy.heading}</h1>
            <p className="mt-2 text-gray-600">
              {copy.subheading}
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder={copy.searchPlaceholder}
                className="pl-9 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCatalogs.map((catalog) => (
              <motion.div
                key={catalog.id}
                whileHover={{ y: -4 }}
                onHoverStart={() => setHoveredCard(catalog.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Card 
                  className="cursor-pointer h-full flex flex-col transition-shadow hover:shadow-lg"
                  onClick={() => handleCatalogClick(catalog)}
                >
                  <div className="relative h-48">
                    <img
                      src={catalog.imageUrl}
                      alt={catalog.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg line-clamp-2">
                        {formatCopy(catalog.name)}
                      </h3>
                    </div>
                  </div>
                  <CardContent className="flex-1 p-4">
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {formatCopy(catalog.description)}
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1.5">
                          <BookOpen className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">
                            {catalog.courseCount} {copy.coursesLabel}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">
                            {catalog.studentCount} {copy.learnersLabel}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">{formatCopy(catalog.duration)}</span>
                        </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(catalog.difficulty)}`}>
                          {getDifficultyLabel(catalog.difficulty, currentLanguage)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;