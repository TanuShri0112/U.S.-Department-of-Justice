import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import ModuleCard from './ModuleCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EditModuleDialog from './EditModuleDialog';
import { useLanguage } from '@/contexts/LanguageContext';

const CourseModules = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const courseType = searchParams.get('type') || 'open';
  const { currentLanguage } = useLanguage();

  const [modules, setModules] = useState([]);
  const [isPublishedCourse, setIsPublishedCourse] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [moduleToEdit, setModuleToEdit] = useState(null);

  /* ---------------- CHAPTER DATA (COURSE ID 1) ---------------- */

  const courseChapters = courseId === '1' ? [
    {
      id: 1,
      title: {
        en: 'Advanced AI Concepts and Tools for Educators',
        mr: 'शिक्षकांसाठी उन्नत एआय संकल्पना आणि साधने'
      },
      description: {
        en: 'Explore advanced artificial intelligence tools transforming modern education.',
        mr: 'आधुनिक शिक्षणात परिवर्तन घडवणारी प्रगत एआय साधने जाणून घ्या.'
      },
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
      link: 'https://drive.google.com/file/d/1mTvASpfkWG_S-vuMrdy7geSoxE5WgcMv/view?usp=sharing'
    },
    {
      id: 2,
      title: {
        en: 'Machine Learning for Teachers',
        mr: 'शिक्षकांसाठी मशीन लर्निंग'
      },
      description: {
        en: 'Understand machine learning fundamentals with real classroom use cases.',
        mr: 'वर्गखोलीतील वापरासाठी मशीन लर्निंगची मूलतत्त्वे समजून घ्या.'
      },
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
      link: 'https://drive.google.com/file/d/1xTtpTZsCfLfpxxlEFCJD5wm0mIx6erLK/view?usp=sharing'
    },
    {
      id: 3,
      title: {
        en: 'Overview of Generative AI for Teaching',
        mr: 'शिक्षणासाठी जनरेटिव्ह एआयचा आढावा'
      },
      description: {
        en: 'Learn how generative AI enhances lesson planning and engagement.',
        mr: 'जनरेटिव्ह एआय शिक्षण कसे अधिक प्रभावी बनवते ते जाणून घ्या.'
      },
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
      link: 'https://drive.google.com/file/d/1Ej4TV6tccvE6E-nzogSmBKYS78IwjHK5/view?usp=sharing'
    },
    {
      id: 4,
      title: {
        en: 'Generative AI for Assessment and Differentiation',
        mr: 'मूल्यांकनासाठी जनरेटिव्ह एआय'
      },
      description: {
        en: 'Use AI to personalize assessments and student learning paths.',
        mr: 'विद्यार्थ्यांच्या गरजेनुसार मूल्यांकन वैयक्तिकृत करा.'
      },
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
      link: 'https://drive.google.com/file/d/1q2cQ9fq-kmaKHYgGV5DvIIVQEBnHJUK2/view?usp=sharing'
    },
    {
      id: 5,
      title: {
        en: 'AI for Content Creation – Video and PPT',
        mr: 'सामग्री निर्मितीसाठी एआय – व्हिडिओ आणि पीपीटी'
      },
      description: {
        en: 'Create engaging videos and presentations using AI-powered tools.',
        mr: 'एआय वापरून प्रभावी व्हिडिओ आणि सादरीकरणे तयार करा.'
      },
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
      link: 'https://drive.google.com/file/d/1FYOEPjBEwu2zDYwJhzK88caphifEPjbu/view?usp=sharing'
    },
    {
      id: 6,
      title: {
        en: 'Ethics of AI',
        mr: 'एआयची नैतिकता'
      },
      description: {
        en: 'Understand ethical challenges and responsible AI usage in education.',
        mr: 'शिक्षणात एआयचा नैतिक आणि जबाबदार वापर समजून घ्या.'
      },
      image: 'https://images.unsplash.com/photo-1600267165477-6d4cc741b379',
      link: 'https://drive.google.com/file/d/1JUkqU5wmLTIrg4O4JwZdz29G2_XKlQs1/view?usp=sharing'
    }
  ] : null;

  /* ---------------- COURSE NAME ---------------- */

  const getCourseName = (courseId) => {
    const courseNames = {
      '1': {
        en: 'Advanced AI Concepts and Tools for Educators',
        mr: 'शिक्षकांसाठी उन्नत एआय संकल्पना आणि साधने'
      }
    };
    return courseNames[courseId] ? courseNames[courseId][currentLanguage] || courseNames[courseId].en : 'Course';
  };

  /* ---------------- LOAD MODULES ---------------- */

  useEffect(() => {
    setLoading(false);
  }, []);

  /* ---------------- UI ---------------- */

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-b-2 border-blue-500 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={() => navigate('/courses')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Courses
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{getCourseName(courseId)}</h1>
          <p className="text-gray-600">Course Chapters</p>
        </div>
      </div>

      {/* ---------------- CHAPTER CARDS ---------------- */}

      {courseChapters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseChapters.map((chapter) => (
            <Card
              key={chapter.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
            >
              <div className="h-40 overflow-hidden flex-shrink-0">
                <img
                  src={chapter.image}
                  alt={chapter.title.en}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardContent className="p-5 flex flex-col flex-grow">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {chapter.title[currentLanguage]}
                </h3>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                  {chapter.description[currentLanguage]}
                </p>

                <Button
                  className="w-full flex items-center justify-center gap-2 mt-auto"
                  onClick={() => window.open(chapter.link, '_blank')}
                >
                  View Chapter
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* ---------------- EDIT MODULE ---------------- */}

      {moduleToEdit && (
        <EditModuleDialog
          open={isEditDialogOpen}
          onOpenChange={(open) => {
            setIsEditDialogOpen(open);
            if (!open) setModuleToEdit(null);
          }}
          module={moduleToEdit}
          onUpdate={() => {}}
        />
      )}
    </div>
  );
};

export default CourseModules;
