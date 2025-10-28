import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Clock, Filter, Search, Plus, Compass, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared/PageHeader';
import { CourseOptionsMenu } from '@/components/courses/CourseOptionsMenu';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();

  const mockCourses = [
    {
      id: 1,
      title: currentLanguage === 'en' 
        ? "Up to Date in Economic Youth Welfare – Legal and Financial Developments 2025"
        : "Aktuell in der Wirtschaftlichen Jugendhilfe – Rechtliche und Finanzielle Entwicklungen 2025",
      description: currentLanguage === 'en'
        ? "Comprehensive training program covering current developments in economic youth welfare, legal frameworks, and financial aspects"
        : "Umfassendes Schulungsprogramm zu aktuellen Entwicklungen in der wirtschaftlichen Jugendhilfe, rechtlichen Rahmenbedingungen und finanziellen Aspekten",
      students: 120,
      duration: "6 weeks",
      level: "Beginner",
      status: "Active",
      image: "/assets/clogo.png",
      archived: false,
      deleted: false,
      catalog: "Youth Welfare"
    }
  ];

  const [courses, setCourses] = useState(mockCourses);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch && !course.archived && !course.deleted;
  });

  const handleCourseClick = (courseId) => {
    navigate(`/courses/view/${courseId}`);
  };

  const handleCatalogClick = () => {
    navigate('/catalog');
  };

  const handleDiscoverClick = () => {
    navigate('/catalog');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title={currentLanguage === 'en' ? "My Courses" : "Meine Kurse"}
        description={currentLanguage === 'en' 
          ? "Access and manage your enrolled courses" 
          : "Greifen Sie auf Ihre eingeschriebenen Kurse zu und verwalten Sie diese"}
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleDiscoverClick}
            className="flex items-center gap-2"
          >
            <Compass className="h-4 w-4" />
            {currentLanguage === 'en' ? "Discover Courses" : "Kurse entdecken"}
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-9" 
            placeholder={currentLanguage === 'en' ? "Search courses..." : "Kurse suchen..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder={currentLanguage === 'en' ? "All levels" : "Alle Stufen"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{currentLanguage === 'en' ? "All levels" : "Alle Stufen"}</SelectItem>
              <SelectItem value="beginner">{currentLanguage === 'en' ? "Beginner" : "Anfänger"}</SelectItem>
              <SelectItem value="intermediate">{currentLanguage === 'en' ? "Intermediate" : "Fortgeschritten"}</SelectItem>
              <SelectItem value="advanced">{currentLanguage === 'en' ? "Advanced" : "Experte"}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="h-40 overflow-hidden relative">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                  {course.status}
                </Badge>
              </div>
            </div>
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold line-clamp-2">
                {course.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-muted-foreground">{course.students} students</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-muted-foreground">{course.duration}</span>
                  </div>
                </div>
                <Button 
                  variant="default" 
                  className="w-full bg-blue-500 hover:bg-blue-600 transition-colors"
                  onClick={() => handleCourseClick(course.id)}
                >
                  {currentLanguage === 'en' ? "Continue Learning" : "Weiter lernen"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Courses;