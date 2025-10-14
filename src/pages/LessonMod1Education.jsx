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
const TeacherSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" 
      fill="#4F46E5"/>
  </svg>
);

const BookSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM6 4H11V12L8.5 10.5L6 12V4Z" 
      fill="#3B82F6"/>
  </svg>
);

const ChartSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17ZM19 19H5V5H19V19.1V19Z" 
      fill="#10B981"/>
  </svg>
);

const BrainSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5 8C15.5 5.2 13.3 3 10.5 3C7.7 3 5.5 5.2 5.5 8C5.5 9.4 6 10.7 6.9 11.6C7.3 12.1 7.5 12.7 7.5 13.3V16C7.5 17.7 8.8 19 10.5 19C12.2 19 13.5 17.7 13.5 16V13.3C13.5 12.7 13.7 12.1 14.1 11.6C15 10.7 15.5 9.4 15.5 8Z" 
      fill="#EC4899"/>
    <path d="M18.5 8C18.5 5.2 16.3 3 13.5 3C12.5 3 11.5 3.3 10.7 3.9C11.9 5 12.5 6.4 12.5 8C12.5 9.4 12 10.7 11.1 11.6C10.7 12.1 10.5 12.7 10.5 13.3V16C10.5 17.7 11.8 19 13.5 19C15.2 19 16.5 17.7 16.5 16V13.3C16.5 12.7 16.7 12.1 17.1 11.6C18 10.7 18.5 9.4 18.5 8Z" 
      fill="#F472B6"/>
  </svg>
);

const DocumentSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z" 
      fill="#6B7280"/>
  </svg>
);

