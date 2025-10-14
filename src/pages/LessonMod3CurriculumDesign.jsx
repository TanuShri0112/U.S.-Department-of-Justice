import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Volume2, Maximize2, Play, Pause, X, Heart, ExternalLink, FileDown, Scale, School, Users, Target, FileText, Edit3, Shuffle, RefreshCw, CheckCircle, UserCheck, Building, Shield, Brain, MessageSquare, Cog, Lightbulb, Film, MessageCircle, Settings, Sparkles } from 'lucide-react';
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

const LessonMod3CurriculumDesign = () => {
  const navigate = useNavigate();
  const [speakingBlocks, setSpeakingBlocks] = useState({});
  const [voices, setVoices] = useState([]);
  const [selectedLang, setSelectedLang] = useState('en-US');
  const [selectedVoiceURI, setSelectedVoiceURI] = useState('');
  const [isFullScreenModalOpen, setIsFullScreenModalOpen] = useState(false);
  const [audioLang, setAudioLang] = useState('en-US');
  const [quizAnswers, setQuizAnswers] = useState({});
  const textRef = useRef(null);

  // Language options
  const languageOptions = React.useMemo(() => ([
    { code: 'en-US', label: '🇺🇸 English (US)' },
    { code: 'en-GB', label: '🇬🇧 English (UK)' },
    { code: 'es-ES', label: '🇪🇸 Spanish' },
    { code: 'fr-FR', label: '🇫🇷 French' }
  ]), []);

  // UI text based on selected language
  const uiText = React.useMemo(() => {
    const map = {
      'en': { 
        backToModules: 'Back to Modules',
        module3: 'Module 3: Curriculum & Module Design for Teachers',
        courseTitle: 'Educator Training',
        description: 'Developing effective curriculum and instructional design strategies',
        complete: 'Complete Module'
      },
      'es': { 
        backToModules: 'Volver a los Módulos',
        module3: 'Módulo 3: Diseño Curricular y de Módulos para Docentes',
        courseTitle: 'Formación de Educadores',
        description: 'Desarrollo de estrategias efectivas de diseño curricular e instruccional',
        complete: 'Completar Módulo'
      },
      'fr': { 
        backToModules: 'Retour aux Modules',
        module3: 'Module 3: Conception de Curriculum et de Modules pour Enseignants',
        courseTitle: 'Formation des Éducateurs',
        description: 'Développement de stratégies efficaces de conception pédagogique',
        complete: 'Terminer le Module'
      }
    };
    const key = (selectedLang || 'en-US').split('-')[0];
    return map[key] || map['en'];
  }, [selectedLang]);

  // Translation object for lesson content
  const t = React.useMemo(() => {
    const baseLang = (selectedLang || 'en-US').split('-')[0];
    
    if (baseLang === 'es') {
      return {
        introTitle: 'Lección 3: Diseño Curricular y de Módulos',
        introSubtitle: 'Desarrollo de programas de formación efectivos para educadores',
        learnTitle: 'Qué Aprenderás en Esta Lección',
        listen: 'Escuchar',
        stop: 'Detener',
        outcomesTitle: 'Resultados de Aprendizaje',
        toolsTitle: 'Herramientas que Utilizarás',
        paragraph: 'En esta lección, aprenderás sobre modelos de diseño instruccional, creación de módulos inclusivos y enfoques de aprendizaje socioemocional.',
        outcomes: [
          'Modelos de diseño instruccional',
          'Diseño de módulos inclusivos',
          'Integración del aprendizaje socioemocional',
          'Desarrollo de evaluaciones efectivas'
        ],
        tools: [
          'Plantillas de diseño ADDIE',
          'Marco UDL',
          'Herramientas SEL',
          'Plataformas de evaluación'
        ]
      };
    }
    if (baseLang === 'fr') {
      return {
        introTitle: 'Leçon 3: Conception de Curriculum et de Modules',
        introSubtitle: 'Développement de programmes de formation efficaces pour éducateurs',
        learnTitle: 'Ce que Vous Apprendrez dans Cette Leçon',
        listen: 'Écouter',
        stop: 'Arrêter',
        outcomesTitle: 'Résultats d\'Apprentissage',
        toolsTitle: 'Outils que Vous Utiliserez',
        paragraph: 'Dans cette leçon, vous apprendrez les modèles de conception pédagogique, la création de modules inclusifs et les approches d\'apprentissage socio-émotionnel.',
        outcomes: [
          'Modèles de conception pédagogique',
          'Conception de modules inclusifs',
          'Intégration de l\'apprentissage socio-émotionnel',
          'Développement d\'évaluations efficaces'
        ],
        tools: [
          'Modèles ADDIE',
          'Cadre UDL',
          'Outils SEL',
          'Plateformes d\'évaluation'
        ]
      };
    }
    return {
      introTitle: 'Lesson 3: Curriculum & Module Design',
      introSubtitle: 'Developing effective training programs for educators',
      learnTitle: 'What You\'ll Learn in This Lesson',
      listen: 'Listen',
      stop: 'Stop',
      outcomesTitle: 'Learning Outcomes',
      toolsTitle: 'Tools You\'ll Use',
      paragraph: 'In this lesson, you will learn about instructional design models, creating inclusive modules, and social-emotional learning approaches.',
      outcomes: [
        'Instructional design models',
        'Inclusive module design',
        'Social-emotional learning integration',
        'Effective assessment development'
      ],
      tools: [
        'ADDIE design templates',
        'UDL framework',
        'SEL tools',
        'Assessment platforms'
      ]
    };
  }, [selectedLang]);

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
    utter.lang = selectedLang;
    const voice = voices.find(v => v.voiceURI === selectedVoiceURI) || 
                  voices.find(v => v.lang === selectedLang);
    if (voice) utter.voice = voice;
    utter.onend = () => setSpeakingBlocks(prev => ({ ...prev, [blockKey]: false }));
    setSpeakingBlocks(prev => ({ ...prev, [blockKey]: true }));
    synth.speak(utter);
  };

  const handleFullScreen = () => {
    setIsFullScreenModalOpen(true);
  };

  const handleCompleteModule = () => {
    toast.success('Module completed successfully!');
    navigate(-1);
  };

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
            {uiText.backToModules}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Section 1: Introduction */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl shadow-lg overflow-hidden">
            {/* Yellow bar separator */}
            <div className="h-1 bg-yellow-400"></div>
            
            <div className="p-8">
              <h1 className="text-4xl font-bold text-white mb-6">
                {t.introTitle}
              </h1>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
                <p className="text-white text-lg leading-relaxed mb-4">
                  {t.paragraph}
                </p>
                
                {/* Audio Player */}
                <div className="bg-white rounded-lg p-4 flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center">
                      <Volume2 className="h-4 w-4 text-slate-600" />
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" 
                      onClick={() => handleSpeakToggle('intro-text', t.paragraph)}
                    >
                      {speakingBlocks['intro-text'] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                      {speakingBlocks['intro-text'] ? t.stop : t.listen}
                    </Button>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '30%'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">0:45</span>
                  <span className="text-sm text-gray-600">1x</span>
                  <Volume2 className="h-4 w-4 text-gray-600" />
                  <FileDown className="h-4 w-4 text-gray-600" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Video Section */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Video Player */}
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 flex items-center justify-center">
                <iframe 
                  width="100%" 
                  height="315" 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                  title="Curriculum Design Overview" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-[315px] rounded-lg"
                ></iframe>
              </div>
            
              {/* Text Content */}
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t.learnTitle}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Learn about instructional design models (ADDIE, UDL, Bloom's taxonomy), creating differentiated and inclusive lesson modules, and integrating social-emotional learning approaches.
                </p>
                
                {/* Audio Player */}
                <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">
                      <Volume2 className="h-3 w-3 text-gray-600" />
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleSpeakToggle('video-text', 'Learn about instructional design models, creating inclusive modules, and integrating social-emotional learning.')}
                    >
                      {speakingBlocks['video-text'] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                      {speakingBlocks['video-text'] ? t.stop : t.listen}
                    </Button>
                  </div>
                  <div className="flex-1 bg-gray-300 rounded-full h-1">
                    <div className="bg-blue-600 h-1 rounded-full" style={{width: '25%'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">0:22</span>
                  <span className="text-sm text-gray-600">1x</span>
                  <Volume2 className="h-4 w-4 text-gray-600" />
                  <ExternalLink className="h-4 w-4 text-gray-600" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Flashcards Section */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructional Design Models</h2>
            <Carousel className="w-full">
              <CarouselContent>
                {[
                  {
                    title: "ADDIE Model",
                    content: "Analysis, Design, Development, Implementation, Evaluation - A systematic approach to instructional design",
                    icon: <Target className="w-12 h-12 text-blue-600" />
                  },
                  {
                    title: "Universal Design for Learning (UDL)",
                    content: "Multiple means of engagement, representation, and expression to accommodate diverse learning needs",
                    icon: <Users className="w-12 h-12 text-green-600" />
                  },
                  {
                    title: "Bloom's Taxonomy",
                    content: "Hierarchical model for classifying learning objectives: Remember, Understand, Apply, Analyze, Evaluate, Create",
                    icon: <Brain className="w-12 h-12 text-purple-600" />
                  }
                ].map((card, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="group [perspective:1000px] h-[220px]">
                      <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 border rounded-xl p-6 shadow-sm [backface-visibility:hidden]">
                          <div className="flex justify-center mb-4">{card.icon}</div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">{card.title}</h3>
                          <p className="text-sm text-blue-600 text-center">Click to learn more</p>
                        </div>
                        <div className="absolute inset-0 bg-white border rounded-xl p-6 shadow-sm [transform:rotateY(180deg)] [backface-visibility:hidden]">
                          <p className="text-gray-700">{card.content}</p>
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

        {/* Timeline Section */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Design Process Timeline</h2>
            <div className="relative">
              {[
                {
                  title: "Analysis Phase",
                  content: "Identify learning needs, objectives, and target audience",
                  icon: <Target className="w-6 h-6 text-blue-600" />,
                  date: "Week 4"
                },
                {
                  title: "Design Phase",
                  content: "Create learning strategies and select instructional methods",
                  icon: <Edit3 className="w-6 h-6 text-green-600" />,
                  date: "Week 4"
                },
                {
                  title: "Development Phase",
                  content: "Develop content and learning materials",
                  icon: <FileText className="w-6 h-6 text-purple-600" />,
                  date: "Week 5"
                },
                {
                  title: "Implementation Phase",
                  content: "Deliver instruction and monitor learning",
                  icon: <Play className="w-6 h-6 text-orange-600" />,
                  date: "Week 5"
                },
                {
                  title: "Evaluation Phase",
                  content: "Assess effectiveness and make improvements",
                  icon: <CheckCircle className="w-6 h-6 text-red-600" />,
                  date: "Week 5"
                }
              ].map((step, index) => (
                <div key={index} className="flex gap-4 mb-8">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
                      {step.icon}
                    </div>
                    {index < 4 && (
                      <div className="absolute top-12 left-6 w-0.5 h-full -ml-px bg-blue-200" />
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

        {/* Audio Narration Section */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Audio Resources</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Audio Player */}
              <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                <h3 className="text-lg font-semibold text-green-800 mb-4">🎧 Module Overview</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleSpeakToggle('overview', 'This module covers instructional design models, creating inclusive modules, and integrating social-emotional learning approaches.')}
                    className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                  >
                    {speakingBlocks['overview'] ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </button>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-2">
                      {speakingBlocks['overview'] ? 'Playing: Module Overview' : 'Click play to start narration'}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: '0%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Language Selection */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">🌐 Language Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="text-sm text-gray-600">Language:</label>
                    <select
                      value={selectedLang}
                      onChange={(e) => setSelectedLang(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {languageOptions.map(opt => (
                        <option key={opt.code} value={opt.code}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="text-sm text-gray-600">Voice:</label>
                    <select
                      value={selectedVoiceURI}
                      onChange={(e) => setSelectedVoiceURI(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Module Completion */}
      <div className="bg-white border-t mt-12">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Ready to complete the module?
            </div>
            <Button 
              onClick={handleCompleteModule}
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white"
            >
              {uiText.complete}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonMod3CurriculumDesign;