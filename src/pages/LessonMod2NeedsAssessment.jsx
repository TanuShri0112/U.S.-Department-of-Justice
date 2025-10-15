import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Volume2, Play, Pause, X, Heart, ExternalLink, FileDown, ChevronDown, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// SVG Components
const AssessmentSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H14V17H7V15Z" 
      fill="#10B981"/>
  </svg>
);

const DataSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" 
      fill="#3B82F6"/>
  </svg>
);

const SurveysSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 3H14.82C14.4 1.84 13.3 1 12 1C10.7 1 9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 3C12.55 3 13 3.45 13 4C13 4.55 12.55 5 12 5C11.45 5 11 4.55 11 4C11 3.45 11.45 3 12 3ZM14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z" 
      fill="#8B5CF6"/>
  </svg>
);

const StakeholdersSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" 
      fill="#EC4899"/>
  </svg>
);

const AnalysisSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 13H5V11H3V13ZM3 17H5V15H3V17ZM3 9H5V7H3V9ZM7 13H21V11H7V13ZM7 17H21V15H7V17ZM7 7V9H21V7H7ZM3 13H5V11H3V13ZM3 17H5V15H3V17ZM3 9H5V7H3V9Z" 
      fill="#10B981"/>
  </svg>
);

const LessonMod2NeedsAssessment = () => {
  const navigate = useNavigate();
  const [speakingBlocks, setSpeakingBlocks] = useState({});
  const [voices, setVoices] = useState([]);
  const [selectedLang, setSelectedLang] = useState('en-US');
  const [selectedVoiceURI, setSelectedVoiceURI] = useState('');
  const [isFullScreenModalOpen, setIsFullScreenModalOpen] = useState(false);
  const [audioLang, setAudioLang] = useState('en-US');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [isTTSPlaying, setIsTTSPlaying] = useState(false);
  const [currentTTSIndex, setCurrentTTSIndex] = useState(0);
  const textRef = useRef(null);

  // Language options
  const languageOptions = React.useMemo(() => ([
    { code: 'en-US', label: '🇺🇸 English (US)' },
    { code: 'en-GB', label: '🇬🇧 English (UK)' },
    { code: 'es-ES', label: '🇪🇸 Spanish' },
    { code: 'fr-FR', label: '🇫🇷 French' }
  ]), []);

  // Content for interactive sections
  const learningObjectives = [
    "To understand and implement effective teacher competency mapping strategies",
    "To analyze and interpret student performance data for informed decision-making",
    "To design and conduct meaningful educational surveys",
    "To develop strategies for engaging parents and community stakeholders",
    "To create data-driven improvement plans for schools and districts",
    "To establish effective feedback loops with all stakeholders"
  ];

  const flashcards = [
    {
      front: "Teacher Competency Mapping",
      back: "Systematic process of identifying and evaluating teacher skills, knowledge, and performance against established standards"
    },
    {
      front: "Student Data Analysis",
      back: "Process of collecting, examining, and interpreting student performance data to improve educational outcomes"
    },
    {
      front: "Stakeholder Engagement",
      back: "Strategic involvement of parents, school boards, and community partners in educational improvement"
    }
  ];

  const timelineSteps = [
    {
      title: "Data Collection",
      content: "Gather information from teachers, students, and stakeholders",
      date: "Week 1"
    },
    {
      title: "Analysis",
      content: "Process and interpret collected data",
      date: "Week 2"
    },
    {
      title: "Implementation",
      content: "Develop and execute improvement strategies",
      date: "Week 3"
    }
  ];

  const accordionItems = [
    {
      title: "Teacher Competency Assessment",
      content: "Methods and tools for evaluating teacher skills and identifying areas for professional development."
    },
    {
      title: "Survey Design Principles",
      content: "Best practices for creating effective educational surveys that gather meaningful data."
    },
    {
      title: "Community Engagement Strategies",
      content: "Approaches for involving stakeholders in school improvement initiatives."
    }
  ];

  const cardGridItems = [
    {
      title: "Data Collection",
      icon: <DataSVG />,
      content: "Systematic gathering of educational performance data",
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Analysis",
      icon: <AnalysisSVG />,
      content: "Advanced tools for interpreting performance metrics",
      color: "bg-green-50 border-green-200"
    },
    {
      title: "Stakeholder Engagement",
      icon: <StakeholdersSVG />,
      content: "Strategic involvement of all educational partners",
      color: "bg-purple-50 border-purple-200"
    },
    {
      title: "Assessment Design",
      icon: <AssessmentSVG />,
      content: "Creating effective evaluation frameworks",
      color: "bg-yellow-50 border-yellow-200"
    },
    {
      title: "Survey Implementation",
      icon: <SurveysSVG />,
      content: "Conducting meaningful educational surveys",
      color: "bg-pink-50 border-pink-200"
    },
    {
      title: "Data Visualization",
      icon: <DataSVG />,
      content: "Presenting insights through clear visualizations",
      color: "bg-indigo-50 border-indigo-200"
    }
  ];

  // Content for TTS
  const assessmentContent = [
    {
      title: "Teacher Competency Mapping",
      content: "Understanding how to assess and map teacher competencies is crucial for educational improvement. This involves systematic evaluation of skills, knowledge, and performance metrics."
    },
    {
      title: "Survey Design and Implementation",
      content: "Creating effective surveys requires careful consideration of question types, response formats, and distribution methods to gather meaningful data."
    },
    {
      title: "Stakeholder Engagement",
      content: "Involving parents, school boards, and community partners is essential for comprehensive educational improvement. This requires clear communication and structured engagement processes."
    }
  ];

  const handleBackToModules = () => {
    navigate(-1);
  };

  // Load voices when component mounts
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const load = () => {
      const v = synth.getVoices();
      setVoices(v);
      
      const defaultVoice = v.find(voice => voice.lang === selectedLang) || 
                          v.find(voice => voice.lang?.startsWith(selectedLang.split('-')[0])) || 
                          v[0];
      if (defaultVoice && !selectedVoiceURI) {
        setSelectedVoiceURI(defaultVoice.voiceURI);
      }
    };
    load();
    synth.onvoiceschanged = load;
    return () => {
      if (synth) synth.onvoiceschanged = null;
    };
  }, [selectedLang, selectedVoiceURI]);

  const handleSpeakToggle = (blockKey, text) => {
    if (!text) return;
    const synth = window.speechSynthesis;
    if (!synth) return;
    
    const isSpeaking = speakingBlocks[blockKey];
    if (isSpeaking) {
      synth.cancel();
      setSpeakingBlocks(prev => ({ ...prev, [blockKey]: false }));
      return;
    }
    
    const utter = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.voiceURI === selectedVoiceURI);
    if (voice) {
      utter.voice = voice;
      utter.lang = voice.lang;
    }
    
    utter.rate = 0.8;
    utter.pitch = 1.0;
    utter.volume = 1.0;
    
    utter.onend = () => setSpeakingBlocks(prev => ({ ...prev, [blockKey]: false }));
    setSpeakingBlocks(prev => ({ ...prev, [blockKey]: true }));
    synth.speak(utter);
  };

  const handleTTSPlayPause = () => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    if (isTTSPlaying) {
      synth.cancel();
      setIsTTSPlaying(false);
      setCurrentTTSIndex(0);
      return;
    }

    const currentTopic = assessmentContent[currentTTSIndex];
    if (!currentTopic) return;

    const utter = new SpeechSynthesisUtterance();
    utter.text = `${currentTopic.title}. ${currentTopic.content}`;
    utter.rate = 0.8;
    utter.pitch = 1.0;
    utter.volume = 1.0;

    utter.onend = () => {
      if (currentTTSIndex < assessmentContent.length - 1) {
        setCurrentTTSIndex(prev => prev + 1);
        setTimeout(() => {
          const nextTopic = assessmentContent[currentTTSIndex + 1];
          if (nextTopic) {
            const nextUtter = new SpeechSynthesisUtterance();
            nextUtter.text = `${nextTopic.title}. ${nextTopic.content}`;
            nextUtter.rate = 0.8;
            nextUtter.pitch = 1.0;
            nextUtter.volume = 1.0;
            nextUtter.onend = () => {
              if (currentTTSIndex + 1 < assessmentContent.length - 1) {
                setCurrentTTSIndex(prev => prev + 1);
              } else {
                setIsTTSPlaying(false);
                setCurrentTTSIndex(0);
              }
            };
            synth.speak(nextUtter);
          }
        }, 500);
      } else {
        setIsTTSPlaying(false);
        setCurrentTTSIndex(0);
      }
    };

    setIsTTSPlaying(true);
    synth.speak(utter);
  };

  const handleTTSStop = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
    }
    setIsTTSPlaying(false);
    setCurrentTTSIndex(0);
  };

  const pdfUrl = '/assets/Us-department-of-justice.pdf';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <Button 
            onClick={handleBackToModules} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Modules
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Section 1: Introduction */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Module 2: Needs Assessment for Schools & Districts</h1>
            <p className="text-xl text-gray-600">Evaluating educational needs and identifying improvement opportunities</p>
          </div>

          {/* Video Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="aspect-video w-full max-w-4xl mx-auto">
              <iframe
                className="w-full h-full rounded-xl shadow-lg"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Needs Assessment Overview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Watch this overview to understand key principles of needs assessment and data analysis
              </p>
            </div>
          </div>

          {/* Section Description */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                What You'll Learn in This Module
              </h2>
              
              {/* Language and Voice Controls */}
              <div className="flex items-center gap-3">
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {languageOptions.map(opt => (
                    <option key={opt.code} value={opt.code}>{opt.label}</option>
                  ))}
                </select>
                
                <select
                  value={selectedVoiceURI}
                  onChange={(e) => setSelectedVoiceURI(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {voices
                    .filter(v => v.lang === selectedLang || v.lang?.startsWith(selectedLang.split('-')[0]))
                    .map(v => (
                      <option key={v.voiceURI} value={v.voiceURI}>
                        {v.name} ({v.lang})
                      </option>
                    ))}
                  {voices.length === 0 && (
                    <option value="">System default</option>
                  )}
                </select>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-end mb-3">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" 
                  onClick={() => handleSpeakToggle('lesson-text', 'In this comprehensive module, you\'ll learn about needs assessment strategies, data analysis techniques, and stakeholder engagement methods.')}
                >
                  {speakingBlocks['lesson-text'] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                  {speakingBlocks['lesson-text'] ? 'Stop' : 'Listen'}
                </Button>
              </div>
              <p className="text-gray-700 leading-relaxed">
                In this comprehensive module, you'll learn about needs assessment strategies, data analysis techniques, 
                and stakeholder engagement methods. We'll explore proven approaches for evaluating educational needs 
                and creating data-driven improvement plans.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Assessment Methods</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Data collection techniques</li>
                  <li>• Performance analysis</li>
                  <li>• Survey methodologies</li>
                  <li>• Stakeholder interviews</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">Implementation</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Data-driven decisions</li>
                  <li>• Improvement planning</li>
                  <li>• Community engagement</li>
                  <li>• Progress monitoring</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Topic 2.1: Teacher Competency */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl text-white">📊</span>
              </div>
              <div>
                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">Topic 2.1</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">Teacher Competency Mapping & Student Data Analysis</h2>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Key Components</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-blue-700 mb-2">Skill Assessment</h4>
                    <p className="text-sm text-gray-600">Evaluating teacher competencies and capabilities</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-blue-700 mb-2">Performance Metrics</h4>
                    <p className="text-sm text-gray-600">Measuring teaching effectiveness and outcomes</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-blue-700 mb-2">Data Analysis</h4>
                    <p className="text-sm text-gray-600">Interpreting student performance indicators</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Purpose List Section */}
          <section className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Objectives</h2>
              <div className="space-y-4">
                {learningObjectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 flex-1">{objective}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Flashcards Carousel */}
          <section className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Concepts</h2>
              <Carousel className="w-full">
                <CarouselContent>
                  {flashcards.map((card, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="group [perspective:1000px] h-[220px]">
                        <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 border rounded-xl p-6 shadow-sm [backface-visibility:hidden]">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">{card.front}</h3>
                            <p className="text-sm text-gray-600">Hover to reveal explanation</p>
                          </div>
                          <div className="absolute inset-0 bg-white border rounded-xl p-6 shadow-sm [transform:rotateY(180deg)] [backface-visibility:hidden]">
                            <p className="text-gray-700">{card.back}</p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </section>

          {/* Card Grid */}
          <section className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Assessment Components</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cardGridItems.map((item, index) => (
                  <Card 
                    key={index} 
                    className={`hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${item.color} border-2`}
                  >
                    <CardContent className="p-6">
                      <div className="w-16 h-16 mb-4 mx-auto">{item.icon}</div>
                      <h3 className="text-lg font-semibold mb-2 text-center">{item.title}</h3>
                      <p className="text-gray-600 text-center">{item.content}</p>
                      <div className="mt-4 flex justify-center">
                        <Button variant="outline" size="sm" className="text-xs">
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Timeline Section */}
          <section className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Assessment Process</h2>
              <div className="relative">
                {timelineSteps.map((step, index) => (
                  <div key={index} className="flex gap-4 mb-8">
                    <div className="relative">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      {index < timelineSteps.length - 1 && (
                        <div className="absolute top-8 left-4 w-0.5 h-full -ml-px bg-blue-200" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                      <p className="text-gray-600 mb-1">{step.content}</p>
                      <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">{step.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Accordion Section */}
          <section className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Topics</h2>
              <Accordion type="single" collapsible>
                {accordionItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg font-semibold">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">{item.content}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* Resources Section */}
          <section className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Resources</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* PDF Document */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-blue-800">📄 Assessment Guide</h3>
                    <div className="flex items-center gap-2">
                      <Button asChild variant="outline" size="sm">
                        <a href={pdfUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4" /> Open
                        </a>
                      </Button>
                      <Button asChild size="sm">
                        <a href={pdfUrl} download className="flex items-center gap-2">
                          <FileDown className="h-4 w-4" /> Download
                        </a>
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-blue-700">
                    Comprehensive guide to conducting educational needs assessments.
                  </p>
                </div>

                {/* Audio Section */}
                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">🎧 Audio Narration</h3>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handleTTSPlayPause}
                      className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                    >
                      {isTTSPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </button>
                    <div className="flex-1">
                      <div className="text-sm text-gray-600 mb-2">
                        {isTTSPlaying ? `Playing: ${assessmentContent[currentTTSIndex]?.title}` : 'Click play to start narration'}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${((currentTTSIndex + 1) / assessmentContent.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default LessonMod2NeedsAssessment;