const LessonMod1Education = () => {
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

  // Language options - Only languages with commonly available voices
  const languageOptions = React.useMemo(() => ([
    { code: 'en-US', label: '🇺🇸 English (US)' },
    { code: 'en-GB', label: '🇬🇧 English (UK)' },
    { code: 'hi-IN', label: '🇮🇳 Hindi' },
    { code: 'es-ES', label: '🇪🇸 Spanish' },
    { code: 'fr-FR', label: '🇫🇷 French' }
  ]), []);

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

  // Content for TTS
  const educatorContent = [
    {
      title: "Adult Learning Theory in Professional Development",
      content: "Understanding adult learning principles is crucial for effective professional development in education. Adult learners bring extensive experience and prefer self-directed learning approaches. Key principles include experiential learning, immediate application, and problem-centered instruction."
    },
    {
      title: "Educational Psychology and Reflective Teaching",
      content: "Educational psychology provides the foundation for understanding how teachers learn and develop. Reflective teaching practices encourage continuous improvement through systematic analysis of teaching methods and outcomes."
    },
    {
      title: "Federal Education Policy Overview",
      content: "Understanding IDEA, FERPA, and ESSA requirements is essential for educators. These federal policies establish guidelines for student privacy, special education services, and academic standards."
    }
  ];

  const handleTTSPlayPause = () => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    if (isTTSPlaying) {
      synth.cancel();
      setIsTTSPlaying(false);
      setCurrentTTSIndex(0);
      return;
    }

    const currentTopic = educatorContent[currentTTSIndex];
    if (!currentTopic) return;

    const utter = new SpeechSynthesisUtterance();
    utter.text = `${currentTopic.title}. ${currentTopic.content}`;
    utter.rate = 0.8;
    utter.pitch = 1.0;
    utter.volume = 1.0;

    utter.onend = () => {
      if (currentTTSIndex < educatorContent.length - 1) {
        setCurrentTTSIndex(prev => prev + 1);
        setTimeout(() => {
          const nextTopic = educatorContent[currentTTSIndex + 1];
          if (nextTopic) {
            const nextUtter = new SpeechSynthesisUtterance();
            nextUtter.text = `${nextTopic.title}. ${nextTopic.content}`;
            nextUtter.rate = 0.8;
            nextUtter.pitch = 1.0;
            nextUtter.volume = 1.0;
            nextUtter.onend = () => {
              if (currentTTSIndex + 1 < educatorContent.length - 1) {
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

  // Content for interactive sections
  const learningObjectives = [
    "To provide a clearer and more informed perspective—not to promote confrontation or resistance.",
    "To increase awareness so individuals can make choices that reflect their personal values.",
    "To encourage lawful and intelligent engagement with legal and societal systems.",
    "To lay a foundation for better decision-making based on understanding, not reaction.",
    "To promote greater self-awareness regarding one's role and rights within existing structures.",
    "To support more empowered and conscious participation in legal and civic processes."
  ];

  const flashcards = [
    {
      front: "Legal Identity",
      back: "A government-issued NAME used within statutory and administrative systems"
    },
    {
      front: "Natural Person",
      back: "The living individual with inherent rights and autonomy"
    },
    {
      front: "Administrative Systems",
      back: "Frameworks for processing forms, licenses, and legal obligations"
    }
  ];

  const timelineSteps = [
    {
      title: "Birth Registration",
      content: "Creation of the legal identity through birth certificate",
      date: "At Birth"
    },
    {
      title: "Document Issuance",
      content: "Various forms of government ID and documentation",
      date: "Throughout Life"
    },
    {
      title: "Legal Interactions",
      content: "Ongoing engagement with administrative systems",
      date: "Continuous"
    }
  ];

  const accordionItems = [
    {
      title: "Understanding Legal Identity",
      content: "The legal NAME is a distinct, non-living entity used for administrative purposes."
    },
    {
      title: "Natural vs Legal Person",
      content: "Understanding the distinction between your living self and administrative identity."
    },
    {
      title: "Practical Applications",
      content: "How to navigate systems while maintaining clarity about these distinctions."
    }
  ];

  const cardGridItems = [
    {
      title: "Adult Learning Theory",
      icon: <TeacherSVG />,
      content: "Understanding how adults learn and process information differently",
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Educational Psychology",
      icon: <BrainSVG />,
      content: "Applying psychological principles to teaching and learning",
      color: "bg-pink-50 border-pink-200"
    },
    {
      title: "Professional Development",
      icon: <ChartSVG />,
      content: "Continuous improvement through structured learning",
      color: "bg-purple-50 border-purple-200"
    },
    {
      title: "Teaching Methods",
      icon: <BookSVG />,
      content: "Effective strategies for knowledge transfer",
      color: "bg-green-50 border-green-200"
    },
    {
      title: "Assessment",
      icon: <DocumentSVG />,
      content: "Evaluating learning outcomes and progress",
      color: "bg-yellow-50 border-yellow-200"
    },
    {
      title: "Resources",
      icon: <BookSVG />,
      content: "Tools and materials for effective teaching",
      color: "bg-indigo-50 border-indigo-200"
    }
  ];

  const pdfUrl = '/assets/Lesson1Understanding_Your_Dream.pdf';

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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Module 1: Foundations of Professional Learning in Education</h1>
            <p className="text-xl text-gray-600">Understanding adult learning principles and their application in educational settings</p>
          </div>

          {/* Video Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="aspect-video w-full max-w-4xl mx-auto">
              <iframe
                className="w-full h-full rounded-xl shadow-lg"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Adult Learning Theory Overview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Watch this overview to understand adult learning principles and their application in educational settings
              </p>
            </div>
          </div>

          {/* Section Description */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                What You'll Learn in This Module
              </h2>
              
              {/* Language and Voice Controls */}
              <div className="flex items-center gap-3">
                {/* Language Selection */}
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {languageOptions.map(opt => (
                    <option key={opt.code} value={opt.code}>{opt.label}</option>
                  ))}
                </select>
                
                {/* Voice Selection */}
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
                  onClick={() => handleSpeakToggle('lesson-text', 'In this comprehensive module, you\'ll learn about adult learning principles and their application in educational settings. We\'ll explore learning theories, reflective teaching practices, and federal education policies.')}
                >
                  {speakingBlocks['lesson-text'] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                  {speakingBlocks['lesson-text'] ? 'Stop' : 'Listen'}
                </Button>
              </div>
              <p className="text-gray-700 leading-relaxed">
                In this comprehensive module, you'll learn about adult learning principles and their application in educational settings. 
                We'll explore learning theories, reflective teaching practices, and federal education policies.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Learning Theory</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Adult learning principles</li>
                  <li>• Experiential learning</li>
                  <li>• Self-directed learning</li>
                  <li>• Professional development</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">Educational Practice</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Reflective teaching</li>
                  <li>• Assessment methods</li>
                  <li>• Policy compliance</li>
                  <li>• Best practices</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Topic 1.1: Adult Learning Theory */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl text-white">🎓</span>
              </div>
              <div>
                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">Topic 1.1</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">Adult Learning Theory in Professional Development</h2>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Key Principles</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-blue-700 mb-2">Self-Directed Learning</h4>
                    <p className="text-sm text-gray-600">Educators control their learning pace and build on existing experience</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-blue-700 mb-2">Experiential Learning</h4>
                    <p className="text-sm text-gray-600">Learning through reflection on classroom experiences</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-blue-700 mb-2">Immediate Application</h4>
                    <p className="text-sm text-gray-600">Direct connection to classroom practice</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Topic 1.2: Educational Psychology */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl text-white">🧠</span>
              </div>
              <div>
                <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">Topic 1.2</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">Educational Psychology and Reflective Teaching</h2>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4">Reflective Practice Framework</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-green-700 mb-2">Planning and Analysis</h4>
                    <p className="text-sm text-gray-600">Systematic approach to lesson planning and evaluation</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-green-700 mb-2">Professional Growth</h4>
                    <p className="text-sm text-gray-600">Continuous improvement through reflection and adaptation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Topic 1.3: Federal Policy */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl text-white">⚖️</span>
              </div>
              <div>
                <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">Topic 1.3</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">Federal Education Policy Overview</h2>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-4">Key Federal Policies</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-purple-700 mb-2">IDEA</h4>
                    <p className="text-sm text-gray-600">Special education services and accommodations</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-purple-700 mb-2">FERPA</h4>
                    <p className="text-sm text-gray-600">Student privacy and records protection</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-purple-700 mb-2">ESSA</h4>
                    <p className="text-sm text-gray-600">Academic standards and accountability</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </section>

          {/* Purpose List Section */}
          <section className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Purpose of This Lesson</h2>
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
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 shadow-lg [backface-visibility:hidden]">
                            <div className="w-16 h-16 mx-auto mb-4">
                              {index === 0 ? <TeacherSVG /> : index === 1 ? <BrainSVG /> : <ChartSVG />}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">{card.front}</h3>
                            <p className="text-sm text-blue-600 text-center bg-blue-50 py-1 px-2 rounded-full mt-4">Hover to reveal</p>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 rounded-xl p-6 shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden]">
                            <div className="h-full flex flex-col justify-center">
                              <p className="text-gray-700 text-center">{card.back}</p>
                              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                                <span className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Click to flip back</span>
                              </div>
                            </div>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Components</h2>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Process Timeline</h2>
              <div className="relative">
                {timelineSteps.map((step, index) => (
                  <div key={index} className="flex gap-4 mb-8">
                    <div className="relative">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                          {index === 0 ? <DocumentSVG /> : index === 1 ? <ChartSVG /> : <BrainSVG />}
                        </div>
                        <div className="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-400 border-2 border-white"></div>
                      </div>
                      {index < timelineSteps.length - 1 && (
                        <div className="absolute top-12 left-6 w-1 h-full -ml-px bg-gradient-to-b from-blue-200 to-transparent" />
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

          {/* Detailed Topics Section */}
          <section className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-violet-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl text-white">📚</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Detailed Topics</h2>
                  <p className="text-gray-600">In-depth exploration of key concepts</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Accordion Section */}
                <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg p-6">
                  <Accordion type="single" collapsible className="space-y-4">
                    {accordionItems.map((item, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`item-${index}`}
                        className="bg-white rounded-lg shadow-sm border border-violet-100 overflow-hidden"
                      >
                        <AccordionTrigger className="px-6 py-4 hover:bg-violet-50 transition-colors">
                          <div className="flex items-center">
                            <span className="text-xl mr-3">{index === 0 ? '🎓' : index === 1 ? '🧠' : '📋'}</span>
                            <span className="text-lg font-semibold text-gray-900">{item.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 py-4 bg-violet-50/30">
                          <div className="space-y-4">
                            <p className="text-gray-700">{item.content}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-white rounded-lg p-3 shadow-sm">
                                <h4 className="font-medium text-violet-800 mb-2">Key Points</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  {index === 0 ? (
                                    <>
                                      <li>• Self-directed learning principles</li>
                                      <li>• Experience-based approach</li>
                                      <li>• Practical application focus</li>
                                    </>
                                  ) : index === 1 ? (
                                    <>
                                      <li>• Cognitive development stages</li>
                                      <li>• Learning style adaptation</li>
                                      <li>• Continuous improvement</li>
                                    </>
                                  ) : (
                                    <>
                                      <li>• Policy compliance requirements</li>
                                      <li>• Documentation standards</li>
                                      <li>• Implementation guidelines</li>
                                    </>
                                  )}
                                </ul>
                              </div>
                              <div className="bg-white rounded-lg p-3 shadow-sm">
                                <h4 className="font-medium text-violet-800 mb-2">Application</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  {index === 0 ? (
                                    <>
                                      <li>• Classroom implementation</li>
                                      <li>• Professional development</li>
                                      <li>• Skill assessment</li>
                                    </>
                                  ) : index === 1 ? (
                                    <>
                                      <li>• Teaching strategies</li>
                                      <li>• Student engagement</li>
                                      <li>• Performance evaluation</li>
                                    </>
                                  ) : (
                                    <>
                                      <li>• Record keeping</li>
                                      <li>• Privacy protection</li>
                                      <li>• Compliance monitoring</li>
                                    </>
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                {/* Quick Reference */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-900 mb-4">Quick Reference Guide</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium text-purple-800 mb-2">Adult Learning</h4>
                      <p className="text-sm text-gray-600">Key principles and methodologies for effective adult education</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium text-purple-800 mb-2">Psychology</h4>
                      <p className="text-sm text-gray-600">Understanding cognitive processes and learning behaviors</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium text-purple-800 mb-2">Compliance</h4>
                      <p className="text-sm text-gray-600">Essential policies and regulatory requirements</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Assessment Section */}
          <section className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl text-white">🎯</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Interactive Learning Assessment</h2>
                  <p className="text-gray-600">Test your understanding of adult learning principles</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Multiple Choice Questions */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Knowledge Check</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium text-gray-800 mb-3">Which principle is most important in adult learning?</h4>
                      <div className="space-y-2">
                        {['Self-directed learning', 'Experiential learning', 'Structured curriculum', 'Fixed schedules'].map((option, idx) => (
                          <div key={idx} className="flex items-center">
                            <input
                              type="radio"
                              name="q1"
                              id={`q1_${idx}`}
                              className="w-4 h-4 text-blue-600"
                            />
                            <label htmlFor={`q1_${idx}`} className="ml-2 text-gray-700">{option}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium text-gray-800 mb-3">What is a key aspect of reflective teaching?</h4>
                      <div className="space-y-2">
                        {['Following strict guidelines', 'Systematic self-evaluation', 'Avoiding change', 'Standard assessments'].map((option, idx) => (
                          <div key={idx} className="flex items-center">
                            <input
                              type="radio"
                              name="q2"
                              id={`q2_${idx}`}
                              className="w-4 h-4 text-blue-600"
                            />
                            <label htmlFor={`q2_${idx}`} className="ml-2 text-gray-700">{option}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Progress</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">85%</div>
                      <div className="text-sm text-gray-600">Module Completion</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">4/5</div>
                      <div className="text-sm text-gray-600">Correct Answers</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">12</div>
                      <div className="text-sm text-gray-600">Activities Completed</div>
                    </div>
                  </div>
                </div>

                {/* Learning Tips */}
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-start">
                    <span className="text-yellow-600 mr-3">💡</span>
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-1">Learning Tip</h4>
                      <p className="text-sm text-yellow-700">
                        Remember that adult learners bring valuable experience to their learning. Consider how each concept 
                        relates to your own teaching experience and practice.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Process Flow Section */}
          <section className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl text-white">🔄</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Learning Process Flow</h2>
                  <p className="text-gray-600">Step-by-step guide to implementing adult learning principles</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Process Steps */}
                <div className="relative">
                  <div className="absolute left-8 top-8 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>
                  
                  <div className="space-y-12">
                    {/* Step 1 */}
                    <div className="relative flex items-start">
                      <div className="absolute -left-2 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-3xl text-white">1</span>
                      </div>
                      <div className="ml-24">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Assessment & Planning</h3>
                        <div className="bg-blue-50 rounded-lg p-4">
                          <ul className="text-sm text-gray-700 space-y-2">
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              Identify learner needs and goals
                            </li>
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              Evaluate current knowledge levels
                            </li>
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              Set clear learning objectives
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative flex items-start">
                      <div className="absolute -left-2 w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-3xl text-white">2</span>
                      </div>
                      <div className="ml-24">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Implementation</h3>
                        <div className="bg-purple-50 rounded-lg p-4">
                          <ul className="text-sm text-gray-700 space-y-2">
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                              Apply adult learning principles
                            </li>
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                              Use experiential learning methods
                            </li>
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                              Facilitate self-directed learning
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative flex items-start">
                      <div className="absolute -left-2 w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-3xl text-white">3</span>
                      </div>
                      <div className="ml-24">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Evaluation & Reflection</h3>
                        <div className="bg-pink-50 rounded-lg p-4">
                          <ul className="text-sm text-gray-700 space-y-2">
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                              Assess learning outcomes
                            </li>
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                              Gather participant feedback
                            </li>
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                              Refine teaching approach
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Process Tips */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
                  <h3 className="text-lg font-semibold text-indigo-900 mb-4">Best Practices</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium text-indigo-800 mb-2">Planning Phase</h4>
                      <p className="text-sm text-gray-600">Focus on learner-centered objectives and clear outcomes</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium text-purple-800 mb-2">Implementation</h4>
                      <p className="text-sm text-gray-600">Use diverse teaching methods and encourage active participation</p>
                    </div>
                  </div>
                </div>
              </div>
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
                  <h3 className="text-lg font-semibold text-blue-800">📄 Training Manual</h3>
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
                  Comprehensive guide to professional development and adult learning principles in education.
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
                      {isTTSPlaying ? `Playing: ${educatorContent[currentTTSIndex]?.title}` : 'Click play to start narration'}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentTTSIndex + 1) / educatorContent.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LessonMod1Education;