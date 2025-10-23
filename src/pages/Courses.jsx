import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Clock, Filter, Search, Plus, Compass, FileText, DollarSign, Tag } from 'lucide-react';
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

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  // Removed course access type (open/sequential)
  const navigate = useNavigate();

  // U.S. Department of Justice Training Courses
  const mockCourses = [
    {
      id: 1,
      title: "U.S. Department of Justice- National Community Outreach & Prevention",
      description: "Comprehensive training program covering foundations, stakeholder analysis, and curriculum design for law enforcement professionals",
      students: 120,
      duration: "6 weeks",
      level: "Beginner",
      status: "Active",
      image: "/assets/us-1.png",
      archived: false,
      deleted: false,
      catalog: "Law Enforcement",
      price: 299.99,
      currency: "USD",
      isPaid: true,
      originalPrice: 399.99,
      discount: 25
    },
    {
      id: 2,
      title: "Advanced Law Enforcement Techniques",
      description: "Advanced training for experienced law enforcement officers covering tactical operations and crisis management",
      students: 85,
      duration: "8 weeks",
      level: "Advanced",
      status: "Active",
      image: "/assets/us-2.png",
      archived: false,
      deleted: false,
      catalog: "Law Enforcement",
      price: 0,
      currency: "USD",
      isPaid: false,
      originalPrice: 0,
      discount: 0
    },
    {
      id: 3,
      title: "Community Policing Fundamentals",
      description: "Essential training for community policing strategies and community engagement techniques",
      students: 156,
      duration: "4 weeks",
      level: "Intermediate",
      status: "Active",
      image: "/assets/us-1.png",
      archived: false,
      deleted: false,
      catalog: "Community Outreach",
      price: 199.99,
      currency: "USD",
      isPaid: true,
      originalPrice: 249.99,
      discount: 20
    }
  ];

  const [courses, setCourses] = useState(mockCourses);

  // Only show the predefined banking courses

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
    toast({
      title: "Catalog",
      description: "Redirecting to course catalog",
    });
  };

  const handleCreateCourse = () => {
    navigate('/courses/create');
  };

  const handleCourseEdit = (courseId, courseName) => {
    navigate(`/courses/edit/${courseId}`);
    toast({
      title: "Edit Course",
      description: `Opening edit page for ${courseName}`,
    });
  };

  const handleCourseArchive = (courseId, courseName) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId ? { ...course, archived: true } : course
      )
    );
    toast({
      title: "Course Archived",
      description: `${courseName} has been moved to archived courses.`,
    });
  };

  const handleCourseDelete = (courseId, courseName) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId ? { ...course, deleted: true, archived: false } : course
      )
    );
    toast({
      title: "Course Deleted",
      description: `${courseName} has been moved to deleted courses.`,
    });
  };

  const handleCourseRestore = (courseId, courseName) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId ? { ...course, deleted: false, archived: false } : course
      )
    );
    toast({
      title: "Course Restored",
      description: `${courseName} has been restored to active courses.`,
    });
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Published': return 'bg-blue-100 text-blue-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground mt-2">
            Manage your course catalog and create new learning experiences
          </p>
        </div>
      </div>


      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-9" 
              placeholder="Search courses..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          {/* Catalog Button */}
          <Button 
            variant="outline" 
            onClick={handleCatalogClick}
            className="flex items-center gap-2"
          >
            <Compass className="h-4 w-4" />
            Catalog
          </Button>

          {/* Removed Sequential/Open Toggle */}

        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer" >
            <div className="h-48 overflow-hidden relative">
                <img 
                 onClick={() => handleCourseClick(course.id)}
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                <div className="absolute top-2 right-2 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <Badge className={getStatusColor(course.status)}>
                    {course.status}
                  </Badge>
                  <div className="bg-white/90 rounded-md">
                    <CourseOptionsMenu 
                      courseId={course.id} 
                      courseName={course.title}
                      onEdit={handleCourseEdit}
                      onArchive={handleCourseArchive}
                      onDelete={handleCourseDelete}
                      onRestore={handleCourseRestore}
                      isDeleted={course.deleted}
                    />
                  </div>
                </div>
                {/* Removed Course Access Type Indicator */}
              </div>
              <CardHeader className="pb-2"  onClick={() => handleCourseClick(course.id)}>
                <CardTitle className="text-lg font-semibold line-clamp-1">
                  {course.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {course.description}
                </p>
              </CardHeader>
              <CardContent onClick={() => handleCourseClick(course.id)}>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className={getLevelColor(course.level)}>
                    {course.level}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {course.catalog}
                  </Badge>
                </div>
                
                {/* Pricing Section */}
                <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-lg font-bold text-gray-900">
                        {course.isPaid ? `$${course.price}` : 'FREE'}
                      </span>
                      {course.currency && course.isPaid && (
                        <span className="text-sm text-gray-500">{course.currency}</span>
                      )}
                    </div>
                    {course.discount && course.discount > 0 && course.isPaid && (
                      <div className="flex items-center gap-1">
                        <Tag className="h-3 w-3 text-red-500" />
                        <span className="text-xs text-red-600 font-medium">
                          {course.discount}% OFF
                        </span>
                      </div>
                    )}
                  </div>
                  {course.originalPrice && course.originalPrice > course.price && course.isPaid && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-400 line-through">
                        ${course.originalPrice}
                      </span>
                      <span className="text-xs text-green-600 font-medium">
                        Save ${(course.originalPrice - course.price).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

    </div>
  );
};

export default Courses;