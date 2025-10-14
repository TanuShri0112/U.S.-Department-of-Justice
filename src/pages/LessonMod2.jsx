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

  // Drag and Drop State
  const [draggedItem, setDraggedItem] = useState(null);
  const [droppedItems, setDroppedItems] = useState({
    'community-policing': [],
    'de-escalation': [],
    'youth-interaction': [],
    'legal-compliance': []
  });
  const [availableItems, setAvailableItems] = useState([
    { id: 'role-playing', name: 'Role-Playing Scenarios', icon: '🎭', color: 'blue' },
    { id: 'classroom', name: 'Classroom Instruction', icon: '📚', color: 'green' },
    { id: 'field-training', name: 'Field Training Exercises', icon: '🚗', color: 'purple' },
    { id: 'online-sim', name: 'Online Simulations', icon: '💻', color: 'orange' }
  ]);
  const [showResults, setShowResults] = useState(false);

  // Correct answers mapping
  const correctAnswers = {
    'community-policing': ['field-training'],
    'de-escalation': ['role-playing'],
    'youth-interaction': ['field-training', 'classroom'],
    'legal-compliance': ['classroom', 'online-sim']
  };

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

  // Drag and Drop Handlers
  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropZoneId) => {
    e.preventDefault();
    if (draggedItem) {
      // Remove from available items
      const newAvailableItems = availableItems.filter(item => item.id !== draggedItem.id);
      setAvailableItems(newAvailableItems);
      
      // Add to dropped items
      const newDroppedItems = {
        ...droppedItems,
        [dropZoneId]: [...droppedItems[dropZoneId], draggedItem]
      };
      setDroppedItems(newDroppedItems);
      
      // Check if all items are placed
      if (newAvailableItems.length === 0) {
        setShowResults(true);
      }
      
      setDraggedItem(null);
    }
  };

  const handleRemoveItem = (item, dropZoneId) => {
    // Remove from dropped items
    setDroppedItems(prev => ({
      ...prev,
      [dropZoneId]: prev[dropZoneId].filter(i => i.id !== item.id)
    }));
    
    // Add back to available items
    setAvailableItems(prev => [...prev, item]);
    
    // Hide results if items are removed
    setShowResults(false);
  };

  const handleReset = () => {
    setAvailableItems([
      { id: 'role-playing', name: 'Role-Playing Scenarios', icon: '🎭', color: 'blue' },
      { id: 'classroom', name: 'Classroom Instruction', icon: '📚', color: 'green' },
      { id: 'field-training', name: 'Field Training Exercises', icon: '🚗', color: 'purple' },
      { id: 'online-sim', name: 'Online Simulations', icon: '💻', color: 'orange' }
    ]);
    setDroppedItems({
      'community-policing': [],
      'de-escalation': [],
      'youth-interaction': [],
      'legal-compliance': []
    });
    setShowResults(false);
  };

  // Calculate results
  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;
    
    Object.keys(droppedItems).forEach(zoneId => {
      droppedItems[zoneId].forEach(item => {
        if (correctAnswers[zoneId].includes(item.id)) {
          correct++;
        } else {
          incorrect++;
        }
      });
    });
    
    return { correct, incorrect, total: correct + incorrect };
  };

  const isItemCorrect = (item, zoneId) => {
    return correctAnswers[zoneId].includes(item.id);
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

         {/* Section 3: Topic 2.1 - Detailed Skill Gap Analysis */}
         <section className="max-w-4xl mx-auto mb-12">
           <div className="bg-white rounded-2xl shadow-lg p-8">
             <div className="flex items-center mb-6">
               <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                 <span className="text-2xl text-white">🎯</span>
                   </div>
               <div>
                 <h2 className="text-2xl font-bold text-gray-900">Topic 2.1: Identifying Skill Gaps</h2>
                 <p className="text-gray-600">Comprehensive analysis of law enforcement training needs</p>
                 </div>
               </div>

             {/* Step-by-Step Process Flow */}
             <div className="mb-8">
               <h3 className="text-lg font-semibold text-gray-800 mb-4">Skill Gap Analysis Process</h3>
               <div className="flex flex-col md:flex-row gap-4">
                 <div className="flex-1 bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                   <div className="flex items-center mb-2">
                     <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                     <h4 className="font-semibold text-blue-800">Assessment Planning</h4>
                   </div>
                   <p className="text-sm text-gray-700">Define assessment objectives, select assessment methods, and establish evaluation criteria</p>
                 </div>
                 <div className="flex-1 bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                   <div className="flex items-center mb-2">
                     <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                     <h4 className="font-semibold text-green-800">Data Collection</h4>
                   </div>
                   <p className="text-sm text-gray-700">Gather performance data through observations, surveys, and field reports</p>
                 </div>
                 <div className="flex-1 bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                   <div className="flex items-center mb-2">
                     <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                     <h4 className="font-semibold text-purple-800">Analysis & Reporting</h4>
                   </div>
                   <p className="text-sm text-gray-700">Analyze findings and create actionable recommendations for training improvements</p>
                 </div>
               </div>
             </div>

             {/* Card Grid for Skill Areas */}
             <div className="mb-8">
               <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Skill Areas for Assessment</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                   <div className="flex items-center mb-3">
                     <span className="text-2xl mr-3">🤝</span>
                     <h4 className="font-semibold text-gray-800">Community Policing</h4>
                   </div>
                   <ul className="text-sm text-gray-600 space-y-1">
                     <li>• Building community trust</li>
                     <li>• Partnership development</li>
                     <li>• Problem-solving approaches</li>
                   </ul>
                 </div>
                 <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                   <div className="flex items-center mb-3">
                     <span className="text-2xl mr-3">⚖️</span>
                     <h4 className="font-semibold text-gray-800">De-escalation</h4>
                   </div>
                   <ul className="text-sm text-gray-600 space-y-1">
                     <li>• Conflict resolution techniques</li>
                     <li>• Communication strategies</li>
                     <li>• Crisis intervention</li>
                   </ul>
                 </div>
                 <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                   <div className="flex items-center mb-3">
                     <span className="text-2xl mr-3">👥</span>
                     <h4 className="font-semibold text-gray-800">Youth Interaction</h4>
                   </div>
                   <ul className="text-sm text-gray-600 space-y-1">
                     <li>• Age-appropriate communication</li>
                     <li>• Mentoring techniques</li>
                     <li>• Educational partnerships</li>
                   </ul>
                 </div>
               </div>
             </div>

             {/* Timeline for Assessment Implementation */}
             <div className="mb-8">
               <h3 className="text-lg font-semibold text-gray-800 mb-4">Assessment Implementation Timeline</h3>
               <div className="relative">
                 <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                 <div className="space-y-6">
                   <div className="relative flex items-start">
                     <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold z-10">1</div>
                     <div className="ml-4">
                       <h4 className="font-semibold text-gray-800">Week 1-2: Planning Phase</h4>
                       <p className="text-sm text-gray-600">Establish assessment framework and stakeholder engagement</p>
                     </div>
                   </div>
                   <div className="relative flex items-start">
                     <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold z-10">2</div>
                     <div className="ml-4">
                       <h4 className="font-semibold text-gray-800">Week 3-6: Data Collection</h4>
                       <p className="text-sm text-gray-600">Conduct field observations, surveys, and performance evaluations</p>
                     </div>
                   </div>
                   <div className="relative flex items-start">
                     <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold z-10">3</div>
                     <div className="ml-4">
                       <h4 className="font-semibold text-gray-800">Week 7-8: Analysis & Reporting</h4>
                       <p className="text-sm text-gray-600">Compile findings and develop training recommendations</p>
                     </div>
                   </div>
                 </div>
               </div>
               </div>
           </div>
         </section>

         {/* Section 4: Topic 2.2 - Training Audits */}
         <section className="max-w-4xl mx-auto mb-12">
           <div className="bg-white rounded-2xl shadow-lg p-8">
             <div className="flex items-center mb-6">
               <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                 <span className="text-2xl text-white">📊</span>
               </div>
               <div>
                 <h2 className="text-2xl font-bold text-gray-900">Topic 2.2: Conducting Training Audits</h2>
                 <p className="text-gray-600">Systematic evaluation of training effectiveness using field data</p>
               </div>
             </div>

             {/* Accordion for Audit Methods */}
             <div className="mb-8">
               <h3 className="text-lg font-semibold text-gray-800 mb-4">Training Audit Methodologies</h3>
               <div className="space-y-4">
                 <div className="border border-gray-200 rounded-lg">
                   <button className="w-full px-4 py-3 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
                     <span className="font-medium text-gray-800">Field Data Collection Methods</span>
                     <span className="text-gray-500">+</span>
                   </button>
                   <div className="px-4 py-3 border-t border-gray-200 bg-white">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="bg-blue-50 rounded-lg p-3">
                         <h4 className="font-semibold text-blue-800 mb-2">Direct Observation</h4>
                         <ul className="text-sm text-gray-700 space-y-1">
                           <li>• Ride-along assessments</li>
                           <li>• Performance evaluations</li>
                           <li>• Real-time feedback collection</li>
                         </ul>
                       </div>
                       <div className="bg-green-50 rounded-lg p-3">
                         <h4 className="font-semibold text-green-800 mb-2">Data Analysis</h4>
                         <ul className="text-sm text-gray-700 space-y-1">
                           <li>• Incident report reviews</li>
                           <li>• Performance metrics tracking</li>
                           <li>• Outcome measurements</li>
                         </ul>
                       </div>
                     </div>
                   </div>
                 </div>

                 <div className="border border-gray-200 rounded-lg">
                   <button className="w-full px-4 py-3 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
                     <span className="font-medium text-gray-800">Performance Metrics Framework</span>
                     <span className="text-gray-500">+</span>
                   </button>
                   <div className="px-4 py-3 border-t border-gray-200 bg-white">
                     <div className="space-y-3">
                       <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                         <span className="font-medium text-gray-800">Response Time Metrics</span>
                         <span className="text-sm text-gray-600">Average response to incidents</span>
                       </div>
                       <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                         <span className="font-medium text-gray-800">Community Satisfaction</span>
                         <span className="text-sm text-gray-600">Public feedback and surveys</span>
                       </div>
                       <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                         <span className="font-medium text-gray-800">Training Completion Rates</span>
                         <span className="text-sm text-gray-600">Course completion and retention</span>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>

             {/* Carousel for Audit Types */}
             <div className="mb-8">
               <h3 className="text-lg font-semibold text-gray-800 mb-4">Types of Training Audits</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                   <div className="flex items-center mb-3">
                     <span className="text-2xl mr-3">📋</span>
                     <h4 className="font-semibold text-blue-800">Compliance Audit</h4>
                   </div>
                   <p className="text-sm text-gray-700 mb-3">Ensures training meets regulatory requirements and department standards</p>
                   <ul className="text-xs text-gray-600 space-y-1">
                     <li>• POST compliance verification</li>
                     <li>• Legal requirement adherence</li>
                     <li>• Documentation completeness</li>
                   </ul>
                 </div>
                 <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                   <div className="flex items-center mb-3">
                     <span className="text-2xl mr-3">📈</span>
                     <h4 className="font-semibold text-green-800">Effectiveness Audit</h4>
                   </div>
                   <p className="text-sm text-gray-700 mb-3">Measures training impact on officer performance and outcomes</p>
                   <ul className="text-xs text-gray-600 space-y-1">
                     <li>• Performance improvement tracking</li>
                     <li>• Skill application assessment</li>
                     <li>• Outcome measurement</li>
                   </ul>
                 </div>
                 <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                   <div className="flex items-center mb-3">
                     <span className="text-2xl mr-3">🔄</span>
                     <h4 className="font-semibold text-purple-800">Continuous Improvement</h4>
                   </div>
                   <p className="text-sm text-gray-700 mb-3">Ongoing evaluation for training program enhancement</p>
                   <ul className="text-xs text-gray-600 space-y-1">
                     <li>• Regular feedback collection</li>
                     <li>• Program refinement</li>
                     <li>• Best practice identification</li>
                   </ul>
                 </div>
               </div>
             </div>
           </div>
         </section>

         {/* Section 5: Topic 2.3 - Community Consultation */}
         <section className="max-w-4xl mx-auto mb-12">
           <div className="bg-white rounded-2xl shadow-lg p-8">
             <div className="flex items-center mb-6">
               <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                 <span className="text-2xl text-white">🤝</span>
               </div>
               <div>
                 <h2 className="text-2xl font-bold text-gray-900">Topic 2.3: Community Consultation</h2>
                 <p className="text-gray-600">Engaging stakeholders in training design and public accountability</p>
               </div>
             </div>

             {/* Flashcards for Stakeholder Groups */}
             <div className="mb-8">
               <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Stakeholder Groups</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                 <div className="bg-white border-2 border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                   <div className="text-center">
                     <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                       <span className="text-2xl">👥</span>
                     </div>
                     <h4 className="font-semibold text-gray-800 mb-2">Community Members</h4>
                     <p className="text-xs text-gray-600">Local residents and business owners</p>
                   </div>
                 </div>
                 <div className="bg-white border-2 border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                   <div className="text-center">
                     <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                       <span className="text-2xl">🏫</span>
                     </div>
                     <h4 className="font-semibold text-gray-800 mb-2">Educational Partners</h4>
                     <p className="text-xs text-gray-600">Schools and youth organizations</p>
                   </div>
                 </div>
                 <div className="bg-white border-2 border-purple-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                   <div className="text-center">
                     <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                       <span className="text-2xl">⚖️</span>
                     </div>
                     <h4 className="font-semibold text-gray-800 mb-2">Legal Advocates</h4>
                     <p className="text-xs text-gray-600">Civil rights and legal organizations</p>
                   </div>
                 </div>
                 <div className="bg-white border-2 border-orange-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                   <div className="text-center">
                     <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                       <span className="text-2xl">🏛️</span>
                     </div>
                     <h4 className="font-semibold text-gray-800 mb-2">Government Officials</h4>
                     <p className="text-xs text-gray-600">City council and elected representatives</p>
                   </div>
                 </div>
               </div>
             </div>

             {/* Step-by-Step Consultation Process */}
             <div className="mb-8">
               <h3 className="text-lg font-semibold text-gray-800 mb-4">Community Consultation Process</h3>
               <div className="space-y-4">
                 <div className="flex items-start">
                   <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 flex-shrink-0">1</div>
                   <div className="flex-1">
                     <h4 className="font-semibold text-gray-800 mb-2">Stakeholder Identification</h4>
                     <p className="text-sm text-gray-600 mb-2">Identify and map all relevant community stakeholders and their interests</p>
                     <ul className="text-xs text-gray-500 space-y-1">
                       <li>• Community leaders and organizations</li>
                       <li>• Youth representatives and advocates</li>
                       <li>• Business and civic groups</li>
                     </ul>
                   </div>
                 </div>
                 <div className="flex items-start">
                   <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 flex-shrink-0">2</div>
                   <div className="flex-1">
                     <h4 className="font-semibold text-gray-800 mb-2">Engagement Planning</h4>
                     <p className="text-sm text-gray-600 mb-2">Develop comprehensive engagement strategy with clear objectives</p>
                     <ul className="text-xs text-gray-500 space-y-1">
                       <li>• Public forums and town halls</li>
                       <li>• Focus groups and surveys</li>
                       <li>• Online consultation platforms</li>
                     </ul>
                   </div>
                 </div>
                 <div className="flex items-start">
                   <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 flex-shrink-0">3</div>
                   <div className="flex-1">
                     <h4 className="font-semibold text-gray-800 mb-2">Feedback Integration</h4>
                     <p className="text-sm text-gray-600 mb-2">Systematically collect, analyze, and integrate community feedback</p>
                     <ul className="text-xs text-gray-500 space-y-1">
                       <li>• Feedback categorization and analysis</li>
                       <li>• Priority identification and ranking</li>
                       <li>• Training program modifications</li>
                     </ul>
                   </div>
                 </div>
                 <div className="flex items-start">
                   <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 flex-shrink-0">4</div>
                   <div className="flex-1">
                     <h4 className="font-semibold text-gray-800 mb-2">Accountability Measures</h4>
                     <p className="text-sm text-gray-600 mb-2">Establish transparent reporting and continuous monitoring systems</p>
                     <ul className="text-xs text-gray-500 space-y-1">
                       <li>• Regular progress reports</li>
                       <li>• Public performance dashboards</li>
                       <li>• Community feedback loops</li>
                     </ul>
                   </div>
                 </div>
               </div>
             </div>

             {/* Lists for Best Practices */}
             <div className="mb-8">
               <h3 className="text-lg font-semibold text-gray-800 mb-4">Best Practices for Community Engagement</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-gray-50 rounded-lg p-4">
                   <h4 className="font-semibold text-gray-800 mb-3">Effective Communication</h4>
                   <ul className="text-sm text-gray-700 space-y-2">
                     <li className="flex items-start">
                       <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                       <span>Use clear, accessible language</span>
                     </li>
                     <li className="flex items-start">
                       <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                       <span>Provide multiple engagement channels</span>
                     </li>
                     <li className="flex items-start">
                       <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                       <span>Ensure cultural sensitivity and inclusion</span>
                     </li>
                     <li className="flex items-start">
                       <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                       <span>Maintain regular communication updates</span>
                     </li>
                   </ul>
                 </div>
                 <div className="bg-gray-50 rounded-lg p-4">
                   <h4 className="font-semibold text-gray-800 mb-3">Transparency & Accountability</h4>
                   <ul className="text-sm text-gray-700 space-y-2">
                     <li className="flex items-start">
                       <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                       <span>Publish consultation results and decisions</span>
                     </li>
                     <li className="flex items-start">
                       <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                       <span>Provide regular progress reports</span>
                     </li>
                     <li className="flex items-start">
                       <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                       <span>Establish feedback response mechanisms</span>
                     </li>
                     <li className="flex items-start">
                       <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                       <span>Create accessible complaint procedures</span>
                     </li>
                   </ul>
                 </div>
               </div>
             </div>
           </div>
         </section>

         {/* Section 6: Training Effectiveness Metrics */}
         <section className="max-w-4xl mx-auto mb-12">
           <div className="bg-white rounded-2xl shadow-lg p-8">
             <div className="flex items-center mb-6">
               <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mr-4">
                 <span className="text-2xl text-white">📈</span>
               </div>
               <div>
                 <h2 className="text-2xl font-bold text-gray-900">Training Effectiveness Metrics</h2>
                 <p className="text-gray-600">Measuring the impact of law enforcement training programs</p>
               </div>
             </div>

             {/* Performance Improvement Chart */}
             <div className="mb-8">
               <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Improvement Over Time</h3>
               <div className="bg-gray-50 rounded-lg p-6">
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                   <div className="text-center">
                     <div className="text-2xl font-bold text-blue-600">85%</div>
                     <div className="text-sm text-gray-600">De-escalation Success Rate</div>
                   </div>
                   <div className="text-center">
                     <div className="text-2xl font-bold text-green-600">92%</div>
                     <div className="text-sm text-gray-600">Community Satisfaction</div>
                   </div>
                   <div className="text-center">
                     <div className="text-2xl font-bold text-purple-600">78%</div>
                     <div className="text-sm text-gray-600">Training Completion</div>
                   </div>
                   <div className="text-center">
                     <div className="text-2xl font-bold text-orange-600">88%</div>
                     <div className="text-sm text-gray-600">Skill Retention</div>
                   </div>
                 </div>
                 
                 {/* Simple Bar Chart Representation */}
                 <div className="space-y-3">
                   <div className="flex items-center justify-between">
                     <span className="text-sm font-medium text-gray-700">De-escalation Skills</span>
                     <div className="flex items-center">
                       <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                         <div className="bg-blue-500 h-2 rounded-full" style={{width: '85%'}}></div>
                       </div>
                       <span className="text-sm text-gray-600">85%</span>
                     </div>
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-sm font-medium text-gray-700">Community Relations</span>
                     <div className="flex items-center">
                       <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                         <div className="bg-green-500 h-2 rounded-full" style={{width: '92%'}}></div>
                       </div>
                       <span className="text-sm text-gray-600">92%</span>
                     </div>
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-sm font-medium text-gray-700">Youth Interaction</span>
                     <div className="flex items-center">
                       <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                         <div className="bg-purple-500 h-2 rounded-full" style={{width: '78%'}}></div>
                       </div>
                       <span className="text-sm text-gray-600">78%</span>
                     </div>
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-sm font-medium text-gray-700">Legal Compliance</span>
                     <div className="flex items-center">
                       <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                         <div className="bg-orange-500 h-2 rounded-full" style={{width: '88%'}}></div>
                       </div>
                       <span className="text-sm text-gray-600">88%</span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>

             {/* Key Performance Indicators */}
             <div className="mb-8">
               <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Performance Indicators (KPIs)</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                   <h4 className="font-semibold text-blue-800 mb-2">Training Metrics</h4>
                   <ul className="text-sm text-gray-700 space-y-1">
                     <li>• Course completion rates: 95%</li>
                     <li>• Knowledge retention: 88%</li>
                     <li>• Skill application: 82%</li>
                     <li>• Participant satisfaction: 4.6/5</li>
                   </ul>
                 </div>
                 <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                   <h4 className="font-semibold text-green-800 mb-2">Field Performance</h4>
                   <ul className="text-sm text-gray-700 space-y-1">
                     <li>• Incident resolution time: -25%</li>
                     <li>• Community complaints: -40%</li>
                     <li>• Use of force incidents: -35%</li>
                     <li>• Positive community feedback: +60%</li>
                   </ul>
                 </div>
               </div>
             </div>
           </div>
         </section>

         {/* Section 7: Interactive Training Assessment */}
         <section className="max-w-4xl mx-auto mb-12">
           <div className="bg-white rounded-2xl shadow-lg p-8">
             <div className="flex items-center mb-6">
               <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mr-4">
                 <span className="text-2xl text-white">🎯</span>
               </div>
               <div>
                 <h2 className="text-2xl font-bold text-gray-900">Interactive Training Assessment</h2>
                 <p className="text-gray-600">Test your knowledge by matching training methods to skill areas</p>
               </div>
             </div>

             {/* Drag & Drop Activity */}
             <div className="mb-8">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-semibold text-gray-800">Match Training Methods to Skill Areas</h3>
                 <Button onClick={handleReset} variant="outline" size="sm">
                   Reset Activity
                 </Button>
               </div>
               <p className="text-sm text-gray-600 mb-6">Drag each training method to its most appropriate skill area category</p>
               
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 {/* Training Methods (Draggable Items) */}
                 <div className="space-y-4">
                   <h4 className="font-semibold text-gray-800 mb-3">Training Methods</h4>
                   <div className="space-y-3 min-h-[300px]">
                     {availableItems.length === 0 ? (
                       <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-dashed border-green-300 rounded-lg p-8 text-center">
                         <div className="text-4xl mb-2">✅</div>
                         <p className="text-green-700 font-semibold">All items have been placed!</p>
                         <p className="text-sm text-green-600 mt-1">Check your results below</p>
                       </div>
                     ) : (
                       availableItems.map(item => (
                         <div
                           key={item.id}
                           draggable
                           onDragStart={() => handleDragStart(item)}
                           className={`rounded-lg p-4 cursor-move transition-all shadow-sm hover:shadow-md ${
                             draggedItem?.id === item.id ? 'opacity-50 scale-95' : 'hover:scale-102'
                           }`}
                           style={{
                             backgroundColor: item.color === 'blue' ? '#dbeafe' : 
                                            item.color === 'green' ? '#d1fae5' :
                                            item.color === 'purple' ? '#e9d5ff' : '#fed7aa',
                             borderWidth: '2px',
                             borderStyle: 'dashed',
                             borderColor: item.color === 'blue' ? '#93c5fd' : 
                                         item.color === 'green' ? '#6ee7b7' :
                                         item.color === 'purple' ? '#c4b5fd' : '#fdba74'
                           }}
                         >
                           <div className="flex items-center">
                             <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm">
                               <span className="text-2xl">{item.icon}</span>
                             </div>
                             <div>
                               <span className="font-semibold text-gray-800 block">{item.name}</span>
                               <span className="text-xs text-gray-600">Drag to skill area →</span>
                             </div>
                           </div>
                         </div>
                       ))
                     )}
                   </div>
                 </div>

                 {/* Skill Areas (Drop Zones) */}
                 <div className="space-y-4">
                   <h4 className="font-semibold text-gray-800 mb-3">Skill Areas</h4>
                   <div className="space-y-3">
                     {/* Community Policing */}
                     <div
                       onDragOver={handleDragOver}
                       onDrop={(e) => handleDrop(e, 'community-policing')}
                       className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 min-h-[80px] transition-colors hover:bg-gray-100"
                     >
                       <div className="flex items-center justify-between mb-2">
                         <div className="flex items-center">
                           <span className="text-xl mr-2">🤝</span>
                           <span className="font-medium text-gray-800">Community Policing</span>
                         </div>
                       </div>
                       {droppedItems['community-policing'].length === 0 ? (
                         <p className="text-xs text-gray-500 text-center py-2">Drop training methods here</p>
                       ) : (
                         <div className="space-y-2">
                           {droppedItems['community-policing'].map(item => (
                             <div 
                               key={item.id} 
                               className={`rounded-lg p-3 flex items-center justify-between transition-all ${
                                 showResults 
                                   ? isItemCorrect(item, 'community-policing')
                                     ? 'bg-green-100 border-2 border-green-500'
                                     : 'bg-red-100 border-2 border-red-500'
                                   : `bg-${item.color}-50 border-2 border-${item.color}-200`
                               }`}
                             >
                               <div className="flex items-center">
                                 <span className="text-xl mr-3">{item.icon}</span>
                                 <span className="text-sm font-medium text-gray-800">{item.name}</span>
                                 {showResults && (
                                   <span className="ml-2">
                                     {isItemCorrect(item, 'community-policing') ? '✓' : '✗'}
                                   </span>
                                 )}
                               </div>
                               {!showResults && (
                                 <button
                                   onClick={() => handleRemoveItem(item, 'community-policing')}
                                   className="text-red-500 hover:text-red-700 text-sm font-bold"
                                 >
                                   ✕
                                 </button>
                               )}
                             </div>
                           ))}
                         </div>
                       )}
                     </div>

                     {/* De-escalation */}
                     <div
                       onDragOver={handleDragOver}
                       onDrop={(e) => handleDrop(e, 'de-escalation')}
                       className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 min-h-[80px] transition-colors hover:bg-gray-100"
                     >
                       <div className="flex items-center justify-between mb-2">
                         <div className="flex items-center">
                           <span className="text-xl mr-2">⚖️</span>
                           <span className="font-medium text-gray-800">De-escalation</span>
                         </div>
                       </div>
                       {droppedItems['de-escalation'].length === 0 ? (
                         <p className="text-xs text-gray-500 text-center py-2">Drop training methods here</p>
                       ) : (
                         <div className="space-y-2">
                           {droppedItems['de-escalation'].map(item => (
                             <div 
                               key={item.id} 
                               className={`rounded-lg p-3 flex items-center justify-between transition-all ${
                                 showResults 
                                   ? isItemCorrect(item, 'de-escalation')
                                     ? 'bg-green-100 border-2 border-green-500'
                                     : 'bg-red-100 border-2 border-red-500'
                                   : `bg-${item.color}-50 border-2 border-${item.color}-200`
                               }`}
                             >
                               <div className="flex items-center">
                                 <span className="text-xl mr-3">{item.icon}</span>
                                 <span className="text-sm font-medium text-gray-800">{item.name}</span>
                                 {showResults && (
                                   <span className="ml-2">
                                     {isItemCorrect(item, 'de-escalation') ? '✓' : '✗'}
                                   </span>
                                 )}
                               </div>
                               {!showResults && (
                                 <button
                                   onClick={() => handleRemoveItem(item, 'de-escalation')}
                                   className="text-red-500 hover:text-red-700 text-sm font-bold"
                                 >
                                   ✕
                                 </button>
                               )}
                             </div>
                           ))}
                         </div>
                       )}
                     </div>

                     {/* Youth Interaction */}
                     <div
                       onDragOver={handleDragOver}
                       onDrop={(e) => handleDrop(e, 'youth-interaction')}
                       className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 min-h-[80px] transition-colors hover:bg-gray-100"
                     >
                       <div className="flex items-center justify-between mb-2">
                         <div className="flex items-center">
                           <span className="text-xl mr-2">👥</span>
                           <span className="font-medium text-gray-800">Youth Interaction</span>
                         </div>
                       </div>
                       {droppedItems['youth-interaction'].length === 0 ? (
                         <p className="text-xs text-gray-500 text-center py-2">Drop training methods here</p>
                       ) : (
                         <div className="space-y-2">
                           {droppedItems['youth-interaction'].map(item => (
                             <div 
                               key={item.id} 
                               className={`rounded-lg p-3 flex items-center justify-between transition-all ${
                                 showResults 
                                   ? isItemCorrect(item, 'youth-interaction')
                                     ? 'bg-green-100 border-2 border-green-500'
                                     : 'bg-red-100 border-2 border-red-500'
                                   : `bg-${item.color}-50 border-2 border-${item.color}-200`
                               }`}
                             >
                               <div className="flex items-center">
                                 <span className="text-xl mr-3">{item.icon}</span>
                                 <span className="text-sm font-medium text-gray-800">{item.name}</span>
                                 {showResults && (
                                   <span className="ml-2">
                                     {isItemCorrect(item, 'youth-interaction') ? '✓' : '✗'}
                                   </span>
                                 )}
                               </div>
                               {!showResults && (
                                 <button
                                   onClick={() => handleRemoveItem(item, 'youth-interaction')}
                                   className="text-red-500 hover:text-red-700 text-sm font-bold"
                                 >
                                   ✕
                                 </button>
                               )}
                             </div>
                           ))}
                         </div>
                       )}
                     </div>

                     {/* Legal Compliance */}
                     <div
                       onDragOver={handleDragOver}
                       onDrop={(e) => handleDrop(e, 'legal-compliance')}
                       className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 min-h-[80px] transition-colors hover:bg-gray-100"
                     >
                       <div className="flex items-center justify-between mb-2">
                         <div className="flex items-center">
                           <span className="text-xl mr-2">📋</span>
                           <span className="font-medium text-gray-800">Legal Compliance</span>
                         </div>
                       </div>
                       {droppedItems['legal-compliance'].length === 0 ? (
                         <p className="text-xs text-gray-500 text-center py-2">Drop training methods here</p>
                       ) : (
                         <div className="space-y-2">
                           {droppedItems['legal-compliance'].map(item => (
                             <div 
                               key={item.id} 
                               className={`rounded-lg p-3 flex items-center justify-between transition-all ${
                                 showResults 
                                   ? isItemCorrect(item, 'legal-compliance')
                                     ? 'bg-green-100 border-2 border-green-500'
                                     : 'bg-red-100 border-2 border-red-500'
                                   : `bg-${item.color}-50 border-2 border-${item.color}-200`
                               }`}
                             >
                               <div className="flex items-center">
                                 <span className="text-xl mr-3">{item.icon}</span>
                                 <span className="text-sm font-medium text-gray-800">{item.name}</span>
                                 {showResults && (
                                   <span className="ml-2">
                                     {isItemCorrect(item, 'legal-compliance') ? '✓' : '✗'}
                                   </span>
                                 )}
                               </div>
                               {!showResults && (
                                 <button
                                   onClick={() => handleRemoveItem(item, 'legal-compliance')}
                                   className="text-red-500 hover:text-red-700 text-sm font-bold"
                                 >
                                   ✕
                                 </button>
                               )}
                             </div>
                           ))}
                         </div>
                       )}
                     </div>
                   </div>
                 </div>
               </div>

               {/* Instructions */}
               <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                 <div className="flex items-start">
                   <span className="text-yellow-600 mr-3">💡</span>
                   <div>
                     <h4 className="font-semibold text-yellow-800 mb-1">Instructions</h4>
                     <p className="text-sm text-yellow-700">
                       Drag each training method to the skill area where it would be most effective. 
                       Consider the learning objectives and practical application of each method.
                     </p>
                   </div>
                 </div>
               </div>
             </div>

             {/* Assessment Results */}
             {showResults && (
               <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 shadow-lg animate-fadeIn">
                 <div className="flex items-center justify-between mb-4">
                   <h3 className="text-2xl font-bold text-gray-900">📊 Assessment Results</h3>
                   <Button onClick={handleReset} variant="outline" className="bg-white">
                     Try Again
                   </Button>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                   <div className="bg-white rounded-lg p-6 text-center shadow-md">
                     <div className="text-4xl font-bold text-blue-600 mb-2">
                       {calculateResults().total}
                     </div>
                     <div className="text-sm text-gray-600">Total Answers</div>
                   </div>
                   <div className="bg-green-50 rounded-lg p-6 text-center shadow-md border-2 border-green-300">
                     <div className="text-4xl font-bold text-green-600 mb-2">
                       {calculateResults().correct}
                     </div>
                     <div className="text-sm text-gray-700 font-medium">Correct ✓</div>
                   </div>
                   <div className="bg-red-50 rounded-lg p-6 text-center shadow-md border-2 border-red-300">
                     <div className="text-4xl font-bold text-red-600 mb-2">
                       {calculateResults().incorrect}
                     </div>
                     <div className="text-sm text-gray-700 font-medium">Incorrect ✗</div>
                   </div>
                 </div>

                 <div className="bg-white rounded-lg p-6 shadow-md">
                   <div className="flex items-center justify-between mb-4">
                     <h4 className="text-lg font-semibold text-gray-800">Your Score</h4>
                     <div className="text-3xl font-bold" style={{
                       color: calculateResults().correct / calculateResults().total >= 0.7 ? '#10b981' : 
                              calculateResults().correct / calculateResults().total >= 0.5 ? '#f59e0b' : '#ef4444'
                     }}>
                       {Math.round((calculateResults().correct / calculateResults().total) * 100)}%
                     </div>
                   </div>
                   
                   <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                     <div 
                       className="h-4 rounded-full transition-all duration-500"
                       style={{
                         width: `${(calculateResults().correct / calculateResults().total) * 100}%`,
                         backgroundColor: calculateResults().correct / calculateResults().total >= 0.7 ? '#10b981' : 
                                        calculateResults().correct / calculateResults().total >= 0.5 ? '#f59e0b' : '#ef4444'
                       }}
                     ></div>
                   </div>

                   <div className="text-center">
                     {calculateResults().correct / calculateResults().total >= 0.7 ? (
                       <p className="text-green-700 font-medium">🎉 Excellent work! You have a strong understanding of training methods.</p>
                     ) : calculateResults().correct / calculateResults().total >= 0.5 ? (
                       <p className="text-orange-700 font-medium">👍 Good effort! Review the incorrect answers to improve your understanding.</p>
                     ) : (
                       <p className="text-red-700 font-medium">📚 Keep learning! Try reviewing the material and attempt again.</p>
                     )}
                   </div>
                 </div>

                 <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
                   <h4 className="font-semibold text-blue-800 mb-2">💡 Learning Tip</h4>
                   <p className="text-sm text-blue-700">
                     Different training methods work best for different skills. Role-playing excels at de-escalation practice, 
                     while field training is ideal for community policing and youth interaction. Classroom instruction and online 
                     simulations are effective for legal compliance training.
                   </p>
                 </div>
               </div>
             )}
           </div>
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

                     {/* Section 3 in Modal - Topic 2.1 */}
                     <div className="border-t pt-8 mt-8">
                       <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                         Section 3: Topic 2.1 - Skill Gap Analysis
                       </h2>
                       <div className="space-y-4">
                         <div className="bg-blue-50 rounded-lg p-4">
                           <h3 className="font-semibold text-blue-800 mb-2">Assessment Process</h3>
                           <p className="text-sm text-gray-700">Comprehensive analysis of law enforcement training needs through systematic evaluation</p>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                           <div className="bg-white border border-gray-200 rounded-lg p-3">
                             <h4 className="font-medium text-gray-800 mb-2">Community Policing</h4>
                             <p className="text-xs text-gray-600">Building trust and partnerships</p>
                           </div>
                           <div className="bg-white border border-gray-200 rounded-lg p-3">
                             <h4 className="font-medium text-gray-800 mb-2">De-escalation</h4>
                             <p className="text-xs text-gray-600">Conflict resolution techniques</p>
                           </div>
                           <div className="bg-white border border-gray-200 rounded-lg p-3">
                             <h4 className="font-medium text-gray-800 mb-2">Youth Interaction</h4>
                             <p className="text-xs text-gray-600">Age-appropriate communication</p>
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Section 4 in Modal - Topic 2.2 */}
                     <div className="border-t pt-8 mt-8">
                       <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                         Section 4: Topic 2.2 - Training Audits
                       </h2>
                       <div className="space-y-4">
                         <div className="bg-green-50 rounded-lg p-4">
                           <h3 className="font-semibold text-green-800 mb-2">Audit Methodologies</h3>
                           <p className="text-sm text-gray-700">Systematic evaluation of training effectiveness using field data and performance metrics</p>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                           <div className="bg-white border border-blue-200 rounded-lg p-3">
                             <h4 className="font-medium text-blue-800 mb-2">Compliance Audit</h4>
                             <p className="text-xs text-gray-600">Regulatory requirements verification</p>
                           </div>
                           <div className="bg-white border border-green-200 rounded-lg p-3">
                             <h4 className="font-medium text-green-800 mb-2">Effectiveness Audit</h4>
                             <p className="text-xs text-gray-600">Performance impact measurement</p>
                           </div>
                           <div className="bg-white border border-purple-200 rounded-lg p-3">
                             <h4 className="font-medium text-purple-800 mb-2">Continuous Improvement</h4>
                             <p className="text-xs text-gray-600">Ongoing program enhancement</p>
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Section 5 in Modal - Topic 2.3 */}
                     <div className="border-t pt-8 mt-8">
                       <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                         Section 5: Topic 2.3 - Community Consultation
                       </h2>
                       <div className="space-y-4">
                         <div className="bg-purple-50 rounded-lg p-4">
                           <h3 className="font-semibold text-purple-800 mb-2">Stakeholder Engagement</h3>
                           <p className="text-sm text-gray-700">Engaging community members in training design and ensuring public accountability</p>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="bg-white border border-gray-200 rounded-lg p-3">
                             <h4 className="font-medium text-gray-800 mb-2">Community Members</h4>
                             <p className="text-xs text-gray-600">Local residents and business owners</p>
                           </div>
                           <div className="bg-white border border-gray-200 rounded-lg p-3">
                             <h4 className="font-medium text-gray-800 mb-2">Educational Partners</h4>
                             <p className="text-xs text-gray-600">Schools and youth organizations</p>
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Section 6 in Modal - Training Metrics */}
                     <div className="border-t pt-8 mt-8">
                       <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                         Section 6: Training Effectiveness Metrics
                       </h2>
                       <div className="space-y-4">
                         <div className="bg-indigo-50 rounded-lg p-4">
                           <h3 className="font-semibold text-indigo-800 mb-2">Performance Indicators</h3>
                           <p className="text-sm text-gray-700">Measuring the impact of law enforcement training programs</p>
                         </div>
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           <div className="text-center bg-white rounded-lg p-3 border border-gray-200">
                             <div className="text-lg font-bold text-blue-600">85%</div>
                             <div className="text-xs text-gray-600">De-escalation Success</div>
                           </div>
                           <div className="text-center bg-white rounded-lg p-3 border border-gray-200">
                             <div className="text-lg font-bold text-green-600">92%</div>
                             <div className="text-xs text-gray-600">Community Satisfaction</div>
                           </div>
                           <div className="text-center bg-white rounded-lg p-3 border border-gray-200">
                             <div className="text-lg font-bold text-purple-600">78%</div>
                             <div className="text-xs text-gray-600">Training Completion</div>
                           </div>
                           <div className="text-center bg-white rounded-lg p-3 border border-gray-200">
                             <div className="text-lg font-bold text-orange-600">88%</div>
                             <div className="text-xs text-gray-600">Skill Retention</div>
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Section 7 in Modal - Interactive Assessment */}
                     <div className="border-t pt-8 mt-8">
                       <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                         Section 7: Interactive Training Assessment
                       </h2>
                       <div className="space-y-4">
                         <div className="bg-teal-50 rounded-lg p-4">
                           <h3 className="font-semibold text-teal-800 mb-2">Training Method Matching</h3>
                           <p className="text-sm text-gray-700">Test your knowledge by matching training methods to skill areas</p>
                       </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                             <h4 className="font-medium text-gray-800">Training Methods</h4>
                             <div className="space-y-1">
                               <div className="bg-blue-50 rounded p-2 text-sm">🎭 Role-Playing Scenarios</div>
                               <div className="bg-green-50 rounded p-2 text-sm">📚 Classroom Instruction</div>
                               <div className="bg-purple-50 rounded p-2 text-sm">🚗 Field Training Exercises</div>
                               <div className="bg-orange-50 rounded p-2 text-sm">💻 Online Simulations</div>
                             </div>
                           </div>
                           <div className="space-y-2">
                             <h4 className="font-medium text-gray-800">Skill Areas</h4>
                             <div className="space-y-1">
                               <div className="bg-gray-50 rounded p-2 text-sm">🤝 Community Policing</div>
                               <div className="bg-gray-50 rounded p-2 text-sm">⚖️ De-escalation</div>
                               <div className="bg-gray-50 rounded p-2 text-sm">👥 Youth Interaction</div>
                               <div className="bg-gray-50 rounded p-2 text-sm">📋 Legal Compliance</div>
                             </div>
                     </div>
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

export default LessonMod2;
