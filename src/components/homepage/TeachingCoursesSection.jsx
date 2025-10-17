import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Book, Users } from "lucide-react";
import { useTranslation } from '@/hooks/useTranslation';

const getTeachingCourses = (t) => [
  {
    id: 1,
    title: t('principlesAssessmentLearning'),
    image: "/assets/us-1.png",
    modules: 4,
    students: 45
  },
  {
    id: 2,
    title: t('trainingStrategiesFeedback'),
    image: "/assets/us-2.png",
    modules: 3,
    students: 32
  },
  {
    id: 3,
    title: t('digitalToolsFormativeAssessment'),
    image: "/assets/us-1.png",
    modules: 5,
    students: 28
  },
  {
    id: 4,
    title: t('designRubricsEvaluationCriteria'),
    image: "/assets/us-2.png",
    modules: 4,
    students: 18
  }
];

export default function TeachingCoursesSection() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const { t } = useTranslation();
  const teachingCourses = getTeachingCourses(t);

  const handleCourseClick = (courseId) => {
    navigate(`/courses/view/${courseId}`);
  };

  return (
    <section>
      <Card className="overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 flex flex-row items-center justify-between pb-4 pt-5 px-6 border-b border-blue-100/50">
          <CardTitle className="text-xl flex items-center gap-3 text-slate-800 font-bold">
            <div className="p-2 bg-blue-500 rounded-lg shadow-md">
              <Book className="h-5 w-5 text-white" />
            </div>
            {t('myCourses')}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative">
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
                      {/* Hover overlay CTA */}
                      <div className="absolute inset-x-0 bottom-0 translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                        <div className="m-3 px-3 py-1.5 text-xs font-medium text-white bg-black/50 backdrop-blur rounded-full inline-flex items-center gap-1">
                          <span>View course</span>
                          <span aria-hidden>→</span>
                        </div>
                      </div>
                      
                      {/* Color Accent */}
                      <div className={`absolute top-3 left-3 w-3 h-3 rounded-full ${
                        courseColor === 'blue' ? 'bg-blue-500' :
                        courseColor === 'green' ? 'bg-green-500' : 'bg-purple-500'
                      }`}></div>
                    </div>

                    {/* Course Content */}
                    <div className="p-5">
                      <h3 className="font-bold text-base text-gray-800 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300">
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
                            <span className="font-medium">{course.modules} {t('modules')}</span>
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
                            <span className="font-medium">{course.students} {t('students')}</span>
                          </div>
                        </div>
                      </div>
                      {/* Accent underline */}
                      <div className="mt-4 h-[3px] rounded-full bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
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
