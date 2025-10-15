import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Book, Users, ChevronRight, ChevronLeft } from "lucide-react";

const teachingCourses = [
  {
    id: 1,
    title: "LAW ENFORCEMENT TRAINING",
    image: "/assets/course-1.png",
    modules: 3,
    students: 120
  },
  {
    id: 2,
    title: "EDUCATOR TRAINING",
    image: "/assets/course-2.png",
    modules: 3,
    students: 95
  },
  {
    id: 3,
    title: "YOUTH ADVOCATE TRAINING",
    image: "/assets/course-3.png",
    modules: 3,
    students: 110
  }
];

export default function TeachingCoursesSection() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  const handleCourseClick = (courseId) => {
    navigate(`/courses/view/${courseId}`);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section>
      <Card className="overflow-hidden border-0 shadow-lg bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 flex flex-row items-center justify-between pb-4 pt-5 px-6 border-b border-blue-100/50">
          <CardTitle className="text-xl flex items-center gap-3 text-slate-800 font-bold">
            <div className="p-2 bg-blue-500 rounded-lg shadow-md">
              <Book className="h-5 w-5 text-white" />
            </div>
            My Courses
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative">
            {/* Scroll Arrows */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 p-0 bg-white hover:bg-gray-50 shadow-xl border border-gray-200 rounded-full opacity-80 hover:opacity-100 transition-all duration-300 hover:shadow-2xl"
              onClick={scrollLeft}
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 p-0 bg-white hover:bg-gray-50 shadow-xl border border-gray-200 rounded-full opacity-80 hover:opacity-100 transition-all duration-300 hover:shadow-2xl"
              onClick={scrollRight}
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </Button>

            {/* Horizontal Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {teachingCourses.map((course, index) => {
                const colors = ['blue', 'green', 'purple'];
                const courseColor = colors[index % colors.length];
                
                return (
                  <div
                    key={course.id}
                    className="group relative bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex-shrink-0 w-72"
                    onClick={() => handleCourseClick(course.id)}
                  >
                    {/* Course Image */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Color Accent */}
                      <div className={`absolute top-3 left-3 w-3 h-3 rounded-full ${
                        courseColor === 'blue' ? 'bg-blue-500' :
                        courseColor === 'green' ? 'bg-green-500' : 'bg-purple-500'
                      }`}></div>
                    </div>

                    {/* Course Content */}
                    <div className="p-5">
                      <h3 className="font-bold text-base text-gray-800 mb-4 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                        {course.title}
                      </h3>
                      
                      {/* Stats with better styling */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              courseColor === 'blue' ? 'bg-blue-50' :
                              courseColor === 'green' ? 'bg-green-50' : 'bg-purple-50'
                            }`}>
                              <Book className={`w-4 h-4 ${
                                courseColor === 'blue' ? 'text-blue-600' :
                                courseColor === 'green' ? 'text-green-600' : 'text-purple-600'
                              }`} />
                            </div>
                            <span className="font-medium">{course.modules} modules</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              courseColor === 'blue' ? 'bg-blue-50' :
                              courseColor === 'green' ? 'bg-green-50' : 'bg-purple-50'
                            }`}>
                              <Users className={`w-4 h-4 ${
                                courseColor === 'blue' ? 'text-blue-600' :
                                courseColor === 'green' ? 'text-green-600' : 'text-purple-600'
                              }`} />
                            </div>
                            <span className="font-medium">{course.students} students</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
