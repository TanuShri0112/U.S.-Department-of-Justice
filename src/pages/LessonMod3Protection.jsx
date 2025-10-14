import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Volume2, Maximize2, Play, Pause, X, Heart, ExternalLink, FileDown, Scale, School, Users, Target, FileText, Edit3, Shuffle, RefreshCw, CheckCircle, UserCheck, Building, Shield, Brain, MessageSquare, Cog, Lightbulb, Film, MessageCircle, Settings, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const LessonMod3Protection = () => {
  const navigate = useNavigate();
  const [speakingBlocks, setSpeakingBlocks] = useState({});
  const [voices, setVoices] = useState([]);
  const [selectedLang, setSelectedLang] = useState('en-US');
  const [selectedVoiceURI, setSelectedVoiceURI] = useState('');
  const [isFullScreenModalOpen, setIsFullScreenModalOpen] = useState(false);
  const [audioLang, setAudioLang] = useState('en-US'); // Local state for audio section only
  const [quizAnswers, setQuizAnswers] = useState({}); // State for quiz answers
  const textRef = useRef(null);

  // Language options
  const languageOptions = React.useMemo(() => ([
    { code: 'en-US', label: 'English (US)' },
    { code: 'hi-IN', label: 'हिन्दी (Hindi)' },
    { code: 'mr-IN', label: 'मराठी (Marathi)' }
  ]), []);

  // UI text based on selected language
  const uiText = React.useMemo(() => {
    const map = {
      'en': { 
        backToModules: 'Back to Modules',
        module3: 'Module 3: Customized Curriculum & Scenario Design',
        courseTitle: 'Law Enforcement Training',
        description: 'Developing tailored training programs and realistic scenarios for law enforcement',
        complete: 'Complete Module'
      },
      'hi': { 
        backToModules: 'मॉड्यूल्स पर वापस जाएं',
        module3: 'मॉड्यूल 3: अनुकूलित पाठ्यक्रम और परिदृश्य डिजाइन',
        courseTitle: 'कानून प्रवर्तन प्रशिक्षण',
        description: 'कानून प्रवर्तन के लिए अनुकूलित प्रशिक्षण कार्यक्रम और यथार्थवादी परिदृश्य विकसित करना',
        complete: 'मॉड्यूल पूरा करें'
      },
      'mr': { 
        backToModules: 'मॉड्यूल्सकडे परत जा',
        module3: 'मॉड्यूल 3: सानुकूलित अभ्यासक्रम आणि परिस्थिती डिझाइन',
        courseTitle: 'कायदा अंमलबजावणी प्रशिक्षण',
        description: 'कायदा अंमलबजावणीसाठी सानुकूलित प्रशिक्षण कार्यक्रम आणि वास्तववादी परिस्थिती विकसित करणे',
        complete: 'मॉड्यूल पूर्ण करा'
      }
    };
    const key = (selectedLang || 'en-US').split('-')[0];
    return map[key] || map['en'];
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

  // Translation object for lesson content
  const t = React.useMemo(() => {
    const baseLang = (selectedLang || 'en-US').split('-')[0];
    
    if (baseLang === 'hi') {
      return {
        introTitle: 'पाठ 3: अनुकूलित पाठ्यक्रम और परिदृश्य डिजाइन',
        introSubtitle: 'कानून प्रवर्तन के लिए प्रभावी प्रशिक्षण कार्यक्रम विकसित करना',
        learnTitle: 'इस पाठ में आप क्या सीखेंगे',
        listen: 'सुनें',
        stop: 'रोकें',
        outcomesTitle: 'सीखने के परिणाम',
        toolsTitle: 'आपके द्वारा उपयोग किए जाने वाले उपकरण',
        paragraph: 'इस पाठ में, आप सीखेंगे कि कैसे प्रक्रियात्मक न्याय परिदृश्यों को डिजाइन करें, अंतर-एजेंसी सहयोग को बढ़ावा दें, और वास्तविक मामलों के अध्ययन को प्रशिक्षण में शामिल करें।',
        outcomes: [
          'प्रक्रियात्मक न्याय परिदृश्यों का डिजाइन',
          'अंतर-एजेंसी सहयोग में प्रशिक्षण',
          'मामला अध्ययनों का समावेश',
          'यथार्थवादी सिमुलेशन विकसित करना'
        ],
        tools: [
          'परिदृश्य डिजाइन टूल',
          'सहयोग मैट्रिक्स',
          'मामला अध्ययन डेटाबेस',
          'सिमुलेशन प्लेटफॉर्म'
        ],
        hoverToFlip: 'फ्लिप करने हेतु होवर करें',
        summary: 'सारांश',
        studyKeyIdeas: 'मुख्य विचारों का अध्ययन करें'
      };
    }
    if (baseLang === 'mr') {
      return {
        introTitle: 'धडा 3: सानुकूलित अभ्यासक्रम आणि परिस्थिती डिझाइन',
        introSubtitle: 'कायदा अंमलबजावणीसाठी प्रभावी प्रशिक्षण कार्यक्रम विकसित करणे',
        learnTitle: 'या धड्यात तुम्ही काय शिकाल',
        listen: 'ऐका',
        stop: 'थांबवा',
        outcomesTitle: 'शिकण्याचे परिणाम',
        toolsTitle: 'तुम्ही वापराल ते साधने',
        paragraph: 'या धड्यात, तुम्ही शिकाल की कसे प्रक्रियात्मक न्याय परिस्थिती डिझाइन करावे, अंतर-एजन्सी सहकार्याला प्रोत्साहन द्यावे, आणि वास्तविक केसेसचे अभ्यास प्रशिक्षणात समाविष्ट करावे.',
        outcomes: [
          'प्रक्रियात्मक न्याय परिस्थितीचे डिझाइन',
          'अंतर-एजन्सी सहकार्यात प्रशिक्षण',
          'केस स्टडीजचा समावेश',
          'वास्तववादी सिम्युलेशन विकसित करणे'
        ],
        tools: [
          'परिस्थिती डिझाइन साधने',
          'सहकार्य मॅट्रिक्स',
          'केस स्टडी डेटाबेस',
          'सिम्युलेशन प्लॅटफॉर्म'
        ],
        hoverToFlip: 'फ्लिपसाठी होवर करा',
        summary: 'सारांश',
        studyKeyIdeas: 'महत्त्वाच्या कल्पना अभ्यासा'
      };
    }
    return {
      introTitle: 'Lesson 3: Customized Curriculum & Scenario Design',
      introSubtitle: 'Developing effective training programs for law enforcement',
      learnTitle: 'What You\'ll Learn in This Lesson',
      listen: 'Listen',
      stop: 'Stop',
      outcomesTitle: 'Learning Outcomes',
      toolsTitle: 'Tools You\'ll Use',
      paragraph: 'In this lesson, you will learn how to design procedural justice scenarios, promote interagency collaboration, and incorporate real case studies into training programs.',
      outcomes: [
        'Design procedural justice scenarios',
        'Training in interagency collaboration',
        'Incorporating case studies',
        'Developing realistic simulations'
      ],
      tools: [
        'Scenario design tools',
        'Collaboration matrices',
        'Case study databases',
        'Simulation platforms'
      ],
      hoverToFlip: 'Hover to flip',
      summary: 'Summary',
      studyKeyIdeas: 'Study key ideas'
    };
  }, [selectedLang]);

  // Study cards for carousel
  const studyCards = React.useMemo(() => {
    const baseLang = (selectedLang || 'en-US').split('-')[0];
    
    if (baseLang === 'hi') {
      return [
        {
          title: 'प्रक्रियात्मक न्याय परिदृश्य',
          front: ['निष्पक्ष प्रक्रिया', 'पारदर्शिता', 'जवाबदेही'],
          back: 'प्रक्रियात्मक न्याय परिदृश्यों में निष्पक्ष और पारदर्शी प्रक्रियाओं पर ध्यान केंद्रित किया जाता है।',
          color: 'from-blue-50 to-indigo-50 border-blue-100',
        },
        {
          title: 'अंतर-एजेंसी सहयोग',
          front: ['प्रोबेशन', 'स्कूल', 'वकालत समूह'],
          back: 'विभिन्न एजेंसियों के बीच सहयोग से अधिक प्रभावी प्रशिक्षण कार्यक्रम बनते हैं।',
          color: 'from-green-50 to-emerald-50 border-green-100',
        },
        {
          title: 'मामला अध्ययन',
          front: ['DOJ नागरिक अधिकार', 'किशोर न्याय सुधार', 'वास्तविक मामले'],
          back: 'वास्तविक मामलों के अध्ययन से प्रशिक्षण अधिक प्रासंगिक और प्रभावी बनता है।',
          color: 'from-purple-50 to-violet-50 border-purple-100',
        },
      ];
    }
    if (baseLang === 'mr') {
      return [
        {
          title: 'प्रक्रियात्मक न्याय परिस्थिती',
          front: ['निष्पक्ष प्रक्रिया', 'पारदर्शिता', 'जबाबदारी'],
          back: 'प्रक्रियात्मक न्याय परिस्थितींमध्ये निष्पक्ष आणि पारदर्शी प्रक्रियांवर लक्ष केंद्रित केले जाते.',
          color: 'from-blue-50 to-indigo-50 border-blue-100',
        },
        {
          title: 'अंतर-एजन्सी सहकार्य',
          front: ['प्रोबेशन', 'शाळा', 'वकालत गट'],
          back: 'विविध एजन्सींमधील सहकार्यामुळे अधिक प्रभावी प्रशिक्षण कार्यक्रम तयार होतात.',
          color: 'from-green-50 to-emerald-50 border-green-100',
        },
        {
          title: 'केस स्टडी',
          front: ['DOJ नागरिक अधिकार', 'किशोर न्याय सुधार', 'वास्तविक केसेस'],
          back: 'वास्तविक केसेसच्या अभ्यासामुळे प्रशिक्षण अधिक प्रासंगिक आणि प्रभावी बनते.',
          color: 'from-purple-50 to-violet-50 border-purple-100',
        },
      ];
    }
    return [
      {
        title: 'Procedural Justice Scenarios',
        front: ['Fair process', 'Transparency', 'Accountability'],
        back: 'Procedural justice scenarios focus on fair and transparent processes in law enforcement.',
        color: 'from-blue-50 to-indigo-50 border-blue-100',
      },
      {
        title: 'Interagency Collaboration',
        front: ['Probation', 'Schools', 'Advocacy Groups'],
        back: 'Collaboration between different agencies creates more effective training programs.',
        color: 'from-green-50 to-emerald-50 border-green-100',
      },
      {
        title: 'Case Studies',
        front: ['DOJ Civil Rights', 'Juvenile Justice Reform', 'Real Cases'],
        back: 'Incorporating real case studies makes training more relevant and effective.',
        color: 'from-purple-50 to-violet-50 border-purple-100',
      },
    ];
  }, [selectedLang]);

  const baseLang = (selectedLang || 'en-US').split('-')[0];
  
  const pdfUi = React.useMemo(() => {
    if (baseLang === 'hi') return { title: 'पीडीएफ दस्तावेज', open: 'खोलें', download: 'डाउनलोड' };
    if (baseLang === 'mr') return { title: 'PDF दस्तऐवज', open: 'उघडा', download: 'डाउनलोड' };
    return { title: 'PDF Document', open: 'Open', download: 'Download' };
  }, [baseLang]);
  const pdfUrl = '/assets/Lesson3Protection_Plan.pdf';

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
        {/* Section 1: Introduction - Image 1 Style */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-slate-500 to-slate-600 rounded-2xl shadow-lg overflow-hidden">
            {/* Yellow bar separator */}
            <div className="h-1 bg-yellow-400"></div>
            
            <div className="p-8">
              <h1 className="text-4xl font-bold text-white mb-6">
                {baseLang === 'hi' ? 'परिचय' : baseLang === 'mr' ? 'परिचय' : 'INTRODUCTION'}
              </h1>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
                <p className="text-white text-lg leading-relaxed mb-4">
                  {baseLang === 'hi' ? 
                    'यह पाठ कानून प्रवर्तन प्रशिक्षण में अनुकूलित पाठ्यक्रम और परिदृश्य डिजाइन के महत्व पर केंद्रित है। आप सीखेंगे कि कैसे प्रभावी प्रशिक्षण कार्यक्रम विकसित करें जो वास्तविक दुनिया की चुनौतियों को दर्शाते हैं।' :
                    baseLang === 'mr' ?
                    'हा धडा कायदा अंमलबजावणी प्रशिक्षणात सानुकूलित अभ्यासक्रम आणि परिस्थिती डिझाइनच्या महत्त्वावर केंद्रित आहे. तुम्ही शिकाल की कसे प्रभावी प्रशिक्षण कार्यक्रम विकसित करावे जे वास्तविक जगाच्या आव्हानांना प्रतिबिंबित करतात.' :
                    'This lesson focuses on the importance of customized curriculum and scenario design in law enforcement training. You will learn how to develop effective training programs that reflect real-world challenges and prepare officers for complex situations they may encounter in the field.'
                  }
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
                      onClick={() => handleSpeakToggle('intro-text', baseLang === 'hi' ? 
                        'यह पाठ कानून प्रवर्तन प्रशिक्षण में अनुकूलित पाठ्यक्रम और परिदृश्य डिजाइन के महत्व पर केंद्रित है। आप सीखेंगे कि कैसे प्रभावी प्रशिक्षण कार्यक्रम विकसित करें जो वास्तविक दुनिया की चुनौतियों को दर्शाते हैं।' :
                        baseLang === 'mr' ?
                        'हा धडा कायदा अंमलबजावणी प्रशिक्षणात सानुकूलित अभ्यासक्रम आणि परिस्थिती डिझाइनच्या महत्त्वावर केंद्रित आहे. तुम्ही शिकाल की कसे प्रभावी प्रशिक्षण कार्यक्रम विकसित करावे जे वास्तविक जगाच्या आव्हानांना प्रतिबिंबित करतात.' :
                        'This lesson focuses on the importance of customized curriculum and scenario design in law enforcement training. You will learn how to develop effective training programs that reflect real-world challenges and prepare officers for complex situations they may encounter in the field.'
                      )}
                    >
                      {speakingBlocks['intro-text'] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                      {speakingBlocks['intro-text'] ? t.stop : t.listen}
                </Button>
              </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-slate-600 h-2 rounded-full" style={{width: '30%'}}></div>
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

        {/* Section 2: Video Section - Image 2 Style */}
         <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
               {/* Video Player */}
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 flex items-center justify-center">
                <iframe 
                  width="100%" 
                  height="315" 
                  src="https://www.youtube.com/embed/Lu6FgSbXqWI?si=Aol-paS1B1be2vAh" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                  className="w-full h-[315px] rounded-lg"
                ></iframe>
             </div>
            
              {/* Text Content */}
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {baseLang === 'hi' ? 'प्रशिक्षण वीडियो' : baseLang === 'mr' ? 'प्रशिक्षण व्हिडिओ' : 'Training Video'}
             </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {baseLang === 'hi' ? 
                    'इस वीडियो में आप देखेंगे कि कैसे प्रभावी प्रशिक्षण परिदृश्यों को डिजाइन किया जाता है। वास्तविक मामलों के आधार पर विकसित किए गए ये परिदृश्य अधिकारियों को विभिन्न स्थितियों के लिए तैयार करते हैं।' :
                    baseLang === 'mr' ?
                    'या व्हिडिओमध्ये तुम्ही पाहाल की कसे प्रभावी प्रशिक्षण परिस्थिती डिझाइन केल्या जातात. वास्तविक केसेसवर आधारित विकसित केलेल्या या परिस्थिती अधिकाऱ्यांना विविध परिस्थितींसाठी तयार करतात.' :
                    'This video demonstrates how effective training scenarios are designed. These scenarios, developed based on real cases, prepare officers for various situations they may encounter in the field.'
                  }
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
                      onClick={() => handleSpeakToggle('video-text', baseLang === 'hi' ? 
                        'इस वीडियो में आप देखेंगे कि कैसे प्रभावी प्रशिक्षण परिदृश्यों को डिजाइन किया जाता है।' :
                        baseLang === 'mr' ?
                        'या व्हिडिओमध्ये तुम्ही पाहाल की कसे प्रभावी प्रशिक्षण परिस्थिती डिझाइन केल्या जातात.' :
                        'This video demonstrates how effective training scenarios are designed.'
                      )}
                    >
                      {speakingBlocks['video-text'] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                      {speakingBlocks['video-text'] ? t.stop : t.listen}
                   </Button>
                 </div>
                  <div className="flex-1 bg-gray-300 rounded-full h-1">
                    <div className="bg-slate-600 h-1 rounded-full" style={{width: '25%'}}></div>
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

        {/* Section 3: Purpose of This Lesson - Image 3 Style */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-600 to-slate-700 text-white p-6">
              <h2 className="text-2xl font-bold text-center">
                {baseLang === 'hi' ? 'इस पाठ का उद्देश्य' : baseLang === 'mr' ? 'या धड्याचा उद्देश्य' : 'Purpose of This Lesson'}
            </h2>
            </div>
            
            {/* Yellow separator */}
            <div className="h-1 bg-yellow-400"></div>
            
            {/* Content */}
            <div className="p-8">
              <div className="space-y-6">
                {[
                  {
                    text: baseLang === 'hi' ? 'प्रभावी प्रशिक्षण परिदृश्यों को डिजाइन करने के लिए एक स्पष्ट और सूचित दृष्टिकोण प्रदान करना' :
                         baseLang === 'mr' ? 'प्रभावी प्रशिक्षण परिस्थिती डिझाइन करण्यासाठी स्पष्ट आणि माहितीपूर्ण दृष्टिकोण प्रदान करणे' :
                         'To provide a clearer and more informed perspective for designing effective training scenarios',
                    number: 1
                  },
                  {
                    text: baseLang === 'hi' ? 'अधिकारियों को वास्तविक दुनिया की चुनौतियों के लिए तैयार करने के लिए जागरूकता बढ़ाना' :
                         baseLang === 'mr' ? 'अधिकाऱ्यांना वास्तविक जगाच्या आव्हानांसाठी तयार करण्यासाठी जागरूकता वाढवणे' :
                         'To increase awareness so officers can be prepared for real-world challenges',
                    number: 2
                  },
                  {
                    text: baseLang === 'hi' ? 'कानूनी और सामाजिक प्रणालियों के साथ कानूनी और बुद्धिमान जुड़ाव को प्रोत्साहित करना' :
                         baseLang === 'mr' ? 'कायदेशीर आणि सामाजिक प्रणालींसोबत कायदेशीर आणि बुद्धिमान जोडणीला प्रोत्साहन देणे' :
                         'To encourage lawful and intelligent engagement with legal and societal systems',
                    number: 3
                  },
                  {
                    text: baseLang === 'hi' ? 'समझ के आधार पर बेहतर निर्णय लेने के लिए एक नींव रखना' :
                         baseLang === 'mr' ? 'समजुतीच्या आधारावर चांगले निर्णय घेण्यासाठी पाया घालणे' :
                         'To lay a foundation for better decision-making based on understanding',
                    number: 4
                  },
                  {
                    text: baseLang === 'hi' ? 'मौजूदा संरचनाओं के भीतर अपनी भूमिका और अधिकारों के बारे में अधिक आत्म-जागरूकता को बढ़ावा देना' :
                         baseLang === 'mr' ? 'विद्यमान रचनांमध्ये त्यांच्या भूमिका आणि अधिकारांबद्दल अधिक आत्म-जागरूकता वाढवणे' :
                         'To promote greater self-awareness regarding their role and rights within existing structures',
                    number: 5
                  },
                  {
                    text: baseLang === 'hi' ? 'कानूनी और नागरिक प्रक्रियाओं में अधिक सशक्त और सचेत भागीदारी का समर्थन करना' :
                         baseLang === 'mr' ? 'कायदेशीर आणि नागरिक प्रक्रियांमध्ये अधिक सशक्त आणि सचेत सहभागाला समर्थन देणे' :
                         'To support more empowered and conscious participation in legal and civic processes',
                    number: 6
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-slate-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {item.number}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{item.text}</p>
                  </div>
                ))}
                      </div>
              
              {/* Audio Player */}
              <div className="mt-8 bg-gray-50 rounded-lg p-4 flex items-center gap-4">
              <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">
                    <Volume2 className="h-3 w-3 text-gray-600" />
                    </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleSpeakToggle('purpose-text', baseLang === 'hi' ? 
                      'इस पाठ का उद्देश्य प्रभावी प्रशिक्षण परिदृश्यों को डिजाइन करने के लिए एक स्पष्ट और सूचित दृष्टिकोण प्रदान करना है।' :
                      baseLang === 'mr' ?
                      'या धड्याचा उद्देश्य प्रभावी प्रशिक्षण परिस्थिती डिझाइन करण्यासाठी स्पष्ट आणि माहितीपूर्ण दृष्टिकोण प्रदान करणे आहे.' :
                      'The purpose of this lesson is to provide a clearer and more informed perspective for designing effective training scenarios.'
                    )}
                  >
                    {speakingBlocks['purpose-text'] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                    {speakingBlocks['purpose-text'] ? t.stop : t.listen}
                </Button>
                  </div>
                  <div className="flex-1 bg-gray-300 rounded-full h-1">
                    <div className="bg-slate-600 h-1 rounded-full" style={{width: '35%'}}></div>
                </div>
                <span className="text-sm text-gray-600">0:36</span>
                <span className="text-sm text-gray-600">1x</span>
                <Volume2 className="h-4 w-4 text-gray-600" />
                <FileDown className="h-4 w-4 text-gray-600" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Image with Text - Image 4 Style */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Text Content */}
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {baseLang === 'hi' ? 'प्रक्रियात्मक न्याय परिदृश्य' : baseLang === 'mr' ? 'प्रक्रियात्मक न्याय परिस्थिती' : 'Procedural Justice Scenarios'}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                      {baseLang === 'hi' ? 
                    'प्रक्रियात्मक न्याय परिदृश्यों में निष्पक्ष और पारदर्शी प्रक्रियाओं पर ध्यान केंद्रित किया जाता है। ये परिदृश्य अधिकारियों को विभिन्न स्थितियों में न्यायसंगत व्यवहार करने के लिए तैयार करते हैं।' :
                        baseLang === 'mr' ?
                    'प्रक्रियात्मक न्याय परिस्थितींमध्ये निष्पक्ष आणि पारदर्शी प्रक्रियांवर लक्ष केंद्रित केले जाते. या परिस्थिती अधिकाऱ्यांना विविध परिस्थितींमध्ये न्यायसंगत वर्तन करण्यासाठी तयार करतात.' :
                    'Procedural justice scenarios focus on fair and transparent processes. These scenarios prepare officers to act justly in various situations, ensuring community trust and effective law enforcement.'
                      }
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
                      onClick={() => handleSpeakToggle('procedural-text', baseLang === 'hi' ? 
                        'प्रक्रियात्मक न्याय परिदृश्यों में निष्पक्ष और पारदर्शी प्रक्रियाओं पर ध्यान केंद्रित किया जाता है।' :
                        baseLang === 'mr' ?
                        'प्रक्रियात्मक न्याय परिस्थितींमध्ये निष्पक्ष आणि पारदर्शी प्रक्रियांवर लक्ष केंद्रित केले जाते.' :
                        'Procedural justice scenarios focus on fair and transparent processes.'
                      )}
                    >
                      {speakingBlocks['procedural-text'] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                      {speakingBlocks['procedural-text'] ? t.stop : t.listen}
                </Button>
                  </div>
                  <div className="flex-1 bg-gray-300 rounded-full h-1">
                    <div className="bg-slate-600 h-1 rounded-full" style={{width: '20%'}}></div>
                      </div>
                  <span className="text-sm text-gray-600">0:04</span>
                  <span className="text-sm text-gray-600">1x</span>
                  <Volume2 className="h-4 w-4 text-gray-600" />
                  <FileDown className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>

              {/* Image/Visual Content */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-slate-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Scale className="w-12 h-12 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-slate-700 font-semibold text-lg mb-2">
                    {baseLang === 'hi' ? 'न्याय' : baseLang === 'mr' ? 'न्याय' : 'Justice'}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {baseLang === 'hi' ? 'निष्पक्ष प्रक्रिया' : baseLang === 'mr' ? 'निष्पक्ष प्रक्रिया' : 'Fair Process'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Video Section */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'प्रशिक्षण वीडियो' : baseLang === 'mr' ? 'प्रशिक्षण व्हिडिओ' : 'Training Video'}
            </h2>
            <p className="text-gray-600 text-center mb-8">
              {baseLang === 'hi' ? 'अंतर-एजेंसी सहयोग और मामला अध्ययनों के उदाहरण देखें' : 
               baseLang === 'mr' ? 'अंतर-एजन्सी सहकार्य आणि केस स्टडीजची उदाहरणे पहा' : 
               'See examples of interagency collaboration and case studies'}
            </p>
            
            <div className="rounded-lg overflow-hidden border bg-white">
              {/* YouTube Video Embed */}
              <div className="w-full">
                <iframe 
                  width="100%" 
                  height="400" 
                  src="https://www.youtube.com/embed/i8OgypRCEqY?si=P84vULsqsJm_dXfF" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                  className="w-full h-[400px] rounded-lg"
                ></iframe>
                  </div>
            </div>
            
            {/* Video Actions */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
                  <Button 
                    variant="outline" 
                className="flex items-center gap-2"
                onClick={() => window.open('https://www.youtube.com/watch?v=i8OgypRCEqY', '_blank')}
                  >
                    <Play className="h-4 w-4" />
                {baseLang === 'hi' ? 'YouTube पर देखें' : baseLang === 'mr' ? 'YouTube वर पहा' : 'Watch on YouTube'}
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => window.open('https://www.youtube.com/watch?v=i8OgypRCEqY', '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
                {baseLang === 'hi' ? 'बाहरी लिंक' : baseLang === 'mr' ? 'बाह्य दुवा' : 'External Link'}
                  </Button>
            </div>
          </div>
        </section>

        {/* Section 6: Interagency Collaboration with Timeline */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'अंतर-एजेंसी सहयोग' : baseLang === 'mr' ? 'अंतर-एजन्सी सहकार्य' : 'Interagency Collaboration'}
            </h2>
            
            {/* Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Probation */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <div className="w-16 h-16 bg-slate-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-white" />
            </div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">
                    {baseLang === 'hi' ? 'प्रोबेशन' : baseLang === 'mr' ? 'प्रोबेशन' : 'Probation'}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {baseLang === 'hi' ? 'किशोर न्याय सुधार में सहयोग' : 
                     baseLang === 'mr' ? 'किशोर न्याय सुधारात सहकार्य' : 
                     'Collaboration in juvenile justice reform'}
                  </p>
          </div>
              </div>

              {/* Schools */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <div className="w-16 h-16 bg-slate-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <School className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">
                    {baseLang === 'hi' ? 'स्कूल' : baseLang === 'mr' ? 'शाळा' : 'Schools'}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {baseLang === 'hi' ? 'शैक्षिक संस्थानों के साथ सहयोग' : 
                     baseLang === 'mr' ? 'शैक्षणिक संस्थांसोबत सहकार्य' : 
                     'Collaboration with educational institutions'}
                  </p>
                </div>
              </div>

              {/* Advocacy Groups */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <div className="w-16 h-16 bg-slate-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">
                    {baseLang === 'hi' ? 'वकालत समूह' : baseLang === 'mr' ? 'वकालत गट' : 'Advocacy Groups'}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {baseLang === 'hi' ? 'सामुदायिक संगठनों के साथ सहयोग' : 
                     baseLang === 'mr' ? 'सामुदायिक संघटनांसोबत सहकार्य' : 
                     'Collaboration with community organizations'}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                {baseLang === 'hi' ? 'सहयोग टाइमलाइन' : baseLang === 'mr' ? 'सहकार्य टाइमलाइन' : 'Collaboration Timeline'}
              </h3>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-300"></div>
                
                {/* Timeline Items */}
            <div className="space-y-6">
              {[
                {
                      phase: baseLang === 'hi' ? 'चरण 1: जरूरतों की पहचान' : baseLang === 'mr' ? 'टप्पा 1: गरजांची ओळख' : 'Phase 1: Identify Needs',
                      description: baseLang === 'hi' ? 'सभी एजेंसियों की प्रशिक्षण आवश्यकताओं का आकलन' : baseLang === 'mr' ? 'सर्व एजन्सींच्या प्रशिक्षण गरजांचे मूल्यांकन' : 'Assess training needs across all agencies',
                      color: 'slate'
                    },
                    {
                      phase: baseLang === 'hi' ? 'चरण 2: संसाधन साझा करना' : baseLang === 'mr' ? 'टप्पा 2: संसाधने सामायिक करणे' : 'Phase 2: Share Resources',
                      description: baseLang === 'hi' ? 'प्रशिक्षण सामग्री और विशेषज्ञता साझा करें' : baseLang === 'mr' ? 'प्रशिक्षण साहित्य आणि कौशल्य सामायिक करा' : 'Share training materials and expertise',
                      color: 'slate'
                    },
                    {
                      phase: baseLang === 'hi' ? 'चरण 3: संयुक्त प्रशिक्षण' : baseLang === 'mr' ? 'टप्पा 3: संयुक्त प्रशिक्षण' : 'Phase 3: Joint Training',
                      description: baseLang === 'hi' ? 'क्रॉस-एजेंसी प्रशिक्षण सत्र आयोजित करें' : baseLang === 'mr' ? 'क्रॉस-एजन्सी प्रशिक्षण सत्रे आयोजित करा' : 'Conduct cross-agency training sessions',
                      color: 'slate'
                    },
                    {
                      phase: baseLang === 'hi' ? 'चरण 4: मूल्यांकन' : baseLang === 'mr' ? 'टप्पा 4: मूल्यांकन' : 'Phase 4: Evaluation',
                      description: baseLang === 'hi' ? 'परिणामों का मूल्यांकन और सुधार करें' : baseLang === 'mr' ? 'परिणामांचे मूल्यांकन आणि सुधार करा' : 'Evaluate outcomes and improve',
                      color: 'slate'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="relative pl-20">
                      <div className={`absolute left-6 w-5 h-5 rounded-full bg-${item.color}-500 border-4 border-white`}></div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h4 className="font-semibold text-gray-800 mb-1">{item.phase}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6.5: Step-by-Step Process Flow */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'परिदृश्य डिजाइन प्रक्रिया' : baseLang === 'mr' ? 'परिस्थिती डिझाइन प्रक्रिया' : 'Scenario Design Process'}
            </h2>
            
            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: baseLang === 'hi' ? 'समस्या की पहचान' : baseLang === 'mr' ? 'समस्येची ओळख' : 'Identify the Problem',
                  description: baseLang === 'hi' ? 'वास्तविक दुनिया की चुनौती या स्थिति को परिभाषित करें जिसे अधिकारियों का सामना करना पड़ सकता है' : baseLang === 'mr' ? 'वास्तविक जगातील आव्हान किंवा परिस्थिती परिभाषित करा ज्याचा अधिकाऱ्यांना सामना करावा लागू शकतो' : 'Define the real-world challenge or situation officers may face',
                  IconComponent: Target
                },
                {
                  step: 2,
                  title: baseLang === 'hi' ? 'सीखने के उद्देश्य निर्धारित करें' : baseLang === 'mr' ? 'शिकण्याचे उद्दिष्ट निश्चित करा' : 'Set Learning Objectives',
                  description: baseLang === 'hi' ? 'स्पष्ट, मापने योग्य लक्ष्य निर्धारित करें जो अधिकारियों को प्राप्त करना चाहिए' : baseLang === 'mr' ? 'स्पष्ट, मोजमाप करण्यायोग्य लक्ष्ये निश्चित करा जी अधिकाऱ्यांनी साध्य केली पाहिजे' : 'Establish clear, measurable goals officers should achieve',
                  IconComponent: CheckCircle
                },
                {
                  step: 3,
                  title: baseLang === 'hi' ? 'परिदृश्य विकसित करें' : baseLang === 'mr' ? 'परिस्थिती विकसित करा' : 'Develop the Scenario',
                  description: baseLang === 'hi' ? 'यथार्थवादी विवरण, पात्र और संदर्भ बनाएं' : baseLang === 'mr' ? 'वास्तववादी वर्णन, पात्रे आणि संदर्भ तयार करा' : 'Create realistic details, characters, and context',
                  IconComponent: Edit3
                },
                {
                  step: 4,
                  title: baseLang === 'hi' ? 'निर्णय बिंदु जोड़ें' : baseLang === 'mr' ? 'निर्णय बिंदू जोडा' : 'Add Decision Points',
                  description: baseLang === 'hi' ? 'ऐसे क्षण शामिल करें जहां अधिकारियों को महत्वपूर्ण निर्णय लेने चाहिए' : baseLang === 'mr' ? 'असे क्षण समाविष्ट करा जिथे अधिकाऱ्यांनी महत्त्वपूर्ण निर्णय घ्यावे' : 'Include moments where officers must make critical decisions',
                  IconComponent: Shuffle
                },
                {
                  step: 5,
                  title: baseLang === 'hi' ? 'परीक्षण और सुधार' : baseLang === 'mr' ? 'चाचणी आणि सुधारणा' : 'Test and Refine',
                  description: baseLang === 'hi' ? 'परिदृश्य को पायलट करें और प्रतिक्रिया के आधार पर समायोजित करें' : baseLang === 'mr' ? 'परिस्थिती पायलट करा आणि प्रतिसादाच्या आधारावर समायोजित करा' : 'Pilot the scenario and adjust based on feedback',
                  IconComponent: RefreshCw
                }
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="flex items-start gap-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-6 border border-slate-200">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center text-white font-bold">
                        {item.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <item.IconComponent className="w-6 h-6 text-slate-600" />
                        <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                      </div>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                    {idx < 4 && (
                      <div className="absolute left-10 top-full w-0.5 h-4 bg-slate-300"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Case Studies with Accordion */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'मामला अध्ययन' : baseLang === 'mr' ? 'केस स्टडी' : 'Case Studies'}
            </h2>
            
            <div className="space-y-6">
              {/* DOJ Civil Rights Cases */}
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Scale className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">
                      {baseLang === 'hi' ? 'DOJ नागरिक अधिकार मामले' : baseLang === 'mr' ? 'DOJ नागरिक अधिकार केसेस' : 'DOJ Civil Rights Cases'}
                  </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {baseLang === 'hi' ? 
                        'वास्तविक DOJ नागरिक अधिकार मामलों का अध्ययन करके अधिकारी सीखते हैं कि कैसे न्यायसंगत और प्रभावी कानून प्रवर्तन करें।' :
                        baseLang === 'mr' ?
                        'वास्तविक DOJ नागरिक अधिकार केसेसचा अभ्यास करून अधिकारी शिकतात की कसे न्यायसंगत आणि प्रभावी कायदा अंमलबजावणी करावे.' :
                        'By studying real DOJ civil rights cases, officers learn how to conduct fair and effective law enforcement.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Juvenile Justice Reform */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <UserCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">
                      {baseLang === 'hi' ? 'किशोर न्याय सुधार' : baseLang === 'mr' ? 'किशोर न्याय सुधार' : 'Juvenile Justice Reform'}
                    </h3>
                    <p className="text-blue-700 leading-relaxed">
                      {baseLang === 'hi' ? 
                        'किशोर न्याय सुधार के मामलों के माध्यम से अधिकारी युवाओं के साथ काम करने के बेहतर तरीके सीखते हैं।' :
                        baseLang === 'mr' ?
                        'किशोर न्याय सुधाराच्या केसेसद्वारे अधिकारी युवकांसोबत काम करण्याचे चांगले मार्ग शिकतात.' :
                        'Through juvenile justice reform cases, officers learn better ways to work with young people.'
                      }
                    </p>
                  </div>
                </div>
              </div>
              </div>

            {/* Accordion - Detailed Case Studies */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {baseLang === 'hi' ? 'विस्तृत मामला अध्ययन' : baseLang === 'mr' ? 'तपशीलवार केस स्टडी' : 'Detailed Case Studies'}
              </h3>
              <div className="space-y-3">
                {[
                  {
                    title: baseLang === 'hi' ? 'केस 1: सामुदायिक पुलिसिंग सफलता' : baseLang === 'mr' ? 'केस 1: सामुदायिक पोलिसिंग यश' : 'Case 1: Community Policing Success',
                    content: baseLang === 'hi' ? 'एक शहर में सामुदायिक पुलिसिंग कार्यक्रम ने अपराध दर में 40% की कमी और सामुदायिक विश्वास में महत्वपूर्ण वृद्धि की। प्रमुख तत्वों में नियमित सामुदायिक बैठकें, युवा सहभागिता कार्यक्रम और पारदर्शी संचार शामिल थे।' : 
                             baseLang === 'mr' ? 'एका शहरातील सामुदायिक पोलिसिंग कार्यक्रमाने गुन्हे दरात 40% घट आणि सामुदायिक विश्वासात लक्षणीय वाढ केली. मुख्य घटकांमध्ये नियमित सामुदायिक सभा, युवा सहभाग कार्यक्रम आणि पारदर्शी संवाद समाविष्ट होते.' :
                             'A city\'s community policing program reduced crime rates by 40% and increased community trust significantly. Key elements included regular community meetings, youth engagement programs, and transparent communication.'
                  },
                  {
                    title: baseLang === 'hi' ? 'केस 2: संकट हस्तक्षेप प्रशिक्षण' : baseLang === 'mr' ? 'केस 2: संकट हस्तक्षेप प्रशिक्षण' : 'Case 2: Crisis Intervention Training',
                    content: baseLang === 'hi' ? 'एक पुलिस विभाग ने मानसिक स्वास्थ्य संकट हस्तक्षेप प्रशिक्षण लागू किया, जिसके परिणामस्वरूप मानसिक स्वास्थ्य कॉल के दौरान बल के उपयोग में 60% की कमी आई। प्रशिक्षण में डी-एस्केलेशन तकनीक, मानसिक स्वास्थ्य संसाधनों की समझ और मानसिक स्वास्थ्य पेशेवरों के साथ साझेदारी शामिल थी।' :
                             baseLang === 'mr' ? 'एका पोलिस विभागाने मानसिक आरोग्य संकट हस्तक्षेप प्रशिक्षण लागू केले, ज्यामुळे मानसिक आरोग्य कॉल दरम्यान बळाच्या वापरात 60% घट झाली. प्रशिक्षणात डी-एस्केलेशन तंत्र, मानसिक आरोग्य संसाधनांची समज आणि मानसिक आरोग्य व्यावसायिकांसोबत भागीदारी समाविष्ट होती.' :
                             'A police department implemented mental health crisis intervention training, resulting in a 60% reduction in use of force during mental health calls. Training included de-escalation techniques, understanding of mental health resources, and partnerships with mental health professionals.'
                  },
                  {
                    title: baseLang === 'hi' ? 'केस 3: युवा डायवर्जन कार्यक्रम' : baseLang === 'mr' ? 'केस 3: युवा डायव्हर्जन कार्यक्रम' : 'Case 3: Youth Diversion Program',
                    content: baseLang === 'hi' ? 'एक युवा डायवर्जन कार्यक्रम ने पहली बार अपराधियों को आपराधिक न्याय प्रणाली से परामर्श, सामुदायिक सेवा और शैक्षिक समर्थन में स्थानांतरित किया। कार्यक्रम ने तीन साल की अवधि में पुनरावृत्ति दर को 70% कम कर दिया।' :
                             baseLang === 'mr' ? 'एका युवा डायव्हर्जन कार्यक्रमाने पहिल्यांदा गुन्हेगारांना गुन्हेगारी न्याय प्रणालीतून सल्ला, सामुदायिक सेवा आणि शैक्षणिक समर्थनाकडे वळवले. कार्यक्रमाने तीन वर्षांच्या कालावधीत पुनरावृत्ती दर 70% कमी केला.' :
                             'A youth diversion program redirected first-time offenders from the criminal justice system to counseling, community service, and educational support. The program reduced recidivism rates by 70% over a three-year period.'
                  }
                ].map((item, idx) => {
                  const [isOpen, setIsOpen] = React.useState(false);
                  return (
                    <div key={idx} className="border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                      >
                        <span className="font-semibold text-gray-800">{item.title}</span>
                        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                      </button>
                      {isOpen && (
                        <div className="p-4 bg-white border-t border-gray-200">
                          <p className="text-gray-700 leading-relaxed">{item.content}</p>
                  </div>
                      )}
                </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Section 7.5: Flashcards - Key Concepts */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'मुख्य अवधारणाएं' : baseLang === 'mr' ? 'मुख्य संकल्पना' : 'Key Concepts'}
            </h2>
            <p className="text-gray-600 text-center mb-8">
              {baseLang === 'hi' ? 'फ्लिप करने के लिए कार्ड पर क्लिक करें' : 
               baseLang === 'mr' ? 'फ्लिप करण्यासाठी कार्डवर क्लिक करा' : 
               'Click on cards to flip'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  front: baseLang === 'hi' ? 'प्रक्रियात्मक न्याय' : baseLang === 'mr' ? 'प्रक्रियात्मक न्याय' : 'Procedural Justice',
                  back: baseLang === 'hi' ? 'निष्पक्षता, सम्मान और निर्णय लेने में आवाज के माध्यम से पुलिस की वैधता को बढ़ावा देना' : 
                        baseLang === 'mr' ? 'निष्पक्षता, सन्मान आणि निर्णय घेण्यात आवाज याद्वारे पोलिसांची वैधता वाढवणे' :
                        'Promoting police legitimacy through fairness, respect, and voice in decision-making',
                  color: 'blue',
                  IconComponent: Scale
                },
                {
                  front: baseLang === 'hi' ? 'डी-एस्केलेशन' : baseLang === 'mr' ? 'डी-एस्केलेशन' : 'De-escalation',
                  back: baseLang === 'hi' ? 'संभावित हिंसक स्थितियों को कम करने के लिए संचार और रणनीतियों का उपयोग' : 
                        baseLang === 'mr' ? 'संभाव्य हिंसक परिस्थिती कमी करण्यासाठी संवाद आणि धोरणांचा वापर' :
                        'Using communication and strategies to reduce the intensity of potentially violent situations',
                  color: 'green',
                  IconComponent: MessageSquare
                },
                {
                  front: baseLang === 'hi' ? 'सांस्कृतिक क्षमता' : baseLang === 'mr' ? 'सांस्कृतिक क्षमता' : 'Cultural Competency',
                  back: baseLang === 'hi' ? 'विभिन्न पृष्ठभूमि के व्यक्तियों के साथ प्रभावी ढंग से बातचीत करने की क्षमता' : 
                        baseLang === 'mr' ? 'विविध पार्श्वभूमीच्या व्यक्तींसोबत प्रभावीपणे संवाद साधण्याची क्षमता' :
                        'The ability to interact effectively with people from diverse backgrounds',
                  color: 'purple',
                  IconComponent: Users
                },
                {
                  front: baseLang === 'hi' ? 'ट्रॉमा-सूचित दृष्टिकोण' : baseLang === 'mr' ? 'आघात-माहिती दृष्टिकोन' : 'Trauma-Informed Approach',
                  back: baseLang === 'hi' ? 'व्यक्तियों पर आघात के प्रभाव को पहचानना और प्रतिक्रियाओं में संवेदनशील रहना' : 
                        baseLang === 'mr' ? 'व्यक्तींवर आघाताचा प्रभाव ओळखणे आणि प्रतिक्रियांमध्ये संवेदनशील असणे' :
                        'Recognizing the impact of trauma on individuals and being sensitive in responses',
                  color: 'orange',
                  IconComponent: Heart
                }
              ].map((card, idx) => {
                const [isFlipped, setIsFlipped] = React.useState(false);
                return (
                  <div key={idx} className="h-48 perspective-1000">
                    <div
                      onClick={() => setIsFlipped(!isFlipped)}
                      className={`relative h-full w-full transition-transform duration-500 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
                      style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                    >
                      {/* Front */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br from-${card.color}-50 to-${card.color}-100 border-2 border-${card.color}-300 rounded-xl p-6 flex flex-col items-center justify-center backface-hidden`}
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <card.IconComponent className={`w-12 h-12 text-${card.color}-600 mb-3`} strokeWidth={1.5} />
                        <h3 className={`text-xl font-bold text-${card.color}-800 text-center`}>{card.front}</h3>
                    </div>
                      {/* Back */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br from-${card.color}-100 to-${card.color}-50 border-2 border-${card.color}-300 rounded-xl p-6 flex items-center justify-center backface-hidden`}
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      >
                        <p className={`text-${card.color}-800 text-center text-sm`}>{card.back}</p>
                  </div>
                </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* Section 8: Summary */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-2xl overflow-hidden">
            {/* Yellow bar separator */}
            <div className="h-1 bg-yellow-400"></div>
            
            <div className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                {baseLang === 'hi' ? 'सारांश' : baseLang === 'mr' ? 'सारांश' : 'SUMMARY'}
              </h2>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <p className="text-white text-lg leading-relaxed mb-6">
                  {baseLang === 'hi' ? 
                    'इस पाठ में आपने सीखा कि कैसे प्रभावी प्रशिक्षण कार्यक्रम विकसित करें जो वास्तविक दुनिया की चुनौतियों को दर्शाते हैं। प्रक्रियात्मक न्याय परिदृश्य, अंतर-एजेंसी सहयोग, और वास्तविक मामला अध्ययनों के माध्यम से अधिकारी बेहतर तैयारी के साथ काम कर सकते हैं।' :
                    baseLang === 'mr' ?
                    'या धड्यात तुम्ही शिकलात की कसे प्रभावी प्रशिक्षण कार्यक्रम विकसित करावे जे वास्तविक जगाच्या आव्हानांना प्रतिबिंबित करतात. प्रक्रियात्मक न्याय परिस्थिती, अंतर-एजन्सी सहकार्य, आणि वास्तविक केस स्टडीजद्वारे अधिकारी चांगल्या तयारीसह काम करू शकतात.' :
                    'In this lesson, you learned how to develop effective training programs that reflect real-world challenges. Through procedural justice scenarios, interagency collaboration, and real case studies, officers can work with better preparation and understanding.'
                  }
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
                      onClick={() => handleSpeakToggle('summary-text', baseLang === 'hi' ? 
                        'इस पाठ में आपने सीखा कि कैसे प्रभावी प्रशिक्षण कार्यक्रम विकसित करें जो वास्तविक दुनिया की चुनौतियों को दर्शाते हैं।' :
                        baseLang === 'mr' ?
                        'या धड्यात तुम्ही शिकलात की कसे प्रभावी प्रशिक्षण कार्यक्रम विकसित करावे जे वास्तविक जगाच्या आव्हानांना प्रतिबिंबित करतात.' :
                        'In this lesson, you learned how to develop effective training programs that reflect real-world challenges.'
                      )}
                    >
                      {speakingBlocks['summary-text'] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                      {speakingBlocks['summary-text'] ? t.stop : t.listen}
                    </Button>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '40%'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">0:52</span>
                  <span className="text-sm text-gray-600">1x</span>
                  <Volume2 className="h-4 w-4 text-gray-600" />
                  <FileDown className="h-4 w-4 text-gray-600" />
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
              {baseLang === 'hi' ? 'मॉड्यूल पूरा करने के लिए तैयार हैं?' : 
               baseLang === 'mr' ? 'मॉड्यूल पूर्ण करण्यास तयार आहात?' : 
               'Ready to complete the module?'}
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

      {/* Full Screen Modal */}
      <Dialog open={isFullScreenModalOpen} onOpenChange={setIsFullScreenModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader className="pb-4 border-b">
            <div className="flex items-center justify-between gap-3">
              <DialogTitle className="text-xl font-bold flex items-center gap-3 min-w-0">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-pink-700 text-sm">💡</span>
                <span className="truncate">{t.introTitle}</span>
              </DialogTitle>
              <div className="flex items-center gap-2 flex-wrap bg-gray-50 border rounded-lg px-3 py-2">
                <label className="text-xs text-gray-600">Language</label>
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="border rounded px-2 py-1 text-sm h-8"
                >
                  {languageOptions.map(opt => (
                    <option key={opt.code} value={opt.code}>{opt.label}</option>
                  ))}
                </select>
                <label className="text-xs text-gray-600">Voice</label>
                <select
                  value={selectedVoiceURI}
                  onChange={(e) => setSelectedVoiceURI(e.target.value)}
                  className="border rounded px-2 py-1 text-sm h-8 max-w-[260px]"
                >
                  {voices
                    .filter(v => v.lang === selectedLang || v.lang?.startsWith(selectedLang.split('-')[0]))
                    .map(v => (
                      <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>
                    ))}
                  {voices.length === 0 && (<option value="">System default</option>)}
                </select>
                <Button variant="outline" size="sm" className="h-8" onClick={() => setIsFullScreenModalOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Modal Content - Same as main content but adapted for modal */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{t.introTitle}</h1>
                <p className="text-lg text-gray-600 leading-relaxed">{t.introSubtitle}</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{t.learnTitle}</h2>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 leading-relaxed">{t.paragraph}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{t.outcomesTitle}</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {t.outcomes.map((line, i) => (<li key={i}>{line}</li>))}
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{t.toolsTitle}</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {t.tools.map((line, i) => (<li key={i}>{line}</li>))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LessonMod3Protection;

