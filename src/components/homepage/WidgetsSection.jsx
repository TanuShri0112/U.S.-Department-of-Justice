import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Users, Folder, BookOpen, Shield, GraduationCap, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";

const groups = [
  {
    id: 1,
    name: "Law Enforcement Officers",
    desc: "DOJ Law Enforcement Training Group",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=40&q=80",
    members: 45,
    icon: Shield
  },
  {
    id: 2,
    name: "Training Coordinators",
    desc: "Professional Development Coordination",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&q=80",
    members: 12,
    icon: GraduationCap
  },
  {
    id: 3,
    name: "Youth Advocates",
    desc: "Youth Development Training Program",
    img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&q=80",
    members: 28,
    icon: Users
  },
];

const catalog = [
  {
    id: 1,
    name: "Law Enforcement Training",
    description: "Foundations & Advanced Modules",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=40&q=80",
    modules: 3,
    students: 120,
    icon: Shield
  },
  {
    id: 2,
    name: "Educator Professional Development",
    description: "Professional Learning Programs",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&q=80",
    modules: 3,
    students: 95,
    icon: GraduationCap
  },
  {
    id: 3,
    name: "Youth Advocate Training",
    description: "Advocacy & Development Skills",
    img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&q=80",
    modules: 3,
    students: 110,
    icon: Users
  },
  {
    id: 4,
    name: "DOJ Compliance Training",
    description: "Regulatory Requirements",
    img: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=40&q=80",
    modules: 2,
    students: 85,
    icon: BookOpen
  },
];

export default function WidgetsSection() {
  const navigate = useNavigate();

  const handleCatalogClick = () => {
    navigate("/catalog");
  };

  const handleGroupsClick = () => {
    navigate("/groups");
  };

  return (
    <section className="mb-6">
      <Card className="overflow-hidden border-0 shadow-lg bg-white">
        <CardHeader className="pb-4 pt-5 px-6">
          <CardTitle className="text-xl flex items-center gap-3 text-slate-800 font-bold">
            <div className="p-2 bg-blue-500 rounded-lg shadow-md">
              <Folder className="h-5 w-5 text-white" />
            </div>
            Training Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Catalog Widget */}
            <motion.div 
              whileHover={{ y: -2 }} 
              transition={{ type: "spring", stiffness: 300 }}
              className="group"
            >
              <div
                className="cursor-pointer transition-all duration-300 hover:shadow-lg border border-gray-100 rounded-xl overflow-hidden h-full bg-white"
                onClick={handleCatalogClick}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Training Courses</h3>
                        <p className="text-sm text-gray-500">{catalog.length} courses available</p>
                      </div>
                    </div>
                    <MoreVertical className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  
                  <div className="space-y-3">
                    {catalog.slice(0, 3).map((course) => {
                      const IconComponent = course.icon;
                      return (
                        <div
                          key={course.id}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="relative">
                            <img
                              src={course.img}
                              alt={course.name}
                              className="h-10 w-10 rounded-lg object-cover shadow-sm"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                              <IconComponent className="h-2.5 w-2.5 text-blue-600" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-800 text-sm leading-tight">
                              {course.name}
                            </h4>
                            <p className="text-xs text-gray-500 truncate">{course.description}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-gray-400">{course.modules} modules</span>
                              <span className="text-xs text-gray-400">{course.students} students</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Groups Widget */}
            <motion.div 
              whileHover={{ y: -2 }} 
              transition={{ type: "spring", stiffness: 300 }}
              className="group"
            >
              <div
                className="cursor-pointer transition-all duration-300 hover:shadow-lg border border-gray-100 rounded-xl overflow-hidden h-full bg-white"
                onClick={handleGroupsClick}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Users className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Training Groups</h3>
                        <p className="text-sm text-gray-500">{groups.length} active groups</p>
                      </div>
                    </div>
                    <MoreVertical className="h-4 w-4 text-gray-400 group-hover:text-green-500 transition-colors" />
                  </div>
                  
                  <div className="space-y-3">
                    {groups.map((group) => {
                      const IconComponent = group.icon;
                      return (
                        <div
                          key={group.id}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="relative">
                            <img
                              src={group.img}
                              alt={group.name}
                              className="h-10 w-10 rounded-lg object-cover shadow-sm"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                              <IconComponent className="h-2.5 w-2.5 text-green-600" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-800 text-sm leading-tight">
                              {group.name}
                            </h4>
                            <p className="text-xs text-gray-500 truncate">{group.desc}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-gray-400">{group.members} members</span>
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              <span className="text-xs text-green-600">Active</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
