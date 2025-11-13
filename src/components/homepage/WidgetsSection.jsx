import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Users, Folder, BookOpen, Shield, GraduationCap, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from '@/contexts/LanguageContext';

const copy = {
  en: {
    catalogTitle: 'Training Catalog',
    catalogSubtitle: 'Browse all courses',
    modulesLabel: 'modules',
    studentsLabel: 'students',
    groupsTitle: 'Training Groups',
    activeGroups: 'active groups',
    membersLabel: 'members',
    statusActive: 'Active',
  },
  es: {
    catalogTitle: 'Catálogo de formación',
    catalogSubtitle: 'Explora todos los cursos',
    modulesLabel: 'módulos',
    studentsLabel: 'alumnos',
    groupsTitle: 'Grupos de formación',
    activeGroups: 'grupos activos',
    membersLabel: 'miembros',
    statusActive: 'Activa',
  },
};

const groups = [
  {
    id: 1,
    name: {
      en: "Group 1",
      es: "Grupo 1",
    },
    desc: {
      en: "Training Group",
      es: "Grupo de formación",
    },
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=40&q=80",
    members: 45,
    icon: Shield
  },
  {
    id: 2,
    name: {
      en: "Group 2",
      es: "Grupo 2",
    },
    desc: {
      en: "Professional Development",
      es: "Desarrollo profesional",
    },
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&q=80",
    members: 12,
    icon: GraduationCap
  },
  {
    id: 3,
    name: {
      en: "Group 3",
      es: "Grupo 3",
    },
    desc: {
      en: "Training Program",
      es: "Programa de formación",
    },
    img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&q=80",
    members: 28,
    icon: Users
  },
];

const catalog = [
  {
    id: 1,
    name: {
      en: "Class 1",
      es: "Clase 1",
    },
    description: {
      en: "Basic Training Module",
      es: "Módulo de formación básica",
    },
    img: "https://www.vhv.rs/dpng/d/476-4763966_your-company-slogen-here-company-logo-your-logo.png",
    modules: 3,
    students: 120,
    icon: Shield
  }
];

const localize = (value, language) => {
  if (typeof value === 'string') {
    return value;
  }
  return value[language] ?? value.en;
};

export default function WidgetsSection() {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const t = copy[currentLanguage] ?? copy.en;

  const catalogItems = useMemo(
    () =>
      catalog.map((course) => ({
        ...course,
        name: localize(course.name, currentLanguage),
        description: localize(course.description, currentLanguage),
      })),
    [currentLanguage],
  );

  const groupItems = useMemo(
    () =>
      groups.map((group) => ({
        ...group,
        name: localize(group.name, currentLanguage),
        desc: localize(group.desc, currentLanguage),
      })),
    [currentLanguage],
  );

  const handleCatalogClick = () => {
    navigate("/catalog");
  };

  const handleGroupsClick = () => {
    navigate("/groups");
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
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
                        <h3 className="font-semibold text-gray-800">
                          {t.catalogTitle}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {t.catalogSubtitle}
                        </p>
                      </div>
                    </div>
                    <MoreVertical className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  
                  <div className="space-y-3">
                    {catalogItems.map((course) => {
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
                              <span className="text-xs text-gray-400">
                                {course.modules} {t.modulesLabel}
                              </span>
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-xs text-blue-600">
                                {course.students} {t.studentsLabel}
                              </span>
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
                        <h3 className="font-semibold text-gray-800">
                          {t.groupsTitle}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {groupItems.length} {t.activeGroups}
                        </p>
                      </div>
                    </div>
                    <MoreVertical className="h-4 w-4 text-gray-400 group-hover:text-green-500 transition-colors" />
                  </div>
                  
                  <div className="space-y-3">
                    {groupItems.map((group) => {
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
                              <span className="text-xs text-gray-400">
                                {group.members} {t.membersLabel}
                              </span>
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              <span className="text-xs text-green-600">
                                {t.statusActive}
                              </span>
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