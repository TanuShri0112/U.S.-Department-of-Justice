import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Volume2, Maximize2, Play, Pause, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Section3Video from '@/components/lessons/Section3Video';
import IncomeGrowthChart from '@/components/lessons/IncomeGrowthChart';
import DragDropChallenge from '@/components/lessons/DragDropChallenge';
import VoiceInteraction from '@/components/lessons/VoiceInteraction';

const LessonMod2 = () => {
  const navigate = useNavigate();
  const [speakingBlocks, setSpeakingBlocks] = useState({});
  const [voices, setVoices] = useState([]);
  const [selectedLang, setSelectedLang] = useState('en-US');
  const [selectedVoiceURI, setSelectedVoiceURI] = useState('');
  const [isFullScreenModalOpen, setIsFullScreenModalOpen] = useState(false);
  const textRef = useRef(null);

  // Language options matching PreviewModal
  const languageOptions = React.useMemo(() => ([
    { code: 'en-US', label: 'English (US)' },
    { code: 'hi-IN', label: 'हिन्दी (Hindi)' },
    { code: 'mr-IN', label: 'मराठी (Marathi)' }
  ]), []);

  // UI text based on selected language
  const uiText = React.useMemo(() => {
    const map = {
      'en': { preview: 'Preview', language: 'Language', voice: 'Voice', listen: 'Listen', stop: 'Stop', download: 'Download' },
      'hi': { preview: 'पूर्वावलोकन', language: 'भाषा', voice: 'आवाज़', listen: 'सुनें', stop: 'रोकें', download: 'डाउनलोड' },
      'mr': { preview: 'पूर्वावलोकन', language: 'भाषा', voice: 'आवाज', listen: 'ऐका', stop: 'थांबवा', download: 'डाउनलोड' }
    };
    const key = (selectedLang || 'en-US').split('-')[0];
    return map[key] || map['en'];
  }, [selectedLang]);

  const handleBackToModules = () => {
    navigate(-1); // Go back to the previous page
  };

  // Load voices when component mounts
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const load = () => {
      const v = synth.getVoices();
      setVoices(v);
      // Default selected voice for current lang
      const defaultVoice = v.find(voice => voice.lang === selectedLang) || v.find(voice => voice.lang?.startsWith(selectedLang.split('-')[0])) || v[0];
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
    const voice = voices.find(v => v.voiceURI === selectedVoiceURI) || voices.find(v => v.lang === selectedLang);
    if (voice) utter.voice = voice;
    utter.onend = () => setSpeakingBlocks(prev => ({ ...prev, [blockKey]: false }));
    setSpeakingBlocks(prev => ({ ...prev, [blockKey]: true }));
    synth.speak(utter);
  };

  const handleFullScreen = () => {
    setIsFullScreenModalOpen(true);
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
            Back to Modules
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Section 1: Introduction */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Module 2: Stakeholder Analysis & Needs Assessment
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Identifying key stakeholders and assessing training needs in law enforcement
            </p>
          </div>

          {/* Video Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="aspect-video w-full max-w-4xl mx-auto">
              <iframe
                className="w-full h-full rounded-xl shadow-lg"
                src="https://www.youtube.com/embed/akZd7s_Kxms?si=tOk4x9ShMo1YZZMZ"
                title="Stakeholder Analysis & Needs Assessment Overview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Watch this overview to understand stakeholder analysis and needs assessment in law enforcement training
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
                 
                 {/* Full Screen Button */}
                 <Button
                   onClick={handleFullScreen}
                   variant="outline"
                   size="icon"
                   className="p-2"
                 >
                   <Maximize2 className="h-4 w-4" />
                 </Button>
               </div>
            </div>
            
                         <div className="bg-gray-50 rounded-lg p-6 mb-6">
               <div className="flex items-center justify-end mb-3">
                 <Button 
                   size="sm" 
                   variant="outline" 
                   className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" 
                   onClick={() => handleSpeakToggle('lesson-text', 'In this comprehensive module, you\'ll learn how to identify key stakeholders in law enforcement training and conduct thorough needs assessments. We\'ll explore skill gap analysis, training audits, and community consultation methods that ensure training programs meet real-world requirements and public expectations.')}
                 >
                   {speakingBlocks['lesson-text'] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                   {speakingBlocks['lesson-text'] ? uiText.stop : uiText.listen}
                 </Button>
               </div>
               <p className="text-gray-700 leading-relaxed">
                 In this comprehensive module, you'll learn how to identify key stakeholders in 
                 law enforcement training and conduct thorough needs assessments. We'll explore 
                 skill gap analysis, training audits, and community consultation methods that 
                 ensure training programs meet real-world requirements and public expectations.
               </p>
             </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Stakeholder Analysis</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Community policing partnerships</li>
                  <li>• De-escalation skill development</li>
                  <li>• Youth interaction training</li>
                  <li>• Public accountability measures</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">Needs Assessment</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Training audit methodologies</li>
                  <li>• Field data analysis techniques</li>
                  <li>• Community consultation processes</li>
                  <li>• Performance gap identification</li>
                </ul>
              </div>
                         </div>
           </div>
         </section>

         {/* Section 2: Narration Language Selection */}
         <section className="max-w-4xl mx-auto mb-12">
           <div className="bg-white rounded-2xl shadow-lg p-8">
             <h2 className="text-2xl font-semibold text-gray-800 mb-6">
               Section 2: Training Topics Overview
             </h2>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* Topic 2.1: Identifying Skill Gaps */}
               <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
                 <div className="flex items-center mb-4">
                   <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                     <span className="text-white text-lg">🎯</span>
                   </div>
                   <div>
                     <h3 className="text-lg font-semibold text-blue-800">Topic 2.1</h3>
                     <p className="text-sm text-blue-600">Skill Gap Analysis</p>
                   </div>
                 </div>
                 <div className="space-y-3">
                   <div className="bg-white rounded-lg p-3 shadow-sm">
                     <h4 className="font-medium text-gray-800 mb-2">Community Policing</h4>
                     <p className="text-sm text-gray-600">Building trust and partnerships with community members</p>
                   </div>
                   <div className="bg-white rounded-lg p-3 shadow-sm">
                     <h4 className="font-medium text-gray-800 mb-2">De-escalation</h4>
                     <p className="text-sm text-gray-600">Techniques for reducing tension and conflict</p>
                   </div>
                   <div className="bg-white rounded-lg p-3 shadow-sm">
                     <h4 className="font-medium text-gray-800 mb-2">Youth Interaction</h4>
                     <p className="text-sm text-gray-600">Effective communication with young people</p>
                   </div>
                 </div>
               </div>

               {/* Topic 2.2: Training Audits */}
               <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
                 <div className="flex items-center mb-4">
                   <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                     <span className="text-white text-lg">📊</span>
                   </div>
                   <div>
                     <h3 className="text-lg font-semibold text-green-800">Topic 2.2</h3>
                     <p className="text-sm text-green-600">Training Audits</p>
                   </div>
                 </div>
                 <div className="space-y-3">
                   <div className="bg-white rounded-lg p-3 shadow-sm">
                     <h4 className="font-medium text-gray-800 mb-2">Field Data Collection</h4>
                     <p className="text-sm text-gray-600">Gathering real-world performance data</p>
                   </div>
                   <div className="bg-white rounded-lg p-3 shadow-sm">
                     <h4 className="font-medium text-gray-800 mb-2">Performance Metrics</h4>
                     <p className="text-sm text-gray-600">Measuring training effectiveness</p>
                   </div>
                   <div className="bg-white rounded-lg p-3 shadow-sm">
                     <h4 className="font-medium text-gray-800 mb-2">Audit Reports</h4>
                     <p className="text-sm text-gray-600">Documenting findings and recommendations</p>
                   </div>
                 </div>
               </div>

               {/* Topic 2.3: Community Consultation */}
               <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl p-6 border border-purple-200">
                 <div className="flex items-center mb-4">
                   <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                     <span className="text-white text-lg">🤝</span>
                   </div>
                   <div>
                     <h3 className="text-lg font-semibold text-purple-800">Topic 2.3</h3>
                     <p className="text-sm text-purple-600">Community Consultation</p>
                   </div>
                 </div>
                 <div className="space-y-3">
                   <div className="bg-white rounded-lg p-3 shadow-sm">
                     <h4 className="font-medium text-gray-800 mb-2">Public Input</h4>
                     <p className="text-sm text-gray-600">Engaging community in training design</p>
                   </div>
                   <div className="bg-white rounded-lg p-3 shadow-sm">
                     <h4 className="font-medium text-gray-800 mb-2">Accountability</h4>
                     <p className="text-sm text-gray-600">Ensuring transparency in training processes</p>
                   </div>
                   <div className="bg-white rounded-lg p-3 shadow-sm">
                     <h4 className="font-medium text-gray-800 mb-2">Feedback Loops</h4>
                     <p className="text-sm text-gray-600">Continuous improvement mechanisms</p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </section>

         {/* Section 3: Video Background */}
         <section className="max-w-4xl mx-auto mb-12">
           <Section3Video />
         </section>

         {/* Section 4: Income Growth Chart */}
         <section className="max-w-4xl mx-auto mb-12">
           <IncomeGrowthChart />
         </section>

         {/* Section 5: Drag & Drop Challenge */}
         <section className="max-w-4xl mx-auto mb-12">
           <DragDropChallenge />
         </section>

         {/* Section 6: Voice Interaction */}
         <section className="max-w-4xl mx-auto mb-12">
           <VoiceInteraction />
         </section>
       </div>
       
       {/* Full Screen Modal */}
       <Dialog open={isFullScreenModalOpen} onOpenChange={setIsFullScreenModalOpen}>
         <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
           <DialogHeader className="pb-4 border-b">
             <div className="flex items-center justify-between gap-3">
               <DialogTitle className="text-xl font-bold flex items-center gap-3 min-w-0">
                 <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm">👁️</span>
                 <span className="truncate">Module 2: Stakeholder Analysis & Needs Assessment</span>
               </DialogTitle>
               <div className="flex items-center gap-2 flex-wrap bg-gray-50 border rounded-lg px-3 py-2">
                 <label className="text-xs text-gray-600" title={uiText.language}>
                   {uiText.language}
                 </label>
                 <select
                   value={selectedLang}
                   onChange={(e) => setSelectedLang(e.target.value)}
                   className="border rounded px-2 py-1 text-sm h-8"
                   title={uiText.language}
                 >
                   {languageOptions.map(opt => (
                     <option key={opt.code} value={opt.code}>{opt.label}</option>
                   ))}
                 </select>
                 <label className="text-xs text-gray-600">
                   {uiText.voice}
                 </label>
                 <select
                   value={selectedVoiceURI}
                   onChange={(e) => setSelectedVoiceURI(e.target.value)}
                   className="border rounded px-2 py-1 text-sm h-8 max-w-[260px]"
                   title={uiText.voice}
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
                 <Button variant="outline" size="sm" className="h-8" onClick={() => setIsFullScreenModalOpen(false)}>
                   <X className="h-4 w-4" />
                 </Button>
               </div>
             </div>
           </DialogHeader>
           
           <div className="flex-1 overflow-y-auto py-8 px-6">
             <div className="max-w-4xl mx-auto">
               <div className="text-center mb-8">
                 <h1 className="text-4xl font-bold text-gray-900 mb-4">
                   Module 2: Stakeholder Analysis & Needs Assessment
                 </h1>
                 <p className="text-xl text-gray-600 leading-relaxed">
                   Identifying key stakeholders and assessing training needs in law enforcement
                 </p>
               </div>
               
               <div className="bg-gray-50 rounded-lg p-8 mb-8">
                 <div className="flex items-center justify-end mb-4">
                   <Button 
                     size="sm" 
                     variant="outline" 
                     className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" 
                     onClick={() => handleSpeakToggle('modal-lesson-text', 'In this comprehensive module, you\'ll learn how to identify key stakeholders in law enforcement training and conduct thorough needs assessments. We\'ll explore skill gap analysis, training audits, and community consultation methods that ensure training programs meet real-world requirements and public expectations.')}
                   >
                     {speakingBlocks['modal-lesson-text'] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                     {speakingBlocks['modal-lesson-text'] ? uiText.stop : uiText.listen}
                   </Button>
                 </div>
                 <p className="text-gray-700 leading-relaxed text-lg">
                   In this comprehensive module, you'll learn how to identify key stakeholders in 
                   law enforcement training and conduct thorough needs assessments. We'll explore 
                   skill gap analysis, training audits, and community consultation methods that 
                   ensure training programs meet real-world requirements and public expectations.
                 </p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-blue-50 rounded-lg p-6">
                   <h3 className="font-semibold text-blue-800 mb-3 text-lg">Stakeholder Analysis</h3>
                   <ul className="text-blue-700 space-y-2">
                     <li className="flex items-start">
                       <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                       <span>Community policing partnerships</span>
                     </li>
                     <li className="flex items-start">
                       <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                       <span>De-escalation skill development</span>
                     </li>
                     <li className="flex items-start">
                       <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                       <span>Youth interaction training</span>
                     </li>
                     <li className="flex items-start">
                       <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                       <span>Public accountability measures</span>
                     </li>
                   </ul>
                 </div>
                 <div className="bg-green-50 rounded-lg p-6">
                   <h3 className="font-semibold text-green-800 mb-3 text-lg">Needs Assessment</h3>
                   <ul className="text-green-700 space-y-2">
                     <li className="flex items-start">
                       <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                       <span>Training audit methodologies</span>
                     </li>
                     <li className="flex items-start">
                       <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                       <span>Field data analysis techniques</span>
                     </li>
                     <li className="flex items-start">
                       <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                       <span>Community consultation processes</span>
                     </li>
                     <li className="flex items-start">
                       <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                       <span>Performance gap identification</span>
                     </li>
                   </ul>
                 </div>
               </div>
              
               {/* Section 2 in Modal */}
               <div className="border-t pt-8 mt-8">
                   <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                     Section 2: Training Topics Overview
                   </h2>
                   
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {/* Topic 2.1: Identifying Skill Gaps */}
                     <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
                       <div className="flex items-center mb-4">
                         <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                           <span className="text-white text-lg">🎯</span>
                         </div>
                         <div>
                           <h3 className="text-lg font-semibold text-blue-800">Topic 2.1</h3>
                           <p className="text-sm text-blue-600">Skill Gap Analysis</p>
                         </div>
                       </div>
                       <div className="space-y-3">
                         <div className="bg-white rounded-lg p-3 shadow-sm">
                           <h4 className="font-medium text-gray-800 mb-2">Community Policing</h4>
                           <p className="text-sm text-gray-600">Building trust and partnerships with community members</p>
                         </div>
                         <div className="bg-white rounded-lg p-3 shadow-sm">
                           <h4 className="font-medium text-gray-800 mb-2">De-escalation</h4>
                           <p className="text-sm text-gray-600">Techniques for reducing tension and conflict</p>
                         </div>
                         <div className="bg-white rounded-lg p-3 shadow-sm">
                           <h4 className="font-medium text-gray-800 mb-2">Youth Interaction</h4>
                           <p className="text-sm text-gray-600">Effective communication with young people</p>
                         </div>
                       </div>
                     </div>

                     {/* Topic 2.2: Training Audits */}
                     <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
                       <div className="flex items-center mb-4">
                         <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                           <span className="text-white text-lg">📊</span>
                         </div>
                         <div>
                           <h3 className="text-lg font-semibold text-green-800">Topic 2.2</h3>
                           <p className="text-sm text-green-600">Training Audits</p>
                         </div>
                       </div>
                       <div className="space-y-3">
                         <div className="bg-white rounded-lg p-3 shadow-sm">
                           <h4 className="font-medium text-gray-800 mb-2">Field Data Collection</h4>
                           <p className="text-sm text-gray-600">Gathering real-world performance data</p>
                         </div>
                         <div className="bg-white rounded-lg p-3 shadow-sm">
                           <h4 className="font-medium text-gray-800 mb-2">Performance Metrics</h4>
                           <p className="text-sm text-gray-600">Measuring training effectiveness</p>
                         </div>
                         <div className="bg-white rounded-lg p-3 shadow-sm">
                           <h4 className="font-medium text-gray-800 mb-2">Audit Reports</h4>
                           <p className="text-sm text-gray-600">Documenting findings and recommendations</p>
                         </div>
                       </div>
                     </div>

                     {/* Topic 2.3: Community Consultation */}
                     <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl p-6 border border-purple-200">
                       <div className="flex items-center mb-4">
                         <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                           <span className="text-white text-lg">🤝</span>
                         </div>
                         <div>
                           <h3 className="text-lg font-semibold text-purple-800">Topic 2.3</h3>
                           <p className="text-sm text-purple-600">Community Consultation</p>
                         </div>
                       </div>
                       <div className="space-y-3">
                         <div className="bg-white rounded-lg p-3 shadow-sm">
                           <h4 className="font-medium text-gray-800 mb-2">Public Input</h4>
                           <p className="text-sm text-gray-600">Engaging community in training design</p>
                         </div>
                         <div className="bg-white rounded-lg p-3 shadow-sm">
                           <h4 className="font-medium text-gray-800 mb-2">Accountability</h4>
                           <p className="text-sm text-gray-600">Ensuring transparency in training processes</p>
                         </div>
                         <div className="bg-white rounded-lg p-3 shadow-sm">
                           <h4 className="font-medium text-gray-800 mb-2">Feedback Loops</h4>
                           <p className="text-sm text-gray-600">Continuous improvement mechanisms</p>
                         </div>
                       </div>
                     </div>
                   </div>
               </div>

               {/* Section 3 in Modal */}
               <div className="border-t pt-8 mt-8">
                       <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                         Section 3: Video Background
                       </h2>
                       <div className="w-full h-[400px] relative overflow-hidden rounded-xl">
                         <Section3Video />
                       </div>
               </div>

               {/* Section 4 in Modal */}
               <div className="border-t pt-8 mt-8">
                       <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                         Section 4: Income Growth Chart
                       </h2>
                       <div className="w-full">
                         <IncomeGrowthChart />
                       </div>
               </div>

               {/* Section 5 in Modal */}
               <div className="border-t pt-8 mt-8">
                       <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                         Section 5: Drag & Drop Challenge
                       </h2>
                       <div className="w-full">
                         <DragDropChallenge />
                       </div>
               </div>

               {/* Section 6 in Modal */}
               <div className="border-t pt-8 mt-8">
                       <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                         Section 6: Voice Interaction
                       </h2>
                       <div className="w-full">
                         <VoiceInteraction />
                       </div>
               </div>
             </div>
           </div>
         </DialogContent>
       </Dialog>
     </div>
   );
 };

export default LessonMod2;